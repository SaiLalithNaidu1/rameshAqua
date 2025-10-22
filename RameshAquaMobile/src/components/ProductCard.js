/**
 * Product Card Component
 * Reusable card component for displaying products
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {addToCart} from '../store/slices/cartSlice';
import {addNotification} from '../store/slices/uiSlice';
import {colors, typography, spacing, shadows} from '../styles/theme';

const ProductCard = ({
  product,
  onPress,
  style,
  showAddToCart = true,
  compact = false
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity: 1}));
    dispatch(addNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} added to cart`,
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const cardStyle = compact ? styles.compactCard : styles.card;

  return (
    <TouchableOpacity
      style={[cardStyle, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.image}}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {product.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {formatPrice(product.price)}
          </Text>
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
                  size={12}
                  color={colors.warning}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              ({product.reviewCount || 0})
            </Text>
          </View>
        )}

        {showAddToCart && product.inStock && (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Icon name="bag-add" size={16} color={colors.white} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.base,
    marginVertical: spacing.xs,
  },
  
  compactCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    ...shadows.sm,
    width: 160,
  },

  imageContainer: {
    position: 'relative',
    height: 150,
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  featuredText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.white,
  },

  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  outOfStockText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.white,
  },

  content: {
    padding: spacing.base,
  },

  productName: {
    fontSize: typography.base,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  description: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.normal * typography.sm,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },

  currentPrice: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },

  originalPrice: {
    fontSize: typography.sm,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },

  stars: {
    flexDirection: 'row',
    gap: 1,
  },

  ratingText: {
    fontSize: typography.xs,
    color: colors.gray,
  },

  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    gap: spacing.xs,
  },

  addToCartText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.white,
  },
});

export default ProductCard;