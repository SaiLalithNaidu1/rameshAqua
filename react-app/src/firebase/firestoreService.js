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

/**
 * Track product view
 * Records when a user views a product detail page
 * @param {string} productId - The product ID
 * @param {string} userId - The user ID (optional)
 * @returns {Promise<void>}
 */
export const trackProductView = async (productId, userId = null) => {
  try {
    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
    
    const viewData = {
      productId,
      userId: userId || 'anonymous',
      timestamp: serverTimestamp(),
      type: 'view'
    };
    
    const analyticsRef = collection(db, 'productAnalytics');
    await addDoc(analyticsRef, viewData);
    
    console.log(`✅ Tracked view for product: ${productId}`);
  } catch (error) {
    console.error('❌ Error tracking product view:', error);
    // Don't throw error - tracking shouldn't break the app
  }
};

/**
 * Track product interaction (add to cart, wishlist, share)
 * @param {string} productId - The product ID
 * @param {string} action - The action type ('add_to_cart', 'wishlist', 'share')
 * @param {string} userId - The user ID (optional)
 * @returns {Promise<void>}
 */
export const trackProductInteraction = async (productId, action, userId = null) => {
  try {
    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
    
    const interactionData = {
      productId,
      userId: userId || 'anonymous',
      action,
      timestamp: serverTimestamp(),
      type: 'interaction'
    };
    
    const analyticsRef = collection(db, 'productAnalytics');
    await addDoc(analyticsRef, interactionData);
    
    console.log(`✅ Tracked ${action} for product: ${productId}`);
  } catch (error) {
    console.error(`❌ Error tracking product interaction:`, error);
    // Don't throw error - tracking shouldn't break the app
  }
};

/**
 * Add product to user's wishlist
 * @param {string} userId - The user ID
 * @param {Object} product - The product object
 * @returns {Promise<void>}
 */
export const addToWishlist = async (userId, product) => {
  try {
    const { setDoc, doc, serverTimestamp } = await import('firebase/firestore');
    
    const wishlistRef = doc(db, 'wishlists', userId, 'items', product.id);
    await setDoc(wishlistRef, {
      ...product,
      addedAt: serverTimestamp()
    });
    
    console.log(`✅ Added product ${product.id} to wishlist`);
    
    // Track the action
    await trackProductInteraction(product.id, 'wishlist', userId);
  } catch (error) {
    console.error('❌ Error adding to wishlist:', error);
    throw error;
  }
};

/**
 * Remove product from user's wishlist
 * @param {string} userId - The user ID
 * @param {string} productId - The product ID
 * @returns {Promise<void>}
 */
export const removeFromWishlist = async (userId, productId) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    
    const wishlistRef = doc(db, 'wishlists', userId, 'items', productId);
    await deleteDoc(wishlistRef);
    
    console.log(`✅ Removed product ${productId} from wishlist`);
  } catch (error) {
    console.error('❌ Error removing from wishlist:', error);
    throw error;
  }
};

/**
 * Get user's wishlist
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of wishlist items
 */
export const fetchUserWishlist = async (userId) => {
  try {
    const wishlistRef = collection(db, 'wishlists', userId, 'items');
    const querySnapshot = await getDocs(wishlistRef);
    
    const wishlist = [];
    querySnapshot.forEach((doc) => {
      wishlist.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Fetched ${wishlist.length} wishlist items`);
    return wishlist;
  } catch (error) {
    console.error('❌ Error fetching wishlist:', error);
    throw error;
  }
};
