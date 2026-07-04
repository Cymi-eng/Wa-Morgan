import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="min-h-screen bg-[#0E1733]/5">
      {/* HERO SECTION */}
      <section className="bg-[#0E1733] text-white py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Welcome to <span className="text-[#F98603]">Wa-Morgan</span>
          </h1>

          <p className="mt-6 text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Your modern clothing store for stylish, affordable and premium
            fashion.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-[#F98603] text-[#0E1733] hover:bg-[#ff9a1f] w-full sm:w-auto"
            >
              <Link to="/products">Shop Now</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0E1733] w-full sm:w-auto"
            >
              <Link to="/products?category=women">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E1733] text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/products?category=men">
            <div className="bg-white border border-[#0E1733]/10 rounded-xl p-8 text-center hover:border-[#F98603] hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer h-full">
              <h3 className="text-xl font-semibold text-[#0E1733]">Men</h3>

              <p className="text-gray-500 mt-3">
                Stylish men's fashion for every occasion.
              </p>
            </div>
          </Link>

          <Link to="/products?category=women">
            <div className="bg-white border border-[#0E1733]/10 rounded-xl p-8 text-center hover:border-[#F98603] hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer h-full">
              <h3 className="text-xl font-semibold text-[#0E1733]">Women</h3>

              <p className="text-gray-500 mt-3">
                Elegant and modern women's collections.
              </p>
            </div>
          </Link>

          <Link to="/products">
            <div className="bg-white border border-[#0E1733]/10 rounded-xl p-8 text-center hover:border-[#F98603] hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer h-full">
              <h3 className="text-xl font-semibold text-[#0E1733]">
                Accessories
              </h3>

              <p className="text-gray-500 mt-3">
                Browse our complete collection of fashion items.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="bg-white border-t border-[#0E1733]/10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0E1733]">
            Discover the Latest Fashion Trends
          </h2>

          <p className="mt-4 text-gray-500 text-base md:text-lg">
            Explore our curated collection of premium clothing designed to
            elevate your style for every occasion.
          </p>

          <Button
            asChild
            className="mt-8 bg-[#F98603] text-[#0E1733] hover:bg-[#ff9a1f] w-full sm:w-auto"
          >
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
