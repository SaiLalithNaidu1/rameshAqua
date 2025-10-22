/**
 * Product Detail Screen
 * Clean implementation with same business logic as web app
 * Firebase integration with analytics tracking
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Import services and actions
import {
  fetchProductById,
  trackProductView,
  trackProductInteraction,
  addToWishlist,
  removeFromWishlist
} from '../services/firestoreService';
import {addToCart} from '../store/slices/cartSlice';
import {addNotification} from '../store/slices/uiSlice';

// Import components
import LoadingSpinner from '../components/LoadingSpinner';
import QuantitySelector from '../components/QuantitySelector';

// Import styles
import {colors, typography, spacing, commonStyles, shadows} from '../styles/theme';

const {width: screenWidth} = Dimensions.get('window');

const ProductDetailScreen = ({route, navigation}) => {
  const {productId, product: initialProduct} = route.params;
  const dispatch = useDispatch();
  
  // Redux state
  const {user} = useSelector(state => state.auth);
  const {items: cartItems} = useSelector(state => state.cart);
  
  // Local state
  const [product, setProduct] = useState(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Load product data and track view
  useEffect(() => {
    loadProductData();
    trackView();
  }, [productId]);

  const loadProductData = async () => {
    try {
      if (!initialProduct) {
        setLoading(true);
        const productData = await fetchProductById(productId);
        setProduct(productData);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    try {
      await trackProductView(productId, user?.uid);
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        ...product,
        quantity
      };
      
      dispatch(addToCart(cartItem));
      
      // Track interaction
      await trackProductInteraction(
        productId, 
        user?.uid, 
        'add_to_cart', 
        {quantity}
      );
      
      dispatch(addNotification({
        type: 'success',
        title: 'Added to Cart',
        message: `${quantity} x ${product.name} added to cart`,
      }));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch(addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to add product to cart',
      }));
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to add items to wishlist');
      return;
    }

    try {
      if (inWishlist) {
        await removeFromWishlist(user.uid, productId);
        setInWishlist(false);
        dispatch(addNotification({
          type: 'info',
          title: 'Removed from Wishlist',
          message: 'Product removed from your wishlist',
        }));
      } else {
        await addToWishlist(user.uid, productId, product);
        setInWishlist(true);
        dispatch(addNotification({
          type: 'success',
          title: 'Added to Wishlist',
          message: 'Product added to your wishlist',
        }));
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      dispatch(addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update wishlist',
      }));
    }
  };

  const handleShare = async () => {
    try {
      const shareMessage = `Check out ${product.name} on Ramesh Aqua!\n\n${product.description}\n\nPrice: ₹${product.price}`;
      
      await Share.share({
        message: shareMessage,
        title: product.name,
      });
      
      // Track share interaction
      await trackProductInteraction(productId, user?.uid, 'share');
      
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  };

  const getCartQuantity = () => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderImageGallery = () => {
    const images = product.images || [product.image];
    
    return (
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveImageIndex(newIndex);
          }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{uri: image}}
              style={styles.productImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        {images.length > 1 && (
          <View style={styles.imageIndicators}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  activeImageIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        )}
        
        {/* Action Buttons Overlay */}
        <View style={styles.imageActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleWishlistToggle}
          >
            <Icon
              name={inWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={inWishlist ? colors.danger : colors.white}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Icon name="share-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>{formatPrice(product.price)}</Text>
        {product.originalPrice && product.originalPrice > product.price && (
          <Text style={styles.originalPrice}>
            {formatPrice(product.originalPrice)}
          </Text>
        )}
      </View>
      
      {product.rating && (
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name={star <= Math.floor(product.rating) ? 'star' : 'star-outline'}
                size={16}
                color={colors.warning}
              />
            ))}
          </View>
          <Text style={styles.ratingText}>
            {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
          </Text>
        </View>
      )}
      
      <View style={styles.availabilityContainer}>
        <Icon 
          name={product.inStock ? 'checkmark-circle' : 'close-circle'} 
          size={20} 
          color={product.inStock ? colors.success : colors.danger}
        />
        <Text style={[
          styles.availabilityText,
          {color: product.inStock ? colors.success : colors.danger}
        ]}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>
    </View>
  );

  const renderDescription = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
      
      {product.features && product.features.length > 0 && (
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Key Features:</Text>
          {product.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name="checkmark" size={16} color={colors.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <QuantitySelector
          value={quantity}
          onValueChange={setQuantity}
          min={1}
          max={product.maxQuantity || 10}
        />
      </View>
      
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          !product.inStock && styles.disabledButton
        ]}
        onPress={handleAddToCart}
        disabled={!product.inStock}
      >
        <Icon name="bag" size={20} color={colors.white} />
        <Text style={styles.addToCartText}>
          {getCartQuantity() > 0 ? 'Update Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <LoadingSpinner size="large" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Icon name="alert-circle-outline" size={64} color={colors.gray} />
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImageGallery()}
        {renderProductInfo()}
        {renderDescription()}
      </ScrollView>
      
      {renderActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  
  productImage: {
    width: screenWidth,
    height: 300,
  },
  
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  
  activeIndicator: {
    backgroundColor: colors.white,
  },
  
  imageActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'column',
    gap: spacing.sm,
  },
  
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  productInfo: {
    padding: spacing.base,
    backgroundColor: colors.white,
  },
  
  productName: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  
  currentPrice: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  
  originalPrice: {
    fontSize: typography.base,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  
  ratingText: {
    fontSize: typography.sm,
    color: colors.gray,
  },
  
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  availabilityText: {
    fontSize: typography.base,
    fontWeight: typography.medium,
  },
  
  section: {
    padding: spacing.base,
    backgroundColor: colors.white,
    marginTop: spacing.sm,
  },
  
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  description: {
    fontSize: typography.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.base,
  },
  
  featuresContainer: {
    marginTop: spacing.base,
  },
  
  featuresTitle: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  
  featureText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  
  actionsContainer: {
    padding: spacing.base,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.sm,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  
  quantityLabel: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
  },
  
  addToCartButton: {
    ...commonStyles.button,
    ...commonStyles.buttonPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  disabledButton: {
    backgroundColor: colors.gray,
  },
  
  addToCartText: {
    ...commonStyles.buttonText,
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
  },
  
  loadingText: {
    fontSize: typography.base,
    color: colors.gray,
    marginTop: spacing.base,
  },
  
  errorText: {
    fontSize: typography.lg,
    color: colors.gray,
    marginTop: spacing.base,
    textAlign: 'center',
  },
  
  retryButton: {
    ...commonStyles.button,
    ...commonStyles.buttonPrimary,
    marginTop: spacing.lg,
  },
  
  retryText: {
    ...commonStyles.buttonText,
  },
});

export default ProductDetailScreen;