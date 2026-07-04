import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0E1733] text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-[#F98603]">
            Wa-Morgan
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            Dress better. Live better. Your modern fashion store.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-[#F98603] mb-3">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-[#F98603]">Home</Link>
            <Link to="/products" className="hover:text-[#F98603]">Products</Link>
            <Link to="/cart" className="hover:text-[#F98603]">Cart</Link>
            <Link to="/login" className="hover:text-[#F98603]">Login</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-[#F98603] mb-3">
            Contact
          </h3>

          <p className="text-sm text-gray-300">
            Email: wamorgan@gmail.com
          </p>
          <p className="text-sm text-gray-300">
            Phone: +254 704 019 505
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
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