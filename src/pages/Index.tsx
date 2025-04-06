import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import ProductFilter from '@/components/ProductFilter';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { products as productsApi } from '@/services/api';
import { Product } from '@/data/products';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-farm-cream to-white py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-farm-green mr-2" />
                  <span className="text-farm-green font-semibold">Farm Fresh • Direct to You</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Fresh from the <span className="text-farm-green">Farm</span> to your Table
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Support local farmers and enjoy the freshest produce delivered directly to your door. 
                  Farm-fresh vegetables, fruits, and grains with no middlemen.
                </p>
                <a href="#marketplace" className="inline-flex items-center px-8 py-4 bg-farm-green hover:bg-farm-green-dark text-white font-medium rounded-md transition-colors duration-200 text-lg">
                  Shop Now
                </a>
              </div>
            </div>
          </section>

          {/* Marketplace Section */}
          <section id="marketplace" className="py-12 md:py-16 bg-gray-50">
            <div className="container px-4 md:px-6">
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Farm Fresh Marketplace</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Browse our selection of farm-fresh produce, directly from local farmers to your kitchen.
                </p>
              </div>

              <ProductFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
              />

              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <ProductGrid products={filteredProducts} />
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-farm-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fresh & Organic</h3>
                  <p className="text-gray-600">
                    We source the freshest produce directly from local organic farms, ensuring quality and sustainability.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-farm-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fair Prices</h3>
                  <p className="text-gray-600">
                    By connecting farmers directly with consumers, we ensure fair prices for everyone in the supply chain.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-farm-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
                  <p className="text-gray-600">
                    From harvest to your doorstep in record time, preserving freshness and flavor for your enjoyment.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-farm-green-dark text-xl font-bold">FarmFresh</span>
                <span className="text-farm-brown ml-1 text-xl font-bold">Market</span>
              </div>
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} FarmFresh Market. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;
