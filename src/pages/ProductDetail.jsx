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
        <Loader2 className="animate-spin text-[#F98603]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* Image */}
      <div className="bg-[#0E1733]/5 p-10 rounded-xl flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-[300px] object-contain"
        />
      </div>

      {/* Details */}
      <div>

        <h1 className="text-2xl font-bold text-[#0E1733]">
          {product.title}
        </h1>

        <p className="text-3xl font-bold text-[#F98603] mt-4">
          ${product.price}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <Star className="h-4 w-4 fill-[#F98603] text-[#F98603]" />
          <span>{product.rating.rate}</span>
          <span>({product.rating.count} reviews)</span>
        </div>

        {/* Description */}
        <p className="mt-5 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Button */}
        <Button
          onClick={() => addToCart(product)}
          className="mt-6 bg-[#0E1733] hover:bg-[#0E1733]/90 text-white w-full"
        >
          Add to Cart
        </Button>

      </div>
    </div>
  );
}

export default ProductDetails;