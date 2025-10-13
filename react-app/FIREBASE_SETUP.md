# 🔥 Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "my-react-login-app")
4. Continue through the setup wizard

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:

### Email/Password:
- Click "Email/Password"
- Toggle "Enable" to ON
- Click "Save"

### Google Sign-in:
- Click "Google"
- Toggle "Enable" to ON
- Enter your project support email
- Click "Save"

## Step 3: Get Your Config

1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

## Step 4: Update Your Code

Replace the config in `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your actual API key
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 5: Test Your App

1. Save the file
2. The dev server should automatically reload
3. You should see the login screen
4. Try creating an account and signing in!

---

**🎉 That's it! Your mobile-first Firebase login is ready to use.**

## 🔒 Security Notes

- Never commit your Firebase config to public repositories
- Consider using environment variables for production
- Set up Firebase Security Rules for your database
- Enable App Check for additional security

## 🚀 Next Steps

- Customize the design colors and branding
- Add user profile management
- Implement password reset functionality
- Add more authentication providers (Facebook, Twitter, etc.)
- Set up Firebase Firestore for user data storage