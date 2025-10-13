import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { store } from './store/store'
import { loginSuccess, logout } from './store/slices/authSlice'
import { LoginScreen } from './components/auth'
import { HomeScreen, CategoriesPage, ProductsPage, CartPage, ProductDetailPage } from './components/pages'
import './App.css'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  
  // Show loading screen while checking authentication status
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner-large"></div>
        <p>Verifying authentication...</p>
      </div>
    )
  }
  
  // Only redirect to login if we're sure the user is not authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route Component (for login)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner-large"></div>
        <p>Loading your experience...</p>
      </div>
    )
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : children
}

// PropTypes for route components
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
}

// App Content Component with Redux and Routing
function AppContent() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(loginSuccess({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        }))
      } else {
        dispatch(logout())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/:categoryId" 
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/product/:productId" 
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

// Main App Component with Redux Provider
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <AppContent />
      </div>
    </Provider>
  )
}

export default App
