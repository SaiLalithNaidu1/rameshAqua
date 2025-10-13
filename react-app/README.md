# 🔐 Mobile-First Firebase Login Screen

A beautiful, responsive login screen built with React, Vite, and Firebase Authentication, optimized for mobile devices with excellent UX/UI.

## ✨ Features

### 🎨 **Design & UX**
- **Mobile-first responsive design** - Optimized for all screen sizes
- **Modern gradient UI** - Beautiful visual design with smooth animations
- **Dark mode support** - Automatic dark/light theme detection
- **Touch-optimized** - Perfect touch targets and gestures for mobile
- **Smooth animations** - Elegant transitions and loading states

### 🔑 **Authentication**
- **Email/Password login** - Traditional authentication method
- **Google Sign-in** - One-click social authentication
- **User registration** - Account creation with validation
- **Form validation** - Real-time input validation
- **Error handling** - User-friendly error messages

### 📱 **Mobile Optimization**
- **Landscape mode support** - Optimized for both orientations
- **iOS/Android compatible** - Native-like experience
- **Fast loading** - Optimized performance
- **Accessibility** - Screen reader friendly

## 🚀 Quick Start

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and add Email/Password + Google providers
4. Copy your Firebase config from Project Settings > General > Web apps

### 2. Configure Firebase

Update `src/firebase/config.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. Install & Run

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

## 📱 Ready to Use!

The login screen is now ready with:
- ✅ Beautiful mobile-first design
- ✅ Firebase authentication setup
- ✅ Form validation and error handling
- ✅ Google Sign-in integration
- ✅ Responsive layout for all devices

**Just add your Firebase config and you're ready to go!** 🚀
