import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search & Category Filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesCategory = true;

    if (category === "men") {
      matchesCategory = [
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
      ].includes(product.category);
    }

    if (category === "women") {
      matchesCategory = [
        "womens-dresses",
        "womens-shoes",
        "womens-bags",
        "womens-jewellery",
        "tops",
        "sunglasses",
      ].includes(product.category);
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#0E1733] mb-6">
        {category === "men"
          ? "Men's Collection"
          : category === "women"
          ? "Women's Collection"
          : "Our Products"}
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 mb-8 p-3 border border-[#0E1733]/20 rounded-md focus:outline-none focus:border-[#F98603] focus:ring-1 focus:ring-[#F98603]"
      />

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-[#F98603]" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default ProductList;