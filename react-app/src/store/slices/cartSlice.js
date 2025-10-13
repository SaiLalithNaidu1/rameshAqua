import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of cart items
  totalItems: 0, // Total number of items (sum of all quantities)
  totalAmount: 0, // Total price of all items
  tax: 0, // Tax amount
  deliveryFee: 0, // Delivery charges
  discount: 0, // Discount amount
  finalAmount: 0, // Final amount after tax, delivery, discount
  isOpen: false // Cart sidebar/modal state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price) || 0,
          imageUrl: product.imageUrl,
          description: product.description,
          quantity: quantity,
          totalPrice: (parseFloat(product.price) || 0) * quantity,
          category: product.category || 'General'
        });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        } else {
          item.quantity = quantity;
          item.totalPrice = item.quantity * item.price;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.quantity * item.price;
        } else {
          state.items = state.items.filter(item => item.id !== productId);
        }
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    applyDiscount: (state, action) => {
      state.discount = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    setDeliveryFee: (state, action) => {
      state.deliveryFee = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    calculateTotals: (state) => {
      // Calculate total items and amount
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      
      // Calculate tax (18% GST)
      state.tax = state.totalAmount * 0.18;
      
      // Set delivery fee based on order amount
      if (state.totalAmount > 500) {
        state.deliveryFee = 0; // Free delivery above ₹500
      } else if (state.totalAmount > 0) {
        state.deliveryFee = 40; // ₹40 delivery fee
      } else {
        state.deliveryFee = 0;
      }
      
      // Calculate final amount
      state.finalAmount = state.totalAmount + state.tax + state.deliveryFee - state.discount;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyDiscount,
  setDeliveryFee,
  toggleCart,
  closeCart,
  openCart,
  calculateTotals
} = cartSlice.actions;

export default cartSlice.reducer;