import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Star, Loader2 } from "lucide-react";

import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#F98603]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">Product not found.</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Product Image */}
        <div className="bg-[#0E1733]/5 rounded-2xl p-6 sm:p-10 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 sm:h-80 md:h-96 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E1733] leading-tight">
            {product.title}
          </h1>

          <p className="mt-4 text-3xl sm:text-4xl font-bold text-[#F98603]">
            ${product.price}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <Star className="h-5 w-5 fill-[#F98603] text-[#F98603]" />

            <span className="font-medium">{product.rating.rate}</span>

            <span className="text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-8 text-base sm:text-lg">
            {product.description}
          </p>

          {/* Add to Cart */}
          <Button
            onClick={() => addToCart(product)}
            className="mt-8 w-full sm:w-auto bg-[#0E1733] hover:bg-[#1b2958] text-white px-10 py-6 text-base font-semibold"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
