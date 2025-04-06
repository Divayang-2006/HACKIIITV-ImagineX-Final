import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const { items: cartItems, updateQuantity, removeItem, clearCart, calculateTotal } = useCart();

  const handleCheckout = async () => {
    try {
      // Here you would typically integrate with a payment gateway
      // For now, we'll just clear the cart
      await clearCart();
      onClose();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  if (!isAuthenticated || user?.role !== 'customer') {
    return null;
  }

  const totals = calculateTotal();
  const hasDiscount = totals.discount > 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onUpdateQuantity={(quantity) => updateQuantity(item.product._id, quantity)}
                  onRemove={() => removeItem(item.product._id)}
                />
              ))}

              <div className="pt-4 border-t">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-base">
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal.toFixed(0)}</span>
                  </div>
                  
                  {hasDiscount && (
                    <div className="flex justify-between text-base text-green-600">
                      <span className="flex items-center">
                        <Gift className="h-4 w-4 mr-1" />
                        Quiz Discount
                      </span>
                      <span>-₹{totals.discount.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{totals.total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-farm-green hover:bg-farm-green-dark"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
