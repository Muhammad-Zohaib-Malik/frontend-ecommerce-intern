import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, LogOut, Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brandPrimary">
            ShopNest
          </Link>

          {/* Desktop Search, Cart, and Account */}
          <div className="hidden md:flex items-center space-x-4">
            

            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-textPrimary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brandPrimary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-2">
                    <User className="w-6 h-6 text-textPrimary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-4 py-2 border-b">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-textSecondary">{user?.email}</p>
                  </div>
                  {isAdmin && (
                    <Link to="/admin">
                      <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Mobile cart link */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-textPrimary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brandPrimary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white py-2 px-4 space-y-3 flex flex-col">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-textPrimary hover:text-brandPrimary transition-colors py-2 border-b border-gray-100"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-textPrimary hover:text-brandPrimary transition-colors py-2 border-b border-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  variant="ghost"
                  className="justify-start px-0 text-red-500 hover:bg-transparent hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-2 pt-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
