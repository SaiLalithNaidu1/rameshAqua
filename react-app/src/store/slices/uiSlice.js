import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSlide: 0,
  sidebarOpen: false,
  loading: false,
  notifications: [],
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setCurrentSlide,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  addNotification,
  removeNotification,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;