import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Cart({ onCheckout }) {
  const { cart, removeFromCart, setCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (onCheckout) onCheckout();
    navigate("/checkout");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Shopping Cart</span>
            <span className="text-sm text-muted-foreground">
              ({cart.length} items)
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-center py-6 text-muted-foreground text-sm">
              Your cart is empty.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 text-sm"
                >
                  <div>
                    <p className="font-medium line-clamp-1">
                      {item.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {cart.length > 0 && (
          <CardFooter className="flex-col gap-4 border-t pt-4">
            <div className="flex justify-between w-full font-semibold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClearCart}
              >
                Clear
              </Button>

              <Button className="flex-1" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default Cart;