# Firebase Migration Guide

This guide will help you migrate your product data from local storage to Firebase Firestore for better scalability and performance.

## 📋 Prerequisites

Before starting the migration, ensure you have:

1. ✅ Firebase project created
2. ✅ Firestore database enabled
3. ✅ Firebase configuration added to `src/firebase/config.js`
4. ✅ Firebase SDK installed (`npm install firebase`)

## 🗂️ Firestore Structure

After migration, your Firestore will have the following structure:

```
Firestore Database
├── categories (collection)
│   ├── white-gut-controllers (document)
│   │   ├── id: "white-gut-controllers"
│   │   ├── categoryName: "WHITE GUT CONTROLLERS"
│   │   ├── categoryDescription: "..."
│   │   ├── productCount: 4
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
│   ├── minerals (document)
│   └── ... (8 more categories)
│
└── products (collection)
    ├── 1731 (document)
    │   ├── id: 1731
    │   ├── title: "G SOLVE"
    │   ├── description: "..."
    │   ├── imageUrl: "https://..."
    │   ├── price: "299"
    │   ├── originalPrice: "349"
    │   ├── category: "White Gut Controllers"
    │   ├── categoryId: "white-gut-controllers"
    │   ├── inStock: true
    │   ├── rating: 0
    │   ├── reviews: 0
    │   ├── createdAt: timestamp
    │   └── updatedAt: timestamp
    └── ... (55 more products)
```

## 🚀 Migration Steps

### Step 1: Configure Firebase

Make sure your `src/firebase/config.js` has proper Firebase configuration:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Step 2: Access Migration Admin Page

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Login to your application

3. Navigate to: **http://localhost:5173/admin/migration**

### Step 3: Run Migration

On the Migration Admin page, you have three options:

#### Option 1: Complete Migration (Recommended)
- Click **"🚀 Run Complete Migration"**
- This will upload all categories and products in one go
- Takes about 30-60 seconds

#### Option 2: Upload Categories Only
- Click **"📁 Upload Categories Only"**
- Uploads 10 product categories
- Useful if you need to re-upload categories

#### Option 3: Upload Products Only
- Click **"📦 Upload Products Only"**
- Uploads all 56 products
- Useful if you need to re-upload products

### Step 4: Verify Migration

After migration completes:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database**
4. Verify collections:
   - **categories** collection should have 10 documents
   - **products** collection should have 56 documents

## 📊 Migration Data Summary

- **Categories**: 10
  - White Gut Controllers (2 products)
  - Minerals (9 products)
  - Ammonia Reducers (2 products)
  - Bottom Cleaners (2 products)
  - Feed Supplements (12 products)
  - Moulting Enhancers (3 products)
  - Oxygen Producers (5 products)
  - pH Reducers (1 product)
  - Probiotics Water and Solids (8 products)
  - Sanitizers (11 products)

- **Total Products**: 56

## 🔧 Update Your Code to Use Firestore

After migration, update your components to fetch data from Firestore instead of local data.

### Example: Update ProductsPage Component

Replace the local `productsData` with Firestore fetch:

```javascript
import { useState, useEffect } from 'react';
import { fetchCategoryWithProducts } from '../../firebase/firestoreService';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      setLoading(true);
      try {
        const data = await fetchCategoryWithProducts(categoryId);
        setCurrentCategory(data);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (!currentCategory) return <div>Category not found</div>;

  // Rest of your component...
};
```

## 📚 Available Firestore Functions

The migration includes ready-to-use functions in `src/firebase/firestoreService.js`:

### Fetch All Categories
```javascript
import { fetchAllCategories } from '../firebase/firestoreService';

const categories = await fetchAllCategories();
```

### Fetch Category by ID
```javascript
import { fetchCategoryById } from '../firebase/firestoreService';

const category = await fetchCategoryById('minerals');
```

### Fetch All Products
```javascript
import { fetchAllProducts } from '../firebase/firestoreService';

const products = await fetchAllProducts();
```

### Fetch Products by Category
```javascript
import { fetchProductsByCategory } from '../firebase/firestoreService';

const products = await fetchProductsByCategory('minerals');
```

### Fetch Product by ID
```javascript
import { fetchProductById } from '../firebase/firestoreService';

const product = await fetchProductById('1731');
```

### Fetch New/Featured Products
```javascript
import { fetchNewProducts } from '../firebase/firestoreService';

const newProducts = await fetchNewProducts(10); // Limit to 10
```

### Search Products
```javascript
import { searchProducts } from '../firebase/firestoreService';

const results = await searchProducts('mineral');
```

### Fetch Category with Products
```javascript
import { fetchCategoryWithProducts } from '../firebase/firestoreService';

const data = await fetchCategoryWithProducts('minerals');
// Returns: { id, categoryName, categoryDescription, products: [...] }
```

## ⚡ Performance Benefits

Migrating to Firestore provides:

1. **Scalability**: Handle unlimited products and categories
2. **Real-time Updates**: Instant data synchronization
3. **Offline Support**: Built-in offline caching
4. **Security**: Firestore security rules
5. **Global CDN**: Fast data access worldwide
6. **Indexing**: Automatic query optimization

## 🔒 Security Rules

After migration, add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories - Read only for authenticated users
    match /categories/{categoryId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins via Admin SDK
    }
    
    // Products - Read only for authenticated users
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins via Admin SDK
    }
    
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🛠️ Troubleshooting

### Issue: Migration fails with permission error
**Solution**: Check Firestore security rules and ensure you're authenticated

### Issue: Products not showing after migration
**Solution**: 
1. Verify data in Firebase Console
2. Check browser console for errors
3. Ensure Firestore imports are correct

### Issue: Slow initial load
**Solution**: 
1. Implement pagination
2. Use Firestore persistence cache
3. Add loading states

## 📝 Next Steps

After successful migration:

1. ✅ Remove local `productsData` from components
2. ✅ Update all pages to use Firestore functions
3. ✅ Add loading states for better UX
4. ✅ Implement error handling
5. ✅ Set up Firestore security rules
6. ✅ Remove or protect `/admin/migration` route in production
7. ✅ Test all features thoroughly

## 🎯 Production Checklist

Before deploying to production:

- [ ] Migration completed successfully
- [ ] All pages fetch from Firestore
- [ ] Firestore security rules configured
- [ ] Loading states implemented
- [ ] Error handling added
- [ ] Admin migration route protected/removed
- [ ] Performance tested
- [ ] Backup created

## 💡 Tips

1. **Run migration in development first**
2. **Test thoroughly before production**
3. **Keep backup of local data**
4. **Monitor Firestore usage and costs**
5. **Implement proper error handling**

## 🆘 Support

If you encounter issues:
1. Check Firebase Console logs
2. Review browser console errors
3. Verify Firebase configuration
4. Check Firestore security rules

---

**Happy Migrating! 🚀**
