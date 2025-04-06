import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { isOpen, setIsOpen, totalItems } = useCart();
  const { theme } = useTheme();

  const getThemeTextColor = () => {
    switch (theme) {
      case 'light': return 'text-farm-green';
      case 'dark': return 'text-white';
      case 'maroon': return 'text-white';
      case 'green': return 'text-white';
      case 'peach': return 'text-gray-900';
      default: return 'text-gray-900';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-theme-primary border-b shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2 text-theme-text hover:text-theme-accent transition-transform duration-300 hover:scale-110"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <span className={`text-2xl font-bold tracking-tight ${getThemeTextColor()} transition-all duration-300 group-hover:scale-105 hover:text-theme-accent`}>
                AgriSetu
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 ml-10">
            {/* Show Home and Market for everyone when not logged in, and for customers when logged in */}
            {(!isAuthenticated || !user || user.role === 'customer') && (
              <>
                <Link 
                  to="/" 
                  className={`${getThemeTextColor()} hover:text-theme-accent font-medium transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-theme-accent after:transition-all after:duration-300 hover:after:w-full`}
                >
                  Home
                </Link>
                <a 
                  href="#marketplace" 
                  className={`${getThemeTextColor()} hover:text-theme-accent font-medium transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-theme-accent after:transition-all after:duration-300 hover:after:w-full`}
                >
                  Market
                </a>
              </>
            )}
            
            {/* Show For Farmers for everyone when not logged in, and for farmers when logged in */}
            {(!isAuthenticated || !user || user.role === 'farmer') && (
              <Link 
                to="/farmers" 
                className={`${getThemeTextColor()} hover:text-theme-accent font-medium transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-theme-accent after:transition-all after:duration-300 hover:after:w-full`}
              >
                For Farmers
              </Link>
            )}
            
            <Link 
              to="/quiz" 
              className={`${getThemeTextColor()} hover:text-theme-accent font-medium transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-theme-accent after:transition-all after:duration-300 hover:after:w-full`}
            >
              Quiz
            </Link>
            
            <a 
              href="#" 
              className={`${getThemeTextColor()} hover:text-theme-accent font-medium transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-theme-accent after:transition-all after:duration-300 hover:after:w-full`}
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            {/* Only show cart button for customers or non-authenticated users */}
            {(!isAuthenticated || !user || user.role === 'customer') && (
              <Button 
                variant="ghost" 
                onClick={() => setIsOpen(true)} 
                className={`relative ${getThemeTextColor()} hover:text-theme-accent transition-all duration-300 hover:scale-110`}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-theme-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    {totalItems}
                  </span>
                )}
              </Button>
            )}
            <ProfileMenu />
          </div>
        </div>
      </header>

      <CartDrawer 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Navbar;
