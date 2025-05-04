
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

const ProductsGrid = ({
  products,
  loading,
  totalProducts,
  currentPage,
  totalPages,
  onPageChange,
  onClearFilters
}: ProductsGridProps) => {
  return (
    <div className="w-full">
      {/* Results Summary */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="text-textSecondary mb-3 sm:mb-0">
          Showing {products.length} of {totalProducts} products
        </p>
        <div className="flex items-center">
          <span className="mr-3 text-textSecondary hidden sm:inline">View</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="21" y1="4" x2="3" y2="4"></line>
                <line x1="21" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="20" x2="3" y2="20"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-t-brandPrimary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-textSecondary mb-4">
            Try adjusting your filters or search query.
          </p>
          <Button onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} _id={product._id} />
            ))}
          </div>
          
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsGrid;
