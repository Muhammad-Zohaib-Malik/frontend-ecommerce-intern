
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/types";
import { getAllProducts } from "@/services/productService";
import ProductsLayout from "./products/components/ProductsLayout";
import ProductFilters from "./products/components/ProductFilters";
import ProductsGrid from "./products/components/ProductsGrid";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get query parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch products with current filters
        const result = await getAllProducts(currentPage, 8, selectedCategory !== 'all' ? selectedCategory : undefined);
        
        // Filter by price if needed
        const filteredByPrice = result.products.filter(product => {
          const price = product.salePrice || product.price;
          return price >= priceRange[0] && price <= priceRange[1];
        });
        
        // Filter by search term if needed
        const filteredProducts = searchTerm
          ? filteredByPrice.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : filteredByPrice;
        
        setProducts(filteredProducts);
        setTotalPages(result.totalPages);
        setTotalProducts(result.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [currentPage, selectedCategory, priceRange, searchTerm]);

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    searchParams.set("category", category);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 500]);
    setSearchTerm("");
    handleCategoryChange("all");
  };

  return (
    <ProductsLayout
      sidebar={
        <ProductFilters
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          priceRange={priceRange}
          onCategoryChange={handleCategoryChange}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearch}
          onPriceRangeChange={setPriceRange}
        />
      }
      content={
        <ProductsGrid
          products={products}
          loading={loading}
          totalProducts={totalProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onClearFilters={handleClearFilters}
        />
      }
    />
  );
};

export default Products;
