
# MongoDB Integration for E-commerce App

## Overview
This project now includes a MongoDB backend integrated with the React frontend. The backend is structured within the `src/server` directory due to the read-only nature of package.json in this environment.

## Setup Instructions

### Prerequisites
- MongoDB installed and running locally (or MongoDB Atlas account)
- Node.js installed

### Configuration
1. Create a `.env` file based on `.env.example` in the `src` directory
2. Configure your MongoDB connection string and JWT secret

### Running the Backend
Since we cannot modify package.json to add scripts, you'll need to run the backend server manually:

```bash
node src/server/index.js
```

### Server Structure
- `src/server/index.js` - Main entry point for Express server
- `src/server/models/` - Mongoose data models
- `src/server/controllers/` - Route handlers
- `src/server/routes/` - API route definitions
- `src/server/middleware/` - Auth middleware and other middleware

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get current user profile (protected)

#### Products
- `GET /api/products` - Get all products (with optional category and search filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

#### Users
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id` - Update a user (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

## Frontend Integration
The frontend has been updated to use the new API endpoints. The following services have been created:
- `apiService.ts` - Base API client with auth token handling
- `authService.ts` - Authentication functions
- `productService.ts` - Product-related API functions

## Notes for Production Deployment
In a production environment, consider:
1. Moving the backend to its own repository
2. Setting up proper environment variables
3. Implementing more comprehensive error handling
4. Adding rate limiting and security measures
