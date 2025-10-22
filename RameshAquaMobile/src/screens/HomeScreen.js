/**
 * Home Screen
 * Clean, mobile-optimized implementation with Firebase integration
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Import services and actions
import {fetchCategories, fetchFeaturedProducts} from '../services/firestoreService';
import {setCategories, setFeaturedProducts, setLoading} from '../store/slices/productsSlice';
import {addToCart} from '../store/slices/cartSlice';
import {addNotification} from '../store/slices/uiSlice';

// Import components
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Import styles
import {colors, typography, spacing, commonStyles} from '../styles/theme';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  
  // Redux state
  const {categories, featuredProducts, isLoading} = useSelector(state => state.products);
  const {user} = useSelector(state => state.auth);
  
  // Local state
  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLocalLoading(true);
      dispatch(setLoading(true));
      
      // Load categories and featured products in parallel
      const [categoriesData, featuredData] = await Promise.all([
        fetchCategories(),
        fetchFeaturedProducts(8)
      ]);
      
      dispatch(setCategories(categoriesData));
      dispatch(setFeaturedProducts(featuredData));
      
    } catch (error) {
      console.error('Error loading home data:', error);
      dispatch(addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load home data. Please try again.',
      }));
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', {productId: product.id, product});
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('Products', {
      screen: 'ProductsMain',
      params: {categoryId: category.id, categoryName: category.name}
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(addNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`,
    }));
  };

  const renderHeroBanner = () => (
    <View style={styles.heroBanner}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop'
        }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>Welcome to Ramesh Aqua</Text>
        <Text style={styles.heroSubtitle}>
          Your trusted partner for quality aquaculture products
        </Text>
        <TouchableOpacity 
          style={styles.heroButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.heroButtonText}>Shop Now</Text>
          <Icon name="arrow-forward" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategoryItem = ({item}) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item)}
      style={styles.categoryCard}
    />
  );

  const renderProductItem = ({item}) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      onAddToCart={() => handleAddToCart(item)}
      style={styles.productCard}
    />
  );

  const renderSectionHeader = (title, onViewAll = null) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (localLoading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <LoadingSpinner size="large" />
        <Text style={styles.loadingText}>Loading home data...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={commonStyles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Banner */}
      {renderHeroBanner()}

      {/* Welcome Message */}
      {user && (
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user.displayName || 'User'}!
          </Text>
        </View>
      )}

      {/* Categories Section */}
      <View style={styles.section}>
        {renderSectionHeader(
          'Shop by Category', 
          () => navigation.navigate('Products')
        )}
        
        {categories.length > 0 ? (
          <FlatList
            data={categories.slice(0, 6)}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="grid-outline" size={48} color={colors.gray} />
            <Text style={styles.emptyStateText}>No categories available</Text>
          </View>
        )}
      </View>

      {/* Featured Products Section */}
      <View style={styles.section}>
        {renderSectionHeader(
          'Featured Products', 
          () => navigation.navigate('Products')
        )}
        
        {featuredProducts.length > 0 ? (
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="star-outline" size={48} color={colors.gray} />
            <Text style={styles.emptyStateText}>No featured products available</Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        {renderSectionHeader('Quick Actions')}
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Products')}
          >
            <Icon name="grid" size={32} color={colors.primary} />
            <Text style={styles.quickActionText}>All Products</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Cart')}
          >
            <Icon name="bag" size={32} color={colors.primary} />
            <Text style={styles.quickActionText}>My Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="person" size={32} color={colors.primary} />
            <Text style={styles.quickActionText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer spacing */}
      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heroBanner: {
    height: 200,
    position: 'relative',
    marginBottom: spacing.lg,
  },
  
  heroImage: {
    width: '100%',
    height: '100%',
  },
  
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  heroTitle: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  heroSubtitle: {
    fontSize: typography.base,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  
  heroButton: {
    ...commonStyles.button,
    ...commonStyles.buttonPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  heroButtonText: {
    ...commonStyles.buttonText,
  },
  
  welcomeSection: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
    borderRadius: 8,
  },
  
  welcomeText: {
    fontSize: typography.lg,
    fontWeight: typography.medium,
    color: colors.white,
    textAlign: 'center',
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
  },
  
  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
  },
  
  viewAllText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.medium,
  },
  
  horizontalList: {
    paddingHorizontal: spacing.base,
  },
  
  categoryCard: {
    marginRight: spacing.base,
  },
  
  productCard: {
    marginRight: spacing.base,
    width: 200,
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  
  emptyStateText: {
    fontSize: typography.base,
    color: colors.gray,
    marginTop: spacing.sm,
  },
  
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
  },
  
  quickActionCard: {
    ...commonStyles.card,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 0,
  },
  
  quickActionText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  
  loadingText: {
    fontSize: typography.base,
    color: colors.gray,
    marginTop: spacing.base,
  },
  
  footer: {
    height: spacing.xl,
  },
});

export default HomeScreen;