/**
 * Firebase Service Layer
 * Same business logic as web app but optimized for React Native
 * Clean, readable implementation with proper error handling
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import {db} from './firebaseConfig';

/**
 * Product Operations
 */

// Fetch all products with optional category filter
export const fetchProducts = async (categoryId = null) => {
  try {
    const productsRef = collection(db, 'products');
    let q = productsRef;
    
    if (categoryId) {
      q = query(productsRef, where('categoryId', '==', categoryId));
    }
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Fetch single product by ID
export const fetchProductById = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return {
        id: productSnap.id,
        ...productSnap.data()
      };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};

// Fetch featured products
export const fetchFeaturedProducts = async (limitCount = 10) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef, 
      where('featured', '==', true),
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
    
    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Failed to fetch featured products');
  }
};

/**
 * Category Operations
 */

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    const categories = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

/**
 * Analytics Operations
 */

// Track product view
export const trackProductView = async (productId, userId = null) => {
  try {
    const analyticsRef = collection(db, 'analytics');
    await addDoc(analyticsRef, {
      type: 'product_view',
      productId,
      userId,
      timestamp: serverTimestamp(),
      platform: 'mobile'
    });
  } catch (error) {
    console.error('Error tracking product view:', error);
  }
};

// Track product interaction (add to cart, wishlist, etc.)
export const trackProductInteraction = async (productId, userId, action, data = {}) => {
  try {
    const analyticsRef = collection(db, 'analytics');
    await addDoc(analyticsRef, {
      type: 'product_interaction',
      productId,
      userId,
      action,
      data,
      timestamp: serverTimestamp(),
      platform: 'mobile'
    });
  } catch (error) {
    console.error('Error tracking product interaction:', error);
  }
};

/**
 * Wishlist Operations
 */

// Add product to wishlist
export const addToWishlist = async (userId, productId, productData) => {
  try {
    const wishlistRef = collection(db, 'wishlists');
    const wishlistItem = {
      userId,
      productId,
      productData,
      addedAt: serverTimestamp()
    };
    
    await addDoc(wishlistRef, wishlistItem);
    
    // Track interaction
    await trackProductInteraction(productId, userId, 'add_to_wishlist');
    
    return true;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw new Error('Failed to add to wishlist');
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (userId, productId) => {
  try {
    const wishlistRef = collection(db, 'wishlists');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    
    // Track interaction
    await trackProductInteraction(productId, userId, 'remove_from_wishlist');
    
    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw new Error('Failed to remove from wishlist');
  }
};

// Fetch user's wishlist
export const fetchUserWishlist = async (userId) => {
  try {
    const wishlistRef = collection(db, 'wishlists');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const wishlist = [];
    
    querySnapshot.forEach((doc) => {
      wishlist.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to fetch wishlist');
  }
};

/**
 * User Profile Operations
 */

// Create or update user profile
export const saveUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw new Error('Failed to save user profile');
  }
};

// Fetch user profile
export const fetchUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return {
        id: userSnap.id,
        ...userSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};