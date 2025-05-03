
import { ReactNode } from "react";

interface ProductsLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

const ProductsLayout = ({ sidebar, content }: ProductsLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          {sidebar}
        </div>
        <div className="w-full lg:w-3/4">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ProductsLayout;
