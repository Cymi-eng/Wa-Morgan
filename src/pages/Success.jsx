import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

function Success() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="max-w-lg w-full text-center bg-white shadow-lg rounded-xl p-10 border">

        <div className="flex justify-center mb-6">
          <CheckCircle2
            className="h-24 w-24 text-green-500"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-4xl font-bold text-[#0E1733] mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 leading-7 mb-8">
          Thank you for shopping with <strong>Wa-Morgan</strong>.
          Your order has been received successfully and is now being processed.
          You will receive a confirmation email shortly with your order details.
        </p>

        <div className="space-y-3">

          <Button
            asChild
            className="w-full bg-[#F98603] hover:bg-[#e67d00] text-[#0E1733] font-semibold"
          >
            <Link to="/">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>

        </div>

      </div>

    </div>
  );
}

export default Success;