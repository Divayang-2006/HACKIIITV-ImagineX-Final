import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from './ProductForm';
import ProductsList from './ProductsList';
import SoilAnalysisForm from './SoilAnalysisForm';
import CropRecommendations from './CropRecommendations';
import { Product, SoilData } from '@/data/products';
import { toast } from 'sonner';
import { products as productsApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [activeTab, setActiveTab] = useState('add');
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated or not a farmer, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'farmer') {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (!user?.id) {
          toast.error('User ID not found');
          return;
        }
        console.log('Fetching products for farmer:', user.id);
        const data = await productsApi.getFarmerProducts(user.id);
        console.log('Fetched products:', data);
        setFarmerProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user?.id, isAuthenticated, user?.role, navigate]);

  const handleAddProduct = async (product: Product) => {
    try {
      if (!user?.id) {
        toast.error('User ID not found');
        return;
      }

      setLoading(true);
      if (editingProduct) {
        // Update existing product
        const updatedProduct = await productsApi.update(editingProduct._id, {
          ...product,
          farmer: user.id
        });
        setFarmerProducts(farmerProducts.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        setEditingProduct(null);
        toast.success('Product updated successfully');
      } else {
        // Add new product
        const newProduct = await productsApi.create({
          ...product,
          farmer: user.id
        });
        setFarmerProducts([...farmerProducts, newProduct]);
        toast.success('Product added successfully');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('add');
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setLoading(true);
      await productsApi.delete(productId);
      setFarmerProducts(farmerProducts.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSoilDataSubmit = (data: SoilData) => {
    setSoilData(data);
    toast.success('Soil data analyzed successfully');
    setActiveTab('results');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (user?.role !== 'farmer') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add">{editingProduct ? 'Edit Product' : 'Add Product'}</TabsTrigger>
          <TabsTrigger value="listings">My Products</TabsTrigger>
          <TabsTrigger value="soil">Soil & Crop Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="p-4 md:p-6">
          <ProductForm 
            onSubmit={handleAddProduct} 
            editProduct={editingProduct}
            onCancel={cancelEdit}
            isLoading={loading}
          />
        </TabsContent>
        
        <TabsContent value="listings" className="p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-farm-green"></div>
            </div>
          ) : (
            <ProductsList 
              products={farmerProducts} 
              onEdit={handleEditProduct} 
              onDelete={handleDeleteProduct} 
            />
          )}
        </TabsContent>

        <TabsContent value="soil" className="p-4 md:p-6">
          {!soilData && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Soil Quality Analysis</h2>
                <p className="text-gray-600">
                  Upload your soil test results to get personalized crop recommendations, 
                  weather condition insights, and fertilizer suggestions.
                </p>
              </div>
              <SoilAnalysisForm 
                onSubmit={handleSoilDataSubmit}
                farmerId={user?.id || ''}
              />
            </>
          )}
          
          {soilData && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Soil Analysis Results</h2>
                  <p className="text-gray-600">
                    Based on your soil data, here are our crop recommendations
                  </p>
                </div>
                <button 
                  onClick={() => setSoilData(null)} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Analyze New Soil Sample
                </button>
              </div>
              <CropRecommendations soilData={soilData} />
            </>
          )}
        </TabsContent>

        <TabsContent value="results" className="p-4 md:p-6">
          {soilData ? (
            <CropRecommendations soilData={soilData} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No soil analysis results yet</h3>
              <p className="text-gray-500 mt-2">Submit soil data in the Soil Analysis tab to see recommendations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
