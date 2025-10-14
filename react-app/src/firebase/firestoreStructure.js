// Firestore Database Structure for Leo Aqua Products
// This file documents the Firestore collections and document structure

/**
 * FIRESTORE STRUCTURE:
 * 
 * Collection: categories
 * ├── Document: white-gut-controllers
 * │   ├── id: "white-gut-controllers"
 * │   ├── categoryName: "White Gut Controllers"
 * │   ├── categoryDescription: "..."
 * │   ├── productCount: 4
 * │   └── createdAt: timestamp
 * │
 * ├── Document: minerals
 * │   └── ...
 * └── ...
 * 
 * Collection: products
 * ├── Document: g-solve
 * │   ├── id: "g-solve"
 * │   ├── title: "G SOLVE"
 * │   ├── description: "..."
 * │   ├── imageUrl: "https://..."
 * │   ├── url: "https://..."
 * │   ├── price: "299"
 * │   ├── originalPrice: "349"
 * │   ├── isNew: false
 * │   ├── category: "White Gut Controllers"
 * │   ├── categoryId: "white-gut-controllers"
 * │   ├── inStock: true
 * │   ├── rating: 4.5
 * │   ├── reviews: 0
 * │   └── createdAt: timestamp
 * │
 * └── ...
 * 
 * Collection: featured-products (optional)
 * └── Document: product-id
 *     └── Reference to products collection
 * 
 * Collection: app-settings (optional)
 * └── Document: general
 *     ├── maintenanceMode: false
 *     ├── featuredCategoryId: "white-gut-controllers"
 *     └── bannerMessage: "..."
 */

export const FIRESTORE_COLLECTIONS = {
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  FEATURED_PRODUCTS: 'featured-products',
  APP_SETTINGS: 'app-settings',
  ORDERS: 'orders',
  USERS: 'users'
};

export const CATEGORY_FIELDS = {
  ID: 'id',
  CATEGORY_NAME: 'categoryName',
  CATEGORY_DESCRIPTION: 'categoryDescription',
  PRODUCT_COUNT: 'productCount',
  IMAGE_URL: 'imageUrl',
  URL: 'url',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
};

export const PRODUCT_FIELDS = {
  ID: 'id',
  TITLE: 'title',
  DESCRIPTION: 'description',
  IMAGE_URL: 'imageUrl',
  URL: 'url',
  PRICE: 'price',
  ORIGINAL_PRICE: 'originalPrice',
  IS_NEW: 'isNew',
  CATEGORY: 'category',
  CATEGORY_ID: 'categoryId',
  IN_STOCK: 'inStock',
  RATING: 'rating',
  REVIEWS: 'reviews',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
};
