# Firebase Operations - Complete Guide

## 🔥 Quick Reference for Firebase Operations

### Table of Contents
1. [Setup & Configuration](#setup--configuration)
2. [Read Operations](#read-operations)
3. [Write Operations](#write-operations)
4. [Real-time Updates](#real-time-updates)
5. [Security Rules](#security-rules)
6. [Best Practices](#best-practices)
7. [Error Handling](#error-handling)
8. [Performance Tips](#performance-tips)

---

## 📦 Setup & Configuration

### Firebase Config (config.js)

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
```

### Environment Variables (.env)

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

---

## 📖 Read Operations

### 1. Get Single Document

```javascript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Fetch a single product by ID
 * @param {string} productId - Document ID
 * @returns {Promise<Object|null>}
 */
export const fetchProductById = async (productId) => {
  try {
    // Create reference to document
    const docRef = doc(db, 'products', productId);
    
    // Fetch document
    const docSnap = await getDoc(docRef);
    
    // Check if exists
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.warn(`Product ${productId} not found`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Usage in component
const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [productId]);
};
```

### 2. Get All Documents in Collection

```javascript
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetch all products
 * @returns {Promise<Array>}
 */
export const fetchAllProducts = async () => {
  try {
    // Create reference to collection
    const collectionRef = collection(db, 'products');
    
    // Fetch all documents
    const querySnapshot = await getDocs(collectionRef);
    
    // Transform to array
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Fetched ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
```

### 3. Query with Filters

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Fetch products by category
 * @param {string} categoryId - Category ID
 * @returns {Promise<Array>}
 */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const collectionRef = collection(db, 'products');
    
    // Create query with filter
    const q = query(
      collectionRef,
      where('categoryId', '==', categoryId)
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
    console.error('Error:', error);
    throw error;
  }
};

/**
 * Fetch products with multiple filters
 */
export const fetchFilteredProducts = async (categoryId, minPrice, maxPrice) => {
  const collectionRef = collection(db, 'products');
  
  const q = query(
    collectionRef,
    where('categoryId', '==', categoryId),
    where('price', '>=', minPrice),
    where('price', '<=', maxPrice)
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

### 4. Query with Sorting and Limiting

```javascript
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

/**
 * Fetch new products (latest first)
 * @param {number} limitCount - Number of products to fetch
 * @returns {Promise<Array>}
 */
export const fetchNewProducts = async (limitCount = 10) => {
  try {
    const collectionRef = collection(db, 'products');
    
    const q = query(
      collectionRef,
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 5. Pagination

```javascript
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

/**
 * Fetch paginated products
 * @param {number} pageSize - Items per page
 * @param {DocumentSnapshot} lastDoc - Last document from previous page
 * @returns {Promise<Object>}
 */
export const fetchProductsPage = async (pageSize = 20, lastDoc = null) => {
  try {
    const collectionRef = collection(db, 'products');
    
    let q = query(
      collectionRef,
      orderBy('title'),
      limit(pageSize)
    );
    
    // If not first page, start after last document
    if (lastDoc) {
      q = query(
        collectionRef,
        orderBy('title'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Get last document for next page
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return {
      products,
      lastDoc: lastVisible,
      hasMore: querySnapshot.docs.length === pageSize
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Usage in component
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const { products: newProducts, lastDoc: newLastDoc, hasMore: more } = 
        await fetchProductsPage(20, lastDoc);
      
      setProducts(prev => [...prev, ...newProducts]);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Load first page on mount
  useEffect(() => {
    loadMore();
  }, []);
};
```

---

## ✍️ Write Operations

### 1. Add New Document (Auto-generated ID)

```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Create new product
 * @param {Object} productData - Product data
 * @returns {Promise<string>} - New document ID
 */
export const createProduct = async (productData) => {
  try {
    const collectionRef = collection(db, 'products');
    
    const docRef = await addDoc(collectionRef, {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log(`✅ Created product: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Usage
const handleCreate = async () => {
  const productData = {
    title: 'New Product',
    price: 299,
    categoryId: 'minerals',
    description: 'Product description',
    inStock: true
  };
  
  try {
    const newId = await createProduct(productData);
    console.log('Created product with ID:', newId);
  } catch (error) {
    alert('Failed to create product');
  }
};
```

### 2. Set Document (Custom ID)

```javascript
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Create product with custom ID
 * @param {string} productId - Custom document ID
 * @param {Object} productData - Product data
 */
export const createProductWithId = async (productId, productData) => {
  try {
    const docRef = doc(db, 'products', productId);
    
    await setDoc(docRef, {
      ...productData,
      createdAt: serverTimestamp()
    });
    
    console.log(`✅ Created product: ${productId}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 3. Update Document

```javascript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Update product
 * @param {string} productId - Document ID
 * @param {Object} updates - Fields to update
 */
export const updateProduct = async (productId, updates) => {
  try {
    const docRef = doc(db, 'products', productId);
    
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log(`✅ Updated product: ${productId}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Usage
const handleUpdate = async () => {
  try {
    await updateProduct('product-123', {
      price: 399,
      inStock: false
    });
    alert('Product updated!');
  } catch (error) {
    alert('Failed to update product');
  }
};
```

### 4. Delete Document

```javascript
import { doc, deleteDoc } from 'firebase/firestore';

/**
 * Delete product
 * @param {string} productId - Document ID
 */
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
    
    console.log(`✅ Deleted product: ${productId}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 5. Batch Operations

```javascript
import { writeBatch, doc } from 'firebase/firestore';

/**
 * Create multiple products at once
 * @param {Array} products - Array of product objects
 */
export const createProductsBatch = async (products) => {
  try {
    const batch = writeBatch(db);
    
    products.forEach(product => {
      const docRef = doc(collection(db, 'products'));
      batch.set(docRef, {
        ...product,
        createdAt: serverTimestamp()
      });
    });
    
    await batch.commit();
    console.log(`✅ Created ${products.length} products`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

/**
 * Update multiple products
 */
export const updateProductsBatch = async (updates) => {
  try {
    const batch = writeBatch(db);
    
    updates.forEach(({ id, data }) => {
      const docRef = doc(db, 'products', id);
      batch.update(docRef, data);
    });
    
    await batch.commit();
    console.log(`✅ Updated ${updates.length} products`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

---

## 🔄 Real-time Updates

### Listen to Document Changes

```javascript
import { doc, onSnapshot } from 'firebase/firestore';

/**
 * Listen to product changes
 * @param {string} productId - Document ID
 * @param {Function} callback - Called when data changes
 * @returns {Function} - Unsubscribe function
 */
export const listenToProduct = (productId, callback) => {
  const docRef = doc(db, 'products', productId);
  
  const unsubscribe = onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        callback({
          id: doc.id,
          ...doc.data()
        });
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error('Error listening to product:', error);
    }
  );
  
  return unsubscribe;
};

// Usage in component
const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    // Start listening
    const unsubscribe = listenToProduct(productId, (data) => {
      setProduct(data);
    });
    
    // Cleanup - stop listening when component unmounts
    return () => unsubscribe();
  }, [productId]);
};
```

### Listen to Collection Changes

```javascript
import { collection, query, where, onSnapshot } from 'firebase/firestore';

/**
 * Listen to products in category
 * @param {string} categoryId - Category ID
 * @param {Function} callback - Called when data changes
 * @returns {Function} - Unsubscribe function
 */
export const listenToProductsByCategory = (categoryId, callback) => {
  const collectionRef = collection(db, 'products');
  const q = query(collectionRef, where('categoryId', '==', categoryId));
  
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(products);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
  
  return unsubscribe;
};
```

---

## 🔒 Security Rules

### Basic Rules Structure

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && request.auth.token.admin == true;
    }
    
    // Products - anyone can read, only admins can write
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Categories - anyone can read
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // User wishlists - only owner can access
    match /wishlists/{userId}/items/{productId} {
      allow read, write: if isOwner(userId);
    }
    
    // User carts - only owner can access
    match /carts/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // Orders - users can read their own, admins can read all
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow create: if isSignedIn() && request.auth.uid == request.resource.data.userId;
      allow update: if isAdmin();
      allow delete: if false; // Never allow delete
    }
    
    // Analytics - anyone can write, only admins can read
    match /productAnalytics/{docId} {
      allow read: if isAdmin();
      allow create: if true; // Allow anonymous tracking
      allow update, delete: if false;
    }
    
    // User profiles - only owner can access
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
  }
}
```

### Validation Rules

```javascript
// Validate product data structure
match /products/{productId} {
  allow create: if isAdmin() &&
    request.resource.data.keys().hasAll(['title', 'price', 'categoryId']) &&
    request.resource.data.price is number &&
    request.resource.data.price >= 0 &&
    request.resource.data.title.size() > 0 &&
    request.resource.data.title.size() <= 200;
  
  allow update: if isAdmin() &&
    (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['createdAt']));
}
```

---

## ✅ Best Practices

### 1. Always Use Try-Catch

```javascript
// ✅ CORRECT
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// ❌ WRONG
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

### 2. Use serverTimestamp()

```javascript
// ✅ CORRECT - Use server timestamp
await addDoc(collection(db, 'products'), {
  title: 'Product',
  createdAt: serverTimestamp()
});

// ❌ WRONG - Don't use client timestamp
await addDoc(collection(db, 'products'), {
  title: 'Product',
  createdAt: new Date()
});
```

### 3. Minimize Reads

```javascript
// ✅ CORRECT - Fetch once and cache
const [products, setProducts] = useState([]);

useEffect(() => {
  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
    localStorage.setItem('products', JSON.stringify(data));
  };
  
  // Load from cache first
  const cached = localStorage.getItem('products');
  if (cached) {
    setProducts(JSON.parse(cached));
  }
  
  loadProducts();
}, []);

// ❌ WRONG - Fetch on every render
const products = await fetchAllProducts(); // Don't do this!
```

### 4. Clean Up Listeners

```javascript
// ✅ CORRECT
useEffect(() => {
  const unsubscribe = listenToProducts((data) => {
    setProducts(data);
  });
  
  return () => unsubscribe(); // Cleanup
}, []);

// ❌ WRONG - Memory leak
useEffect(() => {
  listenToProducts((data) => {
    setProducts(data);
  });
  // No cleanup!
}, []);
```

### 5. Use Batch for Multiple Writes

```javascript
// ✅ CORRECT - Use batch (1 write operation)
const batch = writeBatch(db);
products.forEach(product => {
  const ref = doc(collection(db, 'products'));
  batch.set(ref, product);
});
await batch.commit();

// ❌ WRONG - Multiple operations
for (const product of products) {
  await addDoc(collection(db, 'products'), product);
}
```

---

## 🚨 Error Handling

```javascript
export const handleFirebaseError = (error) => {
  console.error('Firebase Error:', error);
  
  switch (error.code) {
    case 'permission-denied':
      return 'You don\'t have permission to perform this action';
    
    case 'not-found':
      return 'The requested data was not found';
    
    case 'already-exists':
      return 'This item already exists';
    
    case 'resource-exhausted':
      return 'Too many requests. Please try again later';
    
    case 'unavailable':
      return 'Service unavailable. Please check your internet connection';
    
    case 'unauthenticated':
      return 'Please login to continue';
    
    case 'deadline-exceeded':
      return 'Request timeout. Please try again';
    
    default:
      return 'An error occurred. Please try again';
  }
};

// Usage
const loadProducts = async () => {
  try {
    const products = await fetchAllProducts();
    setProducts(products);
  } catch (error) {
    const message = handleFirebaseError(error);
    setError(message);
  }
};
```

---

## ⚡ Performance Tips

### 1. Index Your Queries

```javascript
// If you frequently query by category and price:
// Add this index in Firebase Console → Firestore → Indexes

query(
  collection(db, 'products'),
  where('categoryId', '==', 'minerals'),
  orderBy('price', 'asc')
);

// Firebase will prompt you to create index on first use
```

### 2. Limit Query Results

```javascript
// ✅ CORRECT - Limit results
const q = query(
  collection(db, 'products'),
  limit(20)
);

// ❌ WRONG - Fetch everything
const q = query(collection(db, 'products'));
```

### 3. Use Pagination

```javascript
// Don't load all products at once
// Use pagination (see examples above)
```

### 4. Cache Data

```javascript
// Cache in localStorage for offline support
const loadProducts = async () => {
  try {
    const products = await fetchAllProducts();
    localStorage.setItem('products-cache', JSON.stringify({
      data: products,
      timestamp: Date.now()
    }));
    return products;
  } catch (error) {
    // Load from cache if fetch fails
    const cached = localStorage.getItem('products-cache');
    if (cached) {
      const { data } = JSON.parse(cached);
      return data;
    }
    throw error;
  }
};
```

---

## 📊 Cost Optimization

```javascript
// Firestore pricing (as of 2025):
// - Reads: $0.06 per 100,000
// - Writes: $0.18 per 100,000
// - Deletes: $0.02 per 100,000

// Tips to reduce costs:
// 1. Cache data when possible
// 2. Use batch operations
// 3. Limit query results
// 4. Use real-time listeners sparingly
// 5. Clean up old data periodically
```

---

**Quick Checklist for Firebase Operations:**

- [ ] All operations in `firestoreService.js`
- [ ] Error handling with try-catch
- [ ] Use serverTimestamp()
- [ ] Clean up listeners
- [ ] Test security rules
- [ ] Add proper indexes
- [ ] Limit query results
- [ ] Cache when appropriate
- [ ] Handle offline scenarios
- [ ] Log operations for debugging

---

**Need more help?** Check Firebase documentation: https://firebase.google.com/docs/firestore
