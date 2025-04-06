import React, { createContext, useContext, useState, useEffect } from 'react';
import { cart as cartApi } from '@/services/api';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    unit: string;
  };
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: CartItem[];
  totalItems: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  calculateTotal: () => { subtotal: number; discount: number; total: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();

  const loadCart = async () => {
    if (!isAuthenticated || user?.role !== 'customer') {
      setItems([]);
      return;
    }

    try {
      const response = await cartApi.get();
      setItems(response.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    loadCart();
  }, [isAuthenticated, user]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      toast.error('Please login as a customer to add items to cart');
      return;
    }

    if (user?.role !== 'customer') {
      toast.error('Only customers can add items to cart');
      return;
    }

    try {
      await cartApi.addItem(productId, quantity);
      await loadCart();
      toast.success('Item added to cart');
      setIsOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await cartApi.updateItem(productId, quantity);
      await loadCart();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await cartApi.removeItem(productId);
      await loadCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clear();
      setItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const calculateTotal = () => {
    const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    
    // Apply quiz discount if available
    const quizDiscount = localStorage.getItem('quizDiscount');
    const discountPercentage = quizDiscount ? parseInt(quizDiscount) : 0;
    const discountAmount = (subtotal * discountPercentage) / 100;
    
    return {
      subtotal,
      discount: discountAmount,
      total: subtotal - discountAmount
    };
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        items,
        totalItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
