import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 SEARCH FILTER LOGIC
  const filteredProducts = products.filter((product) => {
  // Search filter
  const matchesSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  // Category filter
  let matchesCategory = true;

  if (category === "men") {
    matchesCategory = product.category === "men's clothing";
  }

  if (category === "women") {
    matchesCategory = product.category === "women's clothing";
  }

  return matchesSearch && matchesCategory;
});

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-[#0E1733] mb-6">
  {category === "men"
    ? "Men's Collection"
    : category === "women"
    ? "Women's Collection"
    : "Our Products"}
</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 mb-8 p-3 border border-[#0E1733]/20 rounded-md focus:outline-none focus:border-[#F98603] focus:ring-1 focus:ring-[#F98603]"
      />

      {/* LOADING STATE */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <>
          {/* NO RESULTS */}
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">
              No products found for "{search}"
            </p>
          ) : (
            /* PRODUCT GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default ProductList;