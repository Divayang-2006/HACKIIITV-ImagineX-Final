import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!isAuthenticated || user?.role !== 'customer') {
      toast.error('Please login as a customer to add items to cart');
      return;
    }

    try {
      setIsLoading(true);
      await addToCart(product._id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4 bg-white transition-colors duration-300 group-hover:bg-gray-50">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-lg group-hover:text-farm-green transition-colors duration-300">{product.name}</h3>
          <p className="text-lg font-bold group-hover:text-farm-green transition-colors duration-300">₹{product.price}</p>
        </div>
        <p className="text-sm text-gray-500 mb-2 group-hover:text-gray-700 transition-colors duration-300">{product.description}</p>
        <div className="flex justify-between text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
          <p>Available: {product.quantity} {product.unit}</p>
          <p>Farmer: {product.farmer.name}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 bg-white transition-colors duration-300 group-hover:bg-gray-50">
        <Button
          className="w-full bg-farm-green hover:bg-farm-green-dark transition-all duration-300 transform hover:scale-105"
          onClick={handleAddToCart}
          disabled={isLoading || product.quantity === 0}
        >
          {isLoading ? 'Adding...' : product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
