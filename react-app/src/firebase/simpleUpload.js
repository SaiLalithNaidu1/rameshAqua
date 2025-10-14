// Simple Migration Script - Run this directly in browser console
// This will upload all products and categories to Firestore

import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';
import { productsData } from './productsData';

// Simple function to upload everything
export const uploadToFirebase = async () => {
  console.log('🚀 Starting Firebase upload...');
  
  try {
    // Step 1: Upload Categories
    console.log('📁 Uploading categories...');
    for (const [categoryId, categoryData] of Object.entries(productsData)) {
      await setDoc(doc(db, 'categories', categoryId), {
        id: categoryId,
        categoryName: categoryData.categoryName,
        categoryDescription: categoryData.categoryDescription,
        productCount: categoryData.products.length,
        createdAt: new Date()
      });
      console.log(`✅ Category uploaded: ${categoryData.categoryName}`);
    }

    // Step 2: Upload Products
    console.log('📦 Uploading products...');
    let productCount = 0;
    for (const [categoryId, categoryData] of Object.entries(productsData)) {
      for (const product of categoryData.products) {
        const productId = String(product.id);
        await setDoc(doc(db, 'products', productId), {
          ...product,
          categoryId: categoryId,
          inStock: true,
          rating: 0,
          reviews: 0,
          createdAt: new Date()
        });
        productCount++;
        console.log(`✅ Product ${productCount} uploaded: ${product.title || product.name}`);
      }
    }

    console.log(`🎉 SUCCESS! Uploaded ${productCount} products to Firebase!`);
    return { success: true, message: `Uploaded ${productCount} products` };
    
  } catch (error) {
    console.error('❌ Error uploading to Firebase:', error);
    throw error;
  }
};

// Auto-run when this file is imported
console.log('🔥 Firebase uploader ready!');
console.log('👉 Call uploadToFirebase() to start uploading data');
