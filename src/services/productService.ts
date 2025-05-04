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

    if (search) {
      params.search = search;
    }

    const response = await apiClient.get('/products', { params });
    
    // Log the entire response to verify its structure
    console.log('API Response:', response.data);

    // Assuming the response is directly an array of products
    const products = response.data;  // The response may be an array of products directly
    const totalPages = Math.ceil(products.length / limit);  // You may need to calculate totalPages based on the data
    const totalCount = products.length;  // Total count of products in the dataset

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


export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  try {
    const response = await apiClient.put<Product>(`/products/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};