/**
 * UI Slice
 * Manages UI state and mobile-specific interface controls
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDrawerOpen: false,
  activeTab: 'Home',
  showSearchBar: false,
  notifications: [],
  loading: {
    global: false,
    products: false,
    categories: false,
    auth: false
  },
  modals: {
    productDetail: false,
    cart: false,
    profile: false,
    search: false
  },
  theme: 'light',
  deviceInfo: {
    isTablet: false,
    orientation: 'portrait'
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    
    toggleSearchBar: (state) => {
      state.showSearchBar = !state.showSearchBar;
    },
    
    setSearchBarVisible: (state, action) => {
      state.showSearchBar = action.payload;
    },
    
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      state.notifications.unshift(notification);
    },
    
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationId
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    setLoading: (state, action) => {
      const {key, value} = action.payload;
      if (key in state.loading) {
        state.loading[key] = value;
      }
    },
    
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    
    openModal: (state, action) => {
      const modalName = action.payload;
      if (modalName in state.modals) {
        state.modals[modalName] = true;
      }
    },
    
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (modalName in state.modals) {
        state.modals[modalName] = false;
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    setDeviceInfo: (state, action) => {
      state.deviceInfo = {
        ...state.deviceInfo,
        ...action.payload
      };
    },
    
    setOrientation: (state, action) => {
      state.deviceInfo.orientation = action.payload;
    }
  },
});

export const {
  toggleDrawer,
  closeDrawer,
  openDrawer,
  setActiveTab,
  toggleSearchBar,
  setSearchBarVisible,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setGlobalLoading,
  openModal,
  closeModal,
  closeAllModals,
  setTheme,
  toggleTheme,
  setDeviceInfo,
  setOrientation
} = uiSlice.actions;

export default uiSlice.reducer;