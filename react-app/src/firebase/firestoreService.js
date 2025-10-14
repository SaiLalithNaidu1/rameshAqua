// Firestore Service - Functions to fetch and manage products and categories
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from './config';
import { FIRESTORE_COLLECTIONS } from './firestoreStructure';

/**
 * Fetch all categories from Firestore
 * @returns {Promise<Array>} Array of category objects
 */
export const fetchAllCategories = async () => {
  try {
    const categoriesRef = collection(db, FIRESTORE_COLLECTIONS.CATEGORIES);
    const querySnapshot = await getDocs(categoriesRef);
    
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Fetched ${categories.length} categories from Firestore`);
    return categories;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch a single category by ID
 * @param {string} categoryId - The category ID
 * @returns {Promise<Object>} Category object
 */
export const fetchCategoryById = async (categoryId) => {
  try {
    const categoryRef = doc(db, FIRESTORE_COLLECTIONS.CATEGORIES, categoryId);
    const categoryDoc = await getDoc(categoryRef);
    
    if (categoryDoc.exists()) {
      console.log(`✅ Fetched category: ${categoryId}`);
      return {
        id: categoryDoc.id,
        ...categoryDoc.data()
      };
    } else {
      console.warn(`⚠️ Category not found: ${categoryId}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Fetch all products from Firestore
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchAllProducts = async () => {
  try {
    const productsRef = collection(db, FIRESTORE_COLLECTIONS.PRODUCTS);
    const querySnapshot = await getDocs(productsRef);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Fetched ${products.length} products from Firestore`);
    return products;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch products by category ID
 * @param {string} categoryId - The category ID
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const productsRef = collection(db, FIRESTORE_COLLECTIONS.PRODUCTS);
    const q = query(productsRef, where('categoryId', '==', categoryId));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Fetched ${products.length} products for category: ${categoryId}`);
    return products;
  } catch (error) {
    console.error(`❌ Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} productId - The product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (productId) => {
  try {
    const productRef = doc(db, FIRESTORE_COLLECTIONS.PRODUCTS, productId);
    const productDoc = await getDoc(productRef);
    
    if (productDoc.exists()) {
      console.log(`✅ Fetched product: ${productId}`);
      return {
        id: productDoc.id,
        ...productDoc.data()
      };
    } else {
      console.warn(`⚠️ Product not found: ${productId}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching product ${productId}:`, error);
    throw error;
  }
};

/**
 * Fetch new/featured products
 * @param {number} limitCount - Number of products to fetch (default: 10)
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchNewProducts = async (limitCount = 10) => {
  try {
    const productsRef = collection(db, FIRESTORE_COLLECTIONS.PRODUCTS);
    const q = query(
      productsRef, 
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Fetched ${products.length} new products`);
    return products;
  } catch (error) {
    console.error('❌ Error fetching new products:', error);
    throw error;
  }
};

/**
 * Search products by title or description
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} Array of matching product objects
 */
export const searchProducts = async (searchTerm) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or similar service
    const productsRef = collection(db, FIRESTORE_COLLECTIONS.PRODUCTS);
    const querySnapshot = await getDocs(productsRef);
    
    const products = [];
    const searchLower = searchTerm.toLowerCase();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const titleMatch = data.title?.toLowerCase().includes(searchLower);
      const descMatch = data.description?.toLowerCase().includes(searchLower);
      const categoryMatch = data.category?.toLowerCase().includes(searchLower);
      
      if (titleMatch || descMatch || categoryMatch) {
        products.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    console.log(`✅ Found ${products.length} products matching "${searchTerm}"`);
    return products;
  } catch (error) {
    console.error(`❌ Error searching products:`, error);
    throw error;
  }
};

/**
 * Fetch products with combined category data
 * @param {string} categoryId - The category ID
 * @returns {Promise<Object>} Object with category info and products array
 */
export const fetchCategoryWithProducts = async (categoryId) => {
  try {
    const [category, products] = await Promise.all([
      fetchCategoryById(categoryId),
      fetchProductsByCategory(categoryId)
    ]);
    
    if (!category) {
      return null;
    }
    
    return {
      ...category,
      products
    };
  } catch (error) {
    console.error(`❌ Error fetching category with products:`, error);
    throw error;
  }
};
