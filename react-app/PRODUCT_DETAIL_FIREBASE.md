# Product Detail Page with Firebase Integration

## Overview

The Product Detail Page now fetches product data directly from Firebase Firestore and tracks user interactions for analytics.

## Features Implemented

### ✅ 1. Firebase Data Fetching
- **Fetch Product by ID**: Retrieves complete product details from Firestore
- **Loading States**: Shows spinner while data is loading
- **Error Handling**: Displays user-friendly error messages
- **Fallback Images**: Uses placeholder if product images are unavailable

### ✅ 2. Product Analytics Tracking
- **Page Views**: Automatically tracks when a user views a product
- **Add to Cart**: Tracks when products are added to cart
- **Wishlist**: Tracks wishlist additions
- **Share Actions**: Tracks when products are shared

### ✅ 3. Wishlist Functionality
- **Add to Wishlist**: Save products to user's personal wishlist in Firebase
- **User Authentication**: Requires login to use wishlist
- **Firebase Storage**: Stores wishlist items in `wishlists/{userId}/items/{productId}`

### ✅ 4. Share Functionality
- **Native Web Share API**: Uses browser's native share dialog (mobile)
- **Clipboard Fallback**: Copies link to clipboard on desktop
- **Tracking**: Records share actions for analytics

## Firebase Structure

### Collections Created

#### 1. `products` Collection
Already exists with product documents:
```javascript
{
  id: "1731",
  title: "G SOLVE",
  name: "1. G-SOLVE",
  imageUrl: "https://...",
  description: "Product description",
  price: "299",
  originalPrice: "349",
  category: "White Gut Controllers",
  categoryId: "white-gut-controllers",
  isNew: false,
  url: "https://..."
}
```

#### 2. `productAnalytics` Collection (New)
Tracks all product interactions:
```javascript
{
  productId: "1731",
  userId: "user-uid" | "anonymous",
  type: "view" | "interaction",
  action: "view" | "add_to_cart" | "wishlist" | "share",
  timestamp: Firebase.Timestamp
}
```

#### 3. `wishlists` Collection (New)
Structure: `wishlists/{userId}/items/{productId}`
```javascript
{
  id: "1731",
  title: "G SOLVE",
  description: "...",
  price: "299",
  imageUrl: "...",
  addedAt: Firebase.Timestamp,
  // ...other product fields
}
```

## Code Changes

### ProductDetailPage.jsx

#### Imports Added
```javascript
import { useState, useEffect } from 'react';
import { fetchProductById } from '../../firebase/firestoreService';
import { Spinner, Alert } from 'react-bootstrap';
```

#### State Management
```javascript
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

#### Data Fetching Effect
```javascript
useEffect(() => {
  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productData = await fetchProductById(productId);
      
      if (productData) {
        setProduct(productData);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  loadProduct();
}, [productId]);
```

#### View Tracking Effect
```javascript
useEffect(() => {
  if (product && product.id) {
    import('../../firebase/firestoreService').then(({ trackProductView }) => {
      trackProductView(product.id, user?.uid);
    });
  }
}, [product, user]);
```

### firestoreService.js

#### New Functions Added

##### 1. Track Product View
```javascript
export const trackProductView = async (productId, userId = null) => {
  const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
  
  const viewData = {
    productId,
    userId: userId || 'anonymous',
    timestamp: serverTimestamp(),
    type: 'view'
  };
  
  const analyticsRef = collection(db, 'productAnalytics');
  await addDoc(analyticsRef, viewData);
};
```

##### 2. Track Product Interaction
```javascript
export const trackProductInteraction = async (productId, action, userId = null) => {
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
};
```

##### 3. Add to Wishlist
```javascript
export const addToWishlist = async (userId, product) => {
  const { setDoc, doc, serverTimestamp } = await import('firebase/firestore');
  
  const wishlistRef = doc(db, 'wishlists', userId, 'items', product.id);
  await setDoc(wishlistRef, {
    ...product,
    addedAt: serverTimestamp()
  });
  
  await trackProductInteraction(product.id, 'wishlist', userId);
};
```

##### 4. Remove from Wishlist
```javascript
export const removeFromWishlist = async (userId, productId) => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  
  const wishlistRef = doc(db, 'wishlists', userId, 'items', productId);
  await deleteDoc(wishlistRef);
};
```

##### 5. Fetch User Wishlist
```javascript
export const fetchUserWishlist = async (userId) => {
  const wishlistRef = collection(db, 'wishlists', userId, 'items');
  const querySnapshot = await getDocs(wishlistRef);
  
  const wishlist = [];
  querySnapshot.forEach((doc) => {
    wishlist.push({
      id: doc.id,
      ...doc.data()
    });
  });
  
  return wishlist;
};
```

## Event Handlers

### 1. Add to Cart with Tracking
```javascript
const handleAddToCart = () => {
  if (product) {
    dispatch(addToCart({ product, quantity: 1 }));
    
    // Track add to cart action
    import('../../firebase/firestoreService').then(({ trackProductInteraction }) => {
      trackProductInteraction(product.id, 'add_to_cart', user?.uid);
    });
  }
};
```

### 2. Add to Wishlist
```javascript
const handleWishlist = async () => {
  if (!user) {
    alert('Please login to add items to wishlist');
    navigate('/login');
    return;
  }

  if (product) {
    try {
      const { addToWishlist } = await import('../../firebase/firestoreService');
      await addToWishlist(user.uid, product);
      alert('Added to wishlist!');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert('Failed to add to wishlist');
    }
  }
};
```

### 3. Share Product
```javascript
const handleShare = async () => {
  if (product) {
    // Track share action
    import('../../firebase/firestoreService').then(({ trackProductInteraction }) => {
      trackProductInteraction(product.id, 'share', user?.uid);
    });

    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title || product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  }
};
```

## UI States

### Loading State
```javascript
if (loading) {
  return (
    <>
      <Header />
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </Container>
    </>
  );
}
```

### Error State
```javascript
if (error || !product) {
  return (
    <>
      <Header />
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || 'Product not found'}</p>
          <Button variant="primary" onClick={() => navigate('/categories')}>
            Browse Categories
          </Button>
        </Alert>
      </Container>
    </>
  );
}
```

## Data Field Handling

The component handles both Firebase product structure and optional fields:

```javascript
// Title fallback
{product.title || product.name}

