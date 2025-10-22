/**
 * Products Screen
 * Clean implementation with filtering and search functionality
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Import services and actions
import {fetchProducts, fetchCategories} from '../services/firestoreService';
import {setProducts, setCategories, setLoading, setFilters} from '../store/slices/productsSlice';

// Import components
import ProductCard from '../components/ProductCard';
import FilterModal from '../components/FilterModal';
import LoadingSpinner from '../components/LoadingSpinner';

// Import styles
import {colors, typography, spacing, commonStyles} from '../styles/theme';

const ProductsScreen = ({route, navigation}) => {
  const {categoryId, categoryName} = route.params || {};
  const dispatch = useDispatch();
  
  // Redux state
  const {products, categories, isLoading, filters, searchQuery} = useSelector(state => state.products);
  
  // Local state
  const [localProducts, setLocalProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Load products on mount
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [categoryId]);

  // Filter and sort products when data changes
  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchText, sortBy, filters]);

  const loadProducts = async () => {
    try {
      dispatch(setLoading(true));
      const productsData = await fetchProducts(categoryId);
      dispatch(setProducts(productsData));
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadCategories = async () => {
    try {
      if (categories.length === 0) {
        const categoriesData = await fetchCategories();
        dispatch(setCategories(categoriesData));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchText.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // Apply category filter (if not already filtered by route)
    if (filters.category && !categoryId) {
      filtered = filtered.filter(product => 
        product.categoryId === filters.category
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    setLocalProducts(filtered);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', {
      productId: product.id,
      product
    });
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleFilterPress = () => {
    setShowFilters(true);
  };

  const handleSortPress = () => {
    const sortOptions = [
      {label: 'Name (A-Z)', value: 'name'},
      {label: 'Price (Low to High)', value: 'price_low'},
      {label: 'Price (High to Low)', value: 'price_high'},
      {label: 'Rating', value: 'rating'},
      {label: 'Newest First', value: 'newest'},
    ];

    Alert.alert(
      'Sort By',
      'Choose sorting option',
      sortOptions.map(option => ({
        text: option.label,
        onPress: () => setSortBy(option.value),
        style: sortBy === option.value ? 'destructive' : 'default',
      }))
    );
  };

  const clearFilters = () => {
    setSearchText('');
    setSortBy('name');
    dispatch(setFilters({
      category: null,
      priceRange: null,
    }));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Title */}
      <Text style={styles.title}>
        {categoryName || 'All Products'}
      </Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor={colors.gray}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close-circle" size={20} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filter and Sort Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleFilterPress}
        >
          <Icon name="filter" size={18} color={colors.primary} />
          <Text style={styles.controlText}>Filter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleSortPress}
        >
          <Icon name="swap-vertical" size={18} color={colors.primary} />
          <Text style={styles.controlText}>Sort</Text>
        </TouchableOpacity>
        
        {(searchText || filters.category || filters.priceRange) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {localProducts.length} product{localProducts.length !== 1 ? 's' : ''} found
      </Text>
    </View>
  );

  const renderProductItem = ({item}) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      style={styles.productCard}
      showAddToCart={true}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="cube-outline" size={64} color={colors.gray} />
      <Text style={styles.emptyTitle}>No Products Found</Text>
      <Text style={styles.emptyMessage}>
        {searchText 
          ? `No products match "${searchText}"`
          : 'No products available in this category'
        }
      </Text>
      {(searchText || filters.category || filters.priceRange) && (
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={clearFilters}
        >
          <Text style={styles.clearFiltersText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading && products.length === 0) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <LoadingSpinner size="large" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={localProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
      
      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        categories={categories}
        currentFilters={filters}
        onApplyFilters={(newFilters) => {
          dispatch(setFilters(newFilters));
          setShowFilters(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  
  title: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
    height: 44,
  },
  
  searchInput: {
    flex: 1,
    fontSize: typography.base,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.base,
  },
  
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
  },
  
  controlText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.medium,
  },
  
  clearButton: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  
  clearText: {
    fontSize: typography.sm,
    color: colors.danger,
    fontWeight: typography.medium,
  },
  
  resultsCount: {
    fontSize: typography.sm,
    color: colors.gray,
  },
  
  listContainer: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl,
  },
  
  productCard: {
    flex: 1,
    margin: spacing.xs,
    maxWidth: '48%',
  },
  
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
  },
  
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },
  
  emptyMessage: {
    fontSize: typography.base,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.base,
  },
  
  clearFiltersButton: {
    ...commonStyles.button,
    backgroundColor: colors.primary,
    marginTop: spacing.lg,
  },
  
  clearFiltersText: {
    ...commonStyles.buttonText,
  },
  
  loadingText: {
    fontSize: typography.base,
    color: colors.gray,
    marginTop: spacing.base,
  },
});

export default ProductsScreen;