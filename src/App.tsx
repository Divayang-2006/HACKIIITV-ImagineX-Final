import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Farmers from "./pages/Farmers";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

// Custom routes based on authentication and role
const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: 'customer' | 'farmer' }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user && user.role !== allowedRole) {
    return <Navigate to={user.role === 'farmer' ? '/farmers' : '/'} />;
  }
  
  return children;
};

// Routes that require authentication but allow guest preview
const RoleBasedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: 'customer' | 'farmer' }) => {
  const { isAuthenticated, user } = useAuth();
  
  // If authenticated, enforce role restrictions
  if (isAuthenticated && user && user.role !== requiredRole) {
    return <Navigate to={user.role === 'farmer' ? '/farmers' : '/'} />;
  }
  
  // Allow guests or users with the correct role
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? 
          <Navigate to={user?.role === 'farmer' ? '/farmers' : '/'} /> : 
          <Login />
      } />
      <Route path="/signup" element={
        isAuthenticated ? 
          <Navigate to={user?.role === 'farmer' ? '/farmers' : '/'} /> : 
          <Signup />
      } />
      <Route path="/" element={
        <RoleBasedRoute requiredRole="customer">
          <Index />
        </RoleBasedRoute>
      } />
      <Route path="/farmers" element={
        <RoleBasedRoute requiredRole="farmer">
          <Farmers />
        </RoleBasedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
