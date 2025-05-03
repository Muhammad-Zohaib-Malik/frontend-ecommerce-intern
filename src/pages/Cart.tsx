
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MinusIcon,
  PlusIcon,
  Trash2,
  ShoppingBag,
  ChevronRight
} from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Reset discount when cart changes
    setDiscount(0);
  }, [cart]);

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Apply mock discount for "DISCOUNT20" coupon
    if (couponCode.toUpperCase() === "DISCOUNT20") {
      setDiscount(totalPrice * 0.2);
    } else {
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-textSecondary mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-textSecondary mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild className="bg-brandPrimary hover:bg-brandSecondary">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden sm:grid sm:grid-cols-5 text-sm text-textSecondary mb-4">
              <div className="sm:col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Subtotal</div>
            </div>

            <div className="space-y-6">
              {cart.map((item) => {
                const productPrice = item.product.salePrice || item.product.price;
                const subtotal = productPrice * item.quantity;

                return (
                  <div key={item.product.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="grid sm:grid-cols-5 gap-4">
                      {/* Product Info */}
                      <div className="sm:col-span-2 flex">
                        <Link to={`/product/${item.product.id}`} className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="ml-4">
                          <Link to={`/product/${item.product.id}`} className="font-medium text-textPrimary hover:text-brandPrimary transition-colors">
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-textSecondary mt-1">
                            {item.product.category}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-auto mt-2 text-xs sm:hidden"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="sm:text-center">
                        <div className="sm:hidden text-sm text-textSecondary mb-1">Price:</div>
                        <div>
                          {item.product.salePrice ? (
                            <div className="flex sm:justify-center items-center">
                              <span className="text-brandPrimary font-medium">
                                ${item.product.salePrice.toFixed(2)}
                              </span>
                              <span className="text-textSecondary text-sm line-through ml-2">
                                ${item.product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span>${item.product.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="sm:text-center">
                        <div className="sm:hidden text-sm text-textSecondary mb-1">Quantity:</div>
                        <div className="flex items-center sm:justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </Button>
                          <span className="mx-3 w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="sm:text-center">
                        <div className="sm:hidden text-sm text-textSecondary mb-1">Subtotal:</div>
                        <div className="font-medium">${subtotal.toFixed(2)}</div>
                      </div>

                      {/* Remove Button (visible only on desktop) */}
                      <div className="hidden sm:flex sm:justify-center sm:items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Button
              asChild
              variant="outline"
              className="flex items-center text-brandPrimary"
            >
              <Link to="/products">
                <ChevronRight className="h-4 w-4 mr-1 transform rotate-180" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-textSecondary">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-textSecondary">Discount</span>
                  <span className="text-green-600">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-textSecondary">Shipping</span>
                <span>{totalPrice >= 100 ? "Free" : "$10.00"}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    ${(totalPrice - discount + (totalPrice >= 100 ? 0 : 10)).toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-textSecondary mt-1">
                  Tax included
                </div>
              </div>
            </div>

            {/* Coupon */}
            <form onSubmit={handleCouponApply} className="mb-6">
              <div className="text-sm mb-2">Apply Coupon Code</div>
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" variant="outline">
                  Apply
                </Button>
              </div>
              {couponCode && couponCode.toUpperCase() === "DISCOUNT20" && discount > 0 ? (
                <div className="text-green-600 text-sm mt-2">
                  Coupon applied: 20% off
                </div>
              ) : couponCode && couponCode.toUpperCase() !== "DISCOUNT20" ? (
                <div className="text-red-500 text-sm mt-2">
                  Invalid coupon code
                </div>
              ) : null}
              <div className="text-xs text-textSecondary mt-2">
                Try "DISCOUNT20" for 20% off
              </div>
            </form>

            {/* Checkout Button */}
            <Button
              className="w-full bg-brandPrimary hover:bg-brandSecondary"
              size="lg"
            >
              Proceed to Checkout
            </Button>
            
            {/* Payment Options */}
            <div className="mt-4 text-center">
              <div className="text-sm text-textSecondary mb-2">We accept:</div>
              <div className="flex justify-center space-x-2">
                {/* Mock payment icons */}
                {["visa", "mastercard", "amex", "paypal"].map((method) => (
                  <div 
                    key={method} 
                    className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-textSecondary"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
