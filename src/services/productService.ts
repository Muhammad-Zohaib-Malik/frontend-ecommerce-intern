import { Product } from '@/types';
import apiClient from './apiService';

// Get all products with pagination, category, and search filter
export const getAllProducts = async (
  page = 1,
  limit = 10,
  category?: string,
  search?: string
) => {
  try {
    const params: Record<string, string | number> = { page, limit };

    if (category && category !== 'all') {
      params.category = category;
    }

    if (search) {
      params.search = search;
    }

    const response = await apiClient.get('/products', { params });
    const { products, totalPages, totalCount } = response.data;

    return {
      products,
      totalPages,
      totalProducts: totalCount
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get all products without pagination (used for featured, home, etc.)
export const getProducts = async (category?: string, search?: string) => {
  try {
    const params: Record<string, string> = {};

    if (category && category !== 'all') {
      params.category = category;
    }

    if (search) {
      params.search = search;
    }

    const response = await apiClient.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

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

// Get single product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// Create a new product (admin only)
export const addProduct = async (productData: Omit<Product, 'id'>) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update existing product (admin only)
