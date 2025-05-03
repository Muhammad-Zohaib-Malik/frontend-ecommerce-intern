
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block overflow-hidden h-48 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform hover:scale-105 duration-300"
        />
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-textPrimary line-clamp-1 hover:text-brandPrimary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="text-sm text-textSecondary mb-2">
          {product.category}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {product.salePrice ? (
                <>
                  <span className="text-brandPrimary font-semibold">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-textSecondary line-through text-sm ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-textPrimary font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-textSecondary text-sm ml-1">{product.rating}</span>
              </div>
            )}
          </div>

          <Button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            variant="default"
            className="w-full bg-brandPrimary hover:bg-brandSecondary text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
