
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/types";
import { getProductById } from "@/services/productService";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-10 h-10 border-4 border-t-brandPrimary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4">Loading product details...</p>
    </div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p>The product you're looking for doesn't exist or has been removed.</p>
      <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
    </div>;
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-textPrimary mb-2">{product.name}</h1>
          <div className="text-sm text-textSecondary mb-4">{product.category}</div>
          <div className="flex items-center mb-4">
            {product.salePrice ? (
              <>
                <span className="text-brandPrimary font-semibold text-xl">${product.salePrice.toFixed(2)}</span>
                <span className="text-textSecondary line-through ml-2">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-textPrimary font-semibold text-xl">${product.price.toFixed(2)}</span>
            )}
          </div>
          <p className="text-textPrimary mb-6">{product.description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button 
                onClick={decrementQuantity} 
                variant="ghost" 
                size="icon"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4">{quantity}</span>
              <Button onClick={incrementQuantity} variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={() => addToCart(product, quantity)}
              className="bg-brandPrimary hover:bg-brandSecondary text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
