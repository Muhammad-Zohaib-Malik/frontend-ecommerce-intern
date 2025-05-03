
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 90",
    price: 129.99,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    description: "Classic Nike Air Max 90 shoes with air cushioning for all-day comfort.",
    stock: 25,
    rating: 4.5,
    featured: true
  },
  {
    id: "2",
    name: "Adidas Ultraboost",
    price: 179.99,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Energy-returning Adidas Ultraboost for a responsive running experience.",
    stock: 18,
    rating: 4.8,
    featured: true
  },
  {
    id: "3",
    name: "Leather Weekender Bag",
    price: 249.99,
    salePrice: 199.99,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "Premium leather weekender bag, perfect for short trips.",
    stock: 10,
    rating: 4.6
  },
  {
    id: "4",
    name: "Modern Lounge Chair",
    price: 399.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    description: "Contemporary lounge chair with ergonomic design for maximum comfort.",
    stock: 5,
    rating: 4.7,
    featured: true
  },
  {
    id: "5",
    name: "Vintage Denim Jacket",
    price: 89.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    description: "Classic denim jacket with vintage wash and modern fit.",
    stock: 30,
    rating: 4.3
  },
  {
    id: "6",
    name: "Bluetooth Headphones",
    price: 159.99,
    salePrice: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Wireless Bluetooth headphones with noise cancellation.",
    stock: 15,
    rating: 4.4
  },
  {
    id: "7",
    name: "Ceramic Plant Pot",
    price: 39.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    description: "Handcrafted ceramic pot, perfect for indoor plants.",
    stock: 22,
    rating: 4.2
  },
  {
    id: "8",
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "Smart watch with health monitoring and notifications.",
    stock: 12,
    rating: 4.6,
    featured: true
  },
  {
    id: "9",
    name: "Wool Throw Blanket",
    price: 79.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    description: "Soft wool throw blanket, perfect for chilly evenings.",
    stock: 18,
    rating: 4.7
  },
  {
    id: "10",
    name: "Canvas Backpack",
    price: 69.99,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    description: "Durable canvas backpack with leather trim.",
    stock: 20,
    rating: 4.5
  },
  {
    id: "11",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Vacuum insulated stainless steel water bottle.",
    stock: 40,
    rating: 4.4
  },
  {
    id: "12",
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "Soft cotton t-shirt with modern fit.",
    stock: 50,
    rating: 4.3
  }
];

export const categories = [
  { id: "all", name: "All Categories" },
  { id: "sneakers", name: "Sneakers" },
  { id: "clothing", name: "Clothing" },
  { id: "bags", name: "Bags" },
  { id: "electronics", name: "Electronics" },
  { id: "furniture", name: "Furniture" },
  { id: "home", name: "Home" },
  { id: "accessories", name: "Accessories" }
];
