/**
 * Products Slice
 * Manages product data and related state
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  featuredProducts: [],
  selectedProduct: null,
  selectedCategory: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: {
    category: null,
    priceRange: null,
    sortBy: 'name'
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: null,
        sortBy: 'name'
      };
      state.searchQuery = '';
    },
    
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    
    updateProduct: (state, action) => {
      const {id, updates} = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...updates
        };
      }
    },
    
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(product => product.id !== productId);
    }
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setProducts,
  setCategories,
  setFeaturedProducts,
  setSelectedProduct,
  setSelectedCategory,
  setSearchQuery,
  setFilters,
  clearFilters,
  addProduct,
  updateProduct,
  removeProduct
} = productsSlice.actions;

export default productsSlice.reducer;