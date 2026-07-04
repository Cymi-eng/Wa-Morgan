import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0E1733] text-white mt-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-lg sm:text-xl font-bold text-[#F98603]">
            Wa-Morgan
          </h2>
          <p className="text-sm text-gray-300 mt-2 max-w-xs">
            Dress better. Live better. Your modern fashion store.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-semibold text-[#F98603] mb-3">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-[#F98603] transition-colors">Home</Link>
            <Link to="/products" className="hover:text-[#F98603] transition-colors">Products</Link>
            <Link to="/cart" className="hover:text-[#F98603] transition-colors">Cart</Link>
            <Link to="/login" className="hover:text-[#F98603] transition-colors">Login</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-semibold text-[#F98603] mb-3">
            Contact
          </h3>

          <p className="text-sm text-gray-300 break-all sm:break-normal">
            Email: wamorgan@gmail.com
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Phone: +254 704 019 505
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 text-center py-4 px-4 text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#F98603] font-medium">
          Wa-Morgan
        </span>
        . All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;