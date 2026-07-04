import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Men", path: "/products?category=men" },
    { name: "Women", path: "/products?category=women" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0E1733] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <ShoppingBag className="h-7 w-7 text-[#F98603]" />

          <div>
            <h1 className="text-xl font-bold">Wa-Morgan</h1>

            <p className="text-xs text-gray-300">Dress Better. Live Better.</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#F98603] font-semibold border-b-2 border-[#F98603] pb-1"
                  : "text-white hover:text-[#F98603] transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative text-white hover:text-[#F98603]">
            <ShoppingCart className="h-6 w-6" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="text-white font-medium">
                Welcome, <span className="text-[#F98603]">{user?.name}</span>
              </span>

              <Button
                onClick={logout}
                className="bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733] font-semibold"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                asChild
                className="border-[#F98603] text-[#F98603] hover:bg-[#F98603] hover:text-[#0E1733]"
              >
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                className="bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733] font-semibold"
              >
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