// Images with fallback
src={
  product.images && product.images.length > 0 
    ? product.images[selectedImage] 
    : product.imageUrl || '/api/placeholder/500/400'
}

// Price formatting
<span className="current-price">₹{product.price}</span>

// Optional fields
{product.description && (
  <div className="product-description">
    <p>{product.description}</p>
  </div>
)}

{product.features && product.features.length > 0 && (
  <div className="key-features">
    {/* ... */}
  </div>
)}
```

## Firebase Security Rules

Update your Firestore security rules to allow analytics and wishlist operations:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - Read only
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Only admin can write
    }
    
    // Product Analytics - Write only
    match /productAnalytics/{analyticsId} {
      allow read: if false; // Only admin can read
      allow write: if true; // Anyone can track
    }
    
    // Wishlists - User-specific
    match /wishlists/{userId}/items/{productId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Testing

### Test Product View Tracking

1. Navigate to any product detail page
2. Open Firebase Console → Firestore
3. Check `productAnalytics` collection
4. You should see a new document with:
   - `type: "view"`
   - `productId: "xxx"`
   - `userId: "anonymous"` (if not logged in)
   - `timestamp: [Firebase Timestamp]`

### Test Add to Cart Tracking

1. Click "Add to Cart" button
2. Check `productAnalytics` collection
3. You should see:
   - `type: "interaction"`
   - `action: "add_to_cart"`

### Test Wishlist

1. Login to the app
2. Click "Wishlist" button on product page
3. Check `wishlists/{your-user-id}/items` collection
4. Product should be saved there

### Test Share

1. Click "Share" button
2. On mobile: Native share dialog should appear
3. On desktop: Link copied to clipboard message
4. Check `productAnalytics` for share tracking

## Analytics Queries

### Get Most Viewed Products
```javascript
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const getMostViewedProducts = async () => {
  const analyticsRef = collection(db, 'productAnalytics');
  const q = query(
    analyticsRef,
    where('type', '==', 'view'),
    orderBy('timestamp', 'desc'),
    limit(100)
  );
  
  const snapshot = await getDocs(q);
  
  // Count views per product
  const viewCounts = {};
  snapshot.forEach(doc => {
    const data = doc.data();
    viewCounts[data.productId] = (viewCounts[data.productId] || 0) + 1;
  });
  
  return viewCounts;
};
```

### Get User's Wishlist Count
```javascript
const getWishlistCount = async (userId) => {
  const wishlistRef = collection(db, 'wishlists', userId, 'items');
  const snapshot = await getDocs(wishlistRef);
  return snapshot.size;
};
```

## Next Steps

### Recommended Enhancements

1. **Product Reviews**: Add review collection and display
2. **Related Products**: Show similar products based on category
3. **View History**: Track user's recently viewed products
4. **Wishlist Page**: Create dedicated page to view all wishlist items
5. **Stock Management**: Add real-time stock tracking
6. **Price Alerts**: Notify users when price drops
7. **Product Recommendations**: ML-based recommendations using analytics data

### Performance Optimization

1. **Image Lazy Loading**: Already implemented with React Bootstrap Image
2. **Cache Strategy**: Consider caching product data in localStorage
3. **Analytics Batching**: Batch analytics writes to reduce Firestore costs
4. **CDN Images**: Serve product images from CDN

## Troubleshooting

### Issue: Product not loading

**Check:**
1. Product ID exists in Firestore
2. Firebase config is correct
3. Network tab shows successful API calls
4. Console for any errors

### Issue: Analytics not tracking

**Check:**
1. `productAnalytics` collection has write permissions
2. No console errors
3. Firebase initialization is complete

### Issue: Wishlist not saving

**Check:**
1. User is logged in (`user?.uid` exists)
2. Security rules allow write to `wishlists/{userId}/items`
3. User has authentication token

## Firebase Console Views

### View Product Analytics
1. Open Firebase Console
2. Go to Firestore Database
3. Navigate to `productAnalytics` collection
4. See all tracked events with filters

### View User Wishlist
1. Open Firebase Console
2. Go to Firestore Database
3. Navigate to `wishlists` collection
4. Select user ID → `items` subcollection

## Cost Considerations

### Firestore Operations

- **Product View**: 1 read + 1 write per page view
- **Add to Cart**: 1 write (analytics only, cart is Redux)
- **Wishlist**: 1 write + 1 read (when displaying)
- **Share**: 1 write (analytics)

### Optimization Tips

1. **Limit Analytics Tracking**: Only track critical events
2. **Batch Writes**: Combine multiple analytics writes
3. **Client-Side Caching**: Cache product data for repeat views
4. **Debounce Tracking**: Prevent duplicate rapid-fire events

## Success! 🎉

Your Product Detail Page now has full Firebase integration with:
- ✅ Real-time product data fetching
- ✅ User interaction tracking
- ✅ Wishlist functionality
- ✅ Share capabilities
- ✅ Analytics for business insights

The page is production-ready and will track valuable user behavior data!
