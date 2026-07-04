import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CreditCard, Wallet, Truck } from "lucide-react";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Shipping Details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Error Message
  const [error, setError] = useState("");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  // M-Pesa
  const [mpesaPhone, setMpesaPhone] = useState("");

  // Card Details
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    setError("");

    // Shipping Validation
    if (!formData.name || !formData.email || !formData.address) {
      setError("Please fill in all shipping details.");
      return;
    }

    // M-Pesa Validation
    if (paymentMethod === "mpesa" && !mpesaPhone) {
      setError("Please enter your M-Pesa phone number.");
      return;
    }

    // Card Validation
    if (
      paymentMethod === "card" &&
      (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)
    ) {
      setError("Please complete all card details.");
      return;
    }

    const orderPayload = {
      shipping: formData,
      payment: {
        method: paymentMethod,
        details:
          paymentMethod === "mpesa"
            ? { mpesaPhone }
            : paymentMethod === "card"
              ? cardDetails
              : null,
      },
      items: cart,
      total: totalPrice,
    };

    console.log("Order Submitted:", orderPayload);

    // Clear Cart
    setCart([]);

    // Redirect
    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <div className="container max-w-md mx-auto text-center py-12 space-y-4">
        <p className="text-gray-500">Your cart is empty. Cannot checkout.</p>

        <Button
          onClick={() => navigate("/")}
          className="bg-[#F98603] hover:bg-[#e57f03] text-[#0E1733]"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl p-6 grid md:grid-cols-2 gap-8">
      {/* LEFT COLUMN */}
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* SHIPPING DETAILS */}
        <Card>
          <CardHeader className="bg-[#0E1733] text-white rounded-t-lg">
            <CardTitle>Shipping Details</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your delivery information below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            {error && (
              <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium">Full Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Email Address</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Delivery Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Market St, Nairobi"
              />
            </div>
          </CardContent>
        </Card>

        {/* PAYMENT METHODS */}
        <Card>
          <CardHeader className="bg-[#0E1733] text-white rounded-t-lg">
            <CardTitle>Payment Method</CardTitle>
            <CardDescription className="text-gray-300">
              Select your preferred payment option
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentMethod("mpesa")}
                className={`h-16 flex flex-col gap-1 ${
                  paymentMethod === "mpesa"
                    ? "bg-[#F98603] text-[#0E1733] border-[#F98603]"
                    : ""
                }`}
              >
                <Wallet className="h-4 w-4" />
                <span>M-Pesa</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentMethod("card")}
                className={`h-16 flex flex-col gap-1 ${
                  paymentMethod === "card"
                    ? "bg-[#F98603] text-[#0E1733] border-[#F98603]"
                    : ""
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Card</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentMethod("cod")}
                className={`h-16 flex flex-col gap-1 ${
                  paymentMethod === "cod"
                    ? "bg-[#F98603] text-[#0E1733] border-[#F98603]"
                    : ""
                }`}
              >
                <Truck className="h-4 w-4" />
                <span>C.O.D</span>
              </Button>
            </div>

            {/* MPESA */}
            {paymentMethod === "mpesa" && (
              <div className="space-y-2 p-4 border rounded-lg">
                <label className="text-xs font-medium">
                  M-Pesa Phone Number
                </label>

                <Input
                  type="tel"
                  placeholder="0712345678"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                />
              </div>
            )}

            {/* CARD */}
            {paymentMethod === "card" && (
              <div className="space-y-3 p-4 border rounded-lg">
                <Input
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      number: e.target.value,
                    })
                  }
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiry: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="CVC"
                    value={cardDetails.cvc}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cvc: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* CASH ON DELIVERY */}
            {paymentMethod === "cod" && (
              <div className="p-4 border rounded-lg text-sm text-gray-600">
                Pay when your order is delivered.
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#F98603] hover:bg-[#e57f03] text-[#0E1733] font-semibold"
            >
              Place Order (Ksh. {totalPrice.toFixed(2)})
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* ORDER SUMMARY */}
      <Card className="h-fit">
        <CardHeader className="bg-[#0E1733] text-white rounded-t-lg">
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="divide-y divide-border text-sm pt-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-3">
              <span>
                {item.title}
                <strong> x{item.quantity || 1}</strong>
              </span>

              <span className="font-medium text-[#F98603]">
                Ksh. {(item.price * (item.quantity || 1)).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg pt-4">
            <span>Total</span>
            <span className="text-[#F98603]">Ksh. {totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
