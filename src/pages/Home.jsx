import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="min-h-screen bg-[#0E1733]/5">

      {/* HERO SECTION */}
      <section className="bg-[#0E1733] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to <span className="text-[#F98603]">Wa-Morgan</span>
        </h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Your modern clothing store for stylish, affordable and premium fashion.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button className="bg-[#F98603] text-[#0E1733] hover:bg-[#ff9a1f]">
            Shop Now
          </Button>

          <Button variant="outline" className="text-black border-white hover:bg-white hover:text-[#0E1733]">
            Explore Categories
          </Button>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold text-[#0E1733] mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white border border-[#0E1733]/10 rounded-xl p-6 text-center hover:border-[#F98603] transition">
            <h3 className="text-lg font-semibold text-[#0E1733]">Men</h3>
            <p className="text-gray-500 text-sm mt-2">Stylish men’s fashion</p>
          </div>

          <div className="bg-white border border-[#0E1733]/10 rounded-xl p-6 text-center hover:border-[#F98603] transition">
            <h3 className="text-lg font-semibold text-[#0E1733]">Women</h3>
            <p className="text-gray-500 text-sm mt-2">Elegant women’s wear</p>
          </div>

          <div className="bg-white border border-[#0E1733]/10 rounded-xl p-6 text-center hover:border-[#F98603] transition">
            <h3 className="text-lg font-semibold text-[#0E1733]">Accessories</h3>
            <p className="text-gray-500 text-sm mt-2">Complete your look</p>
          </div>

        </div>
      </section>

      {/* FEATURE SECTION PLACEHOLDER */}
      <section className="bg-white py-16 px-6 border-t border-[#0E1733]/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0E1733]">
            Featured Products Coming Soon
          </h2>

          <p className="text-gray-500 mt-2">
            We’ll connect this to your product list next.
          </p>

          <Link to="/products">
            <Button className="mt-6 bg-[#F98603] text-[#0E1733] hover:bg-[#ff9a1f]">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;