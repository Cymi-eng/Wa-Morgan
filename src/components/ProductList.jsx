import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        // Keep only clothing products
        const clothingProducts = data.filter(
          (product) =>
            product.category === "men's clothing" ||
            product.category === "women's clothing"
        );

        setProducts(clothingProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-xl py-10">
        Loading products...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-red-600 py-10">
        {error}
      </h2>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;