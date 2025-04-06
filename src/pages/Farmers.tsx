
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import FarmerDashboard from '@/components/farmer/FarmerDashboard';
import { CartProvider } from '@/context/CartContext';
import { Leaf } from 'lucide-react';

const Farmers = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-farm-cream to-white py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-farm-green-dark rounded-full p-3">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Farmer Portal
                </h1>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  List your farm-fresh produce directly to consumers, analyze your soil quality, 
                  and get crop recommendations tailored to your land.
                </p>
              </div>
            </div>
          </section>

          {/* Farmer Dashboard Section */}
          <section className="py-12 bg-gray-50">
            <div className="container px-4 md:px-6">
              <FarmerDashboard />
            </div>
          </section>
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src="/lovable-uploads/b39b8a65-0b1e-4327-bf8b-ea6f7e445296.png" 
                  alt="AgriSetu Logo" 
                  className="h-8 w-8 mr-2" 
                />
                <span className="text-farm-green-dark text-xl font-bold">AgriSetu</span>
              </div>
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} AgriSetu. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Farmers;
