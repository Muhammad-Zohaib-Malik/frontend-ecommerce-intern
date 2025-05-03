
import { Product } from '@/types';
import apiClient from './apiService';
import { products as mockProducts, categories as mockCategories } from '@/data/productData';


export const getAllProducts = async (page = 1, limit = 10, category?: string, search?: string) => {
  try {
    let url = '/products';
    const params: Record<string, string | number> = {
      page,
      limit
    };
    
    if (category && category !== 'all') {
      params.category = category;
    }
    
    if (search) {
      params.search = search;
    }
    
    const response = await apiClient.get(url, { params });
    return {
      products: response.data.products || response.data,
      totalPages: response.data.totalPages || 1,
      totalProducts: response.data.totalCount || response.data.length || 0
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data for development
    let filteredProducts = [...mockProducts];
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      totalPages: Math.ceil(filteredProducts.length / limit),
      totalProducts: filteredProducts.length
    };
  }
};

export const getProducts = async (category?: string, search?: string) => {
  try {
    let url = '/products';
    const params: Record<string, string> = {};
    
    if (category && category !== 'all') {
      params.category = category;
    }
    
    if (search) {
      params.search = search;
    }
    
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data
    let filteredProducts = [...mockProducts];
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredProducts;
  }
};

// Export categories from mock data
export const categories = mockCategories;

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const response = await apiClient.get('/products/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// Get product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// Create product (admin only)
export const addProduct = async (productData: Omit<Product, 'id'>) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product (admin only)
export const updateProduct = async (product: Product) => {
  try {
    const response = await apiClient.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${product.id}:`, error);
    throw error;
  }
};

// Delete product (admin only)
export const deleteProduct = async (id: string) => {
  try {
    await apiClient.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
