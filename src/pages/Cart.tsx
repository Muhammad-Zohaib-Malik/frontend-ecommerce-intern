
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

import {
  MinusIcon,
  PlusIcon,
  Trash2,
  ShoppingBag,
  ChevronRight
} from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();




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
        
      </div>
    </div>
  );
};

export default Cart;
