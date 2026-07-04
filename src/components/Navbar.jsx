import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useAuth();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Men", path: "/products?category=men" },
    { name: "Women", path: "/products?category=women" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0E1733] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <ShoppingBag className="h-7 w-7 text-[#F98603]" />

          <div>
            <h1 className="text-lg md:text-xl font-bold">Wa-Morgan</h1>

            <p className="hidden sm:block text-xs text-gray-300">
              Dress Better. Live Better.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = location.pathname + location.search === link.path;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={
                  active
                    ? "text-[#F98603] font-semibold border-b-2 border-[#F98603] pb-1"
                    : "text-white hover:text-[#F98603] transition"
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
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
                className="bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733]"
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
                className="bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733]"
              >
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart" className="relative text-white">
            <ShoppingCart className="h-6 w-6" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0E1733] border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => {
              const active = location.pathname + location.search === link.path;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={
                    active
                      ? "text-[#F98603] font-semibold"
                      : "text-white hover:text-[#F98603] transition"
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-[#F98603] transition"
            >
              Cart ({totalItems})
            </Link>

            <div className="border-t border-white/20 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-white">
                    Welcome,{" "}
                    <span className="text-[#F98603] font-semibold">
                      {user?.name}
                    </span>
                  </p>

                  <Button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733] font-semibold"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#F98603] text-[#F98603] hover:bg-[#F98603] hover:text-[#0E1733]"
                  >
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="w-full bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733] font-semibold"
                  >
                    <Link to="/register" onClick={() => setMenuOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
