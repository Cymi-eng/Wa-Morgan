import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Men", path: "/products?category=men" },
    { name: "Women", path: "/products?category=women" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-8 w-8 text-black" />

          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Wa-Morgan
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Dress Better. Live Better.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-black border-b-2 border-black pb-1"
                  : "font-medium text-gray-600 hover:text-black transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">

          <Button variant="ghost" asChild>
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/login">
              Login
            </Link>
          </Button>

          <Button asChild>
            <Link to="/register">
              <User className="mr-2 h-4 w-4" />
              Register
            </Link>
          </Button>

        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>

            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">

              <div className="mt-8 flex flex-col gap-6">

                <Link
                  to="/"
                  className="border-b pb-4"
                >
                  <h2 className="text-xl font-bold">
                    Wa-Morgan
                  </h2>

                  <p className="text-sm text-gray-500">
                    Dress Better. Live Better.
                  </p>
                </Link>

                {links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-black"
                        : "text-gray-600 hover:text-black"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                <hr />

                <Link
                  to="/cart"
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart
                </Link>

                <Link
                  to="/login"
                  className="font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="font-medium"
                >
                  Register
                </Link>

              </div>

            </SheetContent>

          </Sheet>
        </div>

      </div>
    </header>
  );
}