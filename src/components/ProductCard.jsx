import { useContext } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import { CartContext } from "../context/CartContext";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-[#0E1733]/10 hover:border-[#F98603]">

      {/* Product Image */}
      <div className="h-64 flex items-center justify-center bg-[#0E1733]/5 p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <CardContent className="space-y-3 pt-5">
        <h2 className="text-lg font-semibold line-clamp-2 text-[#0E1733]">
          {product.title}
        </h2>

        <p className="text-2xl font-bold text-[#F98603]">
          ${product.price}
        </p>

        {/* Brand */}
        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Star className="h-4 w-4 fill-[#F98603] text-[#F98603]" />

          <span className="font-medium">
            {product.rating.toFixed(1)}
          </span>

          <span>
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>
      </CardContent>

      {/* Buttons */}
      <CardFooter className="flex gap-2">

        <Button
          asChild
          className="flex-1 bg-[#0E1733] hover:bg-[#0E1733]/90 text-white"
        >
          <Link to={`/products/${product.id}`}>
            View Details
          </Link>
        </Button>

        <Button
          className="flex-1 border border-[#F98603] text-[#F98603] hover:bg-[#F98603] hover:text-[#0E1733]"
          variant="outline"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>

      </CardFooter>

    </Card>
  );
}

export default ProductCard;