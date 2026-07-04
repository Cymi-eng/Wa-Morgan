import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Men", path: "/products?category=men" },
    { name: "Women", path: "/products?category=women" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0E1733] text-white border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-7 w-7" />
          <div>
            <h1 className="text-xl font-bold text-[#F98603]">Wa-Morgan</h1>
            <p className="text-xs text-gray-500">
              Dress Better. Live Better.
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-[#F98603] border-b-2 border-[#F98603] pb-1"
                  : "text-gray-300 hover:text-[#F98603] transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Cart with badge */}
          <Button variant="ghost" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Auth buttons */}
          <Button variant="outline text-white" asChild>
            <Link to="/login">
              Login
            </Link>
          </Button>

          <Button asChild>
            <Link to="/register">
              Register
            </Link>
          </Button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;