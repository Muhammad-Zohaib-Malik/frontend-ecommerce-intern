
# Frontend - E-Commerce Application

#deploy
https://frontend-ecommerce-intern.vercel.app/

## Overview

This is the frontend of an e-commerce application built using React. The application fetches and displays product data from a backend API with pagination, category filtering, and search functionality.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For routing and navigation.
- **React Context API**: For managing global state across components.

## Features

- **Product Listing**: Displays a paginated list of products.
- **Search Filter**: Allows users to search for products by name.
- **Pagination**: Users can navigate between pages of products.
- **Responsive Design**: The app is designed to work across different screen sizes.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Muhammad-Zohaib-Malik/frontend-ecommerce-intern
   ```

2. Navigate into the project directory:

   ```bash
   cd client
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   ```

## API Endpoints

The frontend communicates with the backend using the following API endpoint to fetch products:

### GET `/products`

Fetches a list of products with pagination, category filtering, and search functionality.

#### Query Parameters:

- **`page`**: The current page of products to fetch (default is 1).
- **`limit`**: The number of products per page (default is 5).
- **`search`**: The search term to filter products by name.

#### Example:

```bash
GET /products?page=1&limit=5&search=shirt&category=clothing
```

