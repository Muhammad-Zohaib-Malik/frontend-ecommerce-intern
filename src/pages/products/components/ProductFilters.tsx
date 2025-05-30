import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: string;
  selectedSort: string;
  searchTerm: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

const ProductFilters = ({
  searchTerm,
  priceRange,
  onSearchChange,
  onSearchSubmit,
  onPriceRangeChange
}: ProductFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      {/* Search */}
      <form onSubmit={onSearchSubmit} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)} // Update search term as user types
            className="pr-10"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <Search className="h-4 w-4 text-textSecondary" />
          </button>
        </div>
      </form>


    
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3 uppercase text-textSecondary">Price Range</h4>
        <div className="mb-4">
          <Slider
            defaultValue={[0, 500]}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="mt-6"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-textSecondary">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
    </div>
  );
};

export default ProductFilters;
