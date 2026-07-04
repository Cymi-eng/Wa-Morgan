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

  // Submitting state (prevents double-submit)
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMpesaPhone = (phone) =>
    /^(07|01)\d{8}$|^\+254\d{9}$/.test(phone.replace(/\s/g, ""));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    // Shipping Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.address.trim()) {
      setError("Please fill in all shipping details.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // M-Pesa Validation
    if (paymentMethod === "mpesa") {
      if (!mpesaPhone) {
        setError("Please enter your M-Pesa phone number.");
        return;
      }
      if (!isValidMpesaPhone(mpesaPhone)) {
        setError("Please enter a valid M-Pesa number (e.g. 0712345678).");
        return;
      }
    }

    // Card Validation
    if (paymentMethod === "card") {
      const cardNumberDigits = cardDetails.number.replace(/\s/g, "");
      if (!cardNumberDigits || !cardDetails.expiry || !cardDetails.cvc) {
        setError("Please complete all card details.");
        return;
      }
      if (cardNumberDigits.length < 13 || cardNumberDigits.length > 19) {
        setError("Please enter a valid card number.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        setError("Please enter expiry as MM/YY.");
        return;
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
        setError("Please enter a valid CVC.");
        return;
      }
    }

    setIsSubmitting(true);

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
      <div className="container max-w-md mx-auto text-center py-12 px-4 space-y-4">
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
    <div className="container mx-auto max-w-5xl px-4 py-6 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* LEFT COLUMN */}
      <form onSubmit={handlePlaceOrder} className="space-y-6 order-2 md:order-1">
        {/* SHIPPING DETAILS */}
        <Card>
          <CardHeader className="bg-[#0E1733] text-white rounded-t-lg px-4 sm:px-6">
            <CardTitle>Shipping Details</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your delivery information below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6 px-4 sm:px-6">
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="address" className="text-xs font-medium">
                Delivery Address
              </label>
              <Input
                id="address"
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
          <CardHeader className="bg-[#0E1733] text-white rounded-t-lg px-4 sm:px-6">
            <CardTitle>Payment Method</CardTitle>
            <CardDescription className="text-gray-300">
              Select your preferred payment option
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6 px-4 sm:px-6">
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentMethod("mpesa")}
                className={`h-16 sm:h-16 flex flex-col gap-1 px-1 text-xs sm:text-sm ${
                  paymentMethod === "mpesa"
                    ? "bg-[#F98603] text-[#0E1733] border-[#F98603]"
                    : ""
                }`}
              >
                <Wallet className="h-4 w-4 shrink-0" />
                <span className="truncate">M-Pesa</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentMethod("card")}
                className={`h-16 flex flex-col gap-1 px-1 text-xs sm:text-sm ${
                  paymentMethod === "card"
                    ? "bg-[#F98603] text-[#0E1733] border-[#F98603]"
                    : ""
                }`}
              >
                <CreditCard className="h-4 w-4 shrink-0" />
                <span className="truncate">Card</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentMethod("cod")}
                className={`h-16 flex flex-col gap-1 px-1 text-xs sm:text-sm ${
                  paymentMethod === "cod"
                    ? "bg-[#F98603] text-[#0E1733] border-[#F98603]"
                    : ""
                }`}
              >
                <Truck className="h-4 w-4 shrink-0" />
                <span className="truncate">C.O.D</span>
              </Button>
            </div>

            {/* MPESA */}
            {paymentMethod === "mpesa" && (
              <div className="space-y-2 p-4 border rounded-lg">
                <label htmlFor="mpesaPhone" className="text-xs font-medium">
                  M-Pesa Phone Number
                </label>

                <Input
                  id="mpesaPhone"
                  type="tel"
                  inputMode="numeric"
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
                  inputMode="numeric"
                  maxLength={19}
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
                    inputMode="numeric"
                    maxLength={5}
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
                    inputMode="numeric"
                    maxLength={4}
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

          <CardFooter className="px-4 sm:px-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F98603] hover:bg-[#e57f03] text-[#0E1733] font-semibold disabled:opacity-60"
            >
              {isSubmitting
                ? "Placing Order..."
                : `Place Order (Ksh. ${totalPrice.toFixed(2)})`}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* ORDER SUMMARY */}
      <Card className="h-fit order-1 md:order-2 md:sticky md:top-6">
        <CardHeader className="bg-[#0E1733] text-white rounded-t-lg px-4 sm:px-6">
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="divide-y divide-border text-sm pt-4 px-4 sm:px-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 py-3">
              <span className="truncate">
                {item.title}
                <strong> x{item.quantity || 1}</strong>
              </span>

              <span className="font-medium text-[#F98603] shrink-0">
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