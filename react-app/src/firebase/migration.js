// Migration Script to Upload Products to Firestore
// Run this once to populate your Firestore database with all products

import { collection, doc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { FIRESTORE_COLLECTIONS } from './firestoreStructure';
import { productsData } from './productsData';

/**
 * Upload all categories to Firestore
 */
export const uploadCategories = async () => {
  console.log('Starting category upload...');
  const categoriesRef = collection(db, FIRESTORE_COLLECTIONS.CATEGORIES);
  
  try {
    for (const [categoryId, categoryData] of Object.entries(productsData)) {
      const categoryDoc = {
        id: categoryData.id,
        categoryName: categoryData.categoryName,
        categoryDescription: categoryData.categoryDescription,
        productCount: categoryData.products.length,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(categoriesRef, categoryId), categoryDoc);
      console.log(`✅ Uploaded category: ${categoryData.categoryName}`);
    }
    
    console.log('✅ All categories uploaded successfully!');
    return { success: true, message: 'Categories uploaded successfully' };
  } catch (error) {
    console.error('❌ Error uploading categories:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Upload all products to Firestore using batched writes
 * Firestore batch write limit is 500 operations per batch
 */
export const uploadProducts = async () => {
  console.log('Starting product upload...');
  const productsRef = collection(db, FIRESTORE_COLLECTIONS.PRODUCTS);
  
  try {
    let batch = writeBatch(db);
    let operationCount = 0;
    let totalProducts = 0;

    for (const [categoryId, categoryData] of Object.entries(productsData)) {
      for (const product of categoryData.products) {
        const productDoc = {
          ...product,
          categoryId: categoryId,
          inStock: true,
          rating: 0,
          reviews: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Convert product.id to string for Firestore document ID
        const productId = String(product.id);
        batch.set(doc(productsRef, productId), productDoc);
        operationCount++;
        totalProducts++;

        // Commit batch if we reach 500 operations (Firestore limit)
        if (operationCount === 500) {
          await batch.commit();
          console.log(`✅ Committed batch of ${operationCount} products`);
          batch = writeBatch(db);
          operationCount = 0;
        }
      }
    }

    // Commit any remaining operations
    if (operationCount > 0) {
      await batch.commit();
      console.log(`✅ Committed final batch of ${operationCount} products`);
    }

    console.log(`✅ All ${totalProducts} products uploaded successfully!`);
    return { success: true, message: `${totalProducts} products uploaded successfully` };
  } catch (error) {
    console.error('❌ Error uploading products:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete all products from Firestore (use with caution!)
 */
export const deleteAllProducts = async () => {
  console.warn('⚠️ Deleting all products from Firestore...');
  // Implementation for deletion if needed
  console.log('Delete function not implemented for safety');
};

/**
 * Delete all categories from Firestore (use with caution!)
 */
export const deleteAllCategories = async () => {
  console.warn('⚠️ Deleting all categories from Firestore...');
  // Implementation for deletion if needed
  console.log('Delete function not implemented for safety');
};

/**
 * Run complete migration - uploads categories and products
 */
export const runCompleteMigration = async () => {
  console.log('🚀 Starting complete migration...');
  
  try {
    // Upload categories first
    const categoryResult = await uploadCategories();
    if (!categoryResult.success) {
      throw new Error(`Category upload failed: ${categoryResult.error}`);
    }

    // Then upload products
    const productResult = await uploadProducts();
    if (!productResult.success) {
      throw new Error(`Product upload failed: ${productResult.error}`);
    }

    console.log('🎉 Complete migration finished successfully!');
    return { 
      success: true, 
      message: 'Migration completed successfully',
      categories: categoryResult,
      products: productResult
    };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error: error.message };
  }
};
