/**
 * Cart Screen
 * Clean cart implementation with same business logic as web app
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '../store/slices/cartSlice';
import {addNotification} from '../store/slices/uiSlice';
import QuantitySelector from '../components/QuantitySelector';
import {colors, typography, spacing, commonStyles, shadows} from '../styles/theme';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {items, totalItems, totalPrice} = useSelector(state => state.cart);

  const handleRemoveItem = (productId, productName) => {
    Alert.alert(
      'Remove Item',
      `Remove ${productName} from cart?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFromCart(productId));
            dispatch(addNotification({
              type: 'info',
              title: 'Removed from Cart',
              message: `${productName} removed from cart`,
            }));
          }
        }
      ]
    );
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      const item = items.find(item => item.id === productId);
      handleRemoveItem(productId, item?.name);
    } else {
      // Update quantity by dispatching the appropriate action
      const currentItem = items.find(item => item.id === productId);
      if (currentItem) {
        if (newQuantity > currentItem.quantity) {
          dispatch(incrementQuantity(productId));
        } else {
          dispatch(decrementQuantity(productId));
        }
      }
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Remove all items from cart?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            dispatch(clearCart());
            dispatch(addNotification({
              type: 'info',
              title: 'Cart Cleared',
              message: 'All items removed from cart',
            }));
          }
        }
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Proceed to checkout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Proceed',
          onPress: () => {
            // Navigate to checkout or show coming soon
            dispatch(addNotification({
              type: 'info',
              title: 'Coming Soon',
              message: 'Checkout functionality will be available soon',
            }));
          }
        }
      ]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>
          {formatPrice(item.price)}
        </Text>
        
        <View style={styles.itemActions}>
          <QuantitySelector
            value={item.quantity}
            onValueChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
            min={0}
            max={item.maxQuantity || 10}
            style={styles.quantitySelector}
          />
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id, item.name)}
          >
            <Icon name="trash-outline" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalPrice}>
          {formatPrice(item.price * item.quantity)}
        </Text>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCart}>
      <Icon name="bag-outline" size={64} color={colors.gray} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyMessage}>
        Add some products to get started
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartSummary = () => (
    <View style={styles.cartSummary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total Items:</Text>
        <Text style={styles.summaryValue}>{totalItems}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal:</Text>
        <Text style={styles.summaryValue}>{formatPrice(totalPrice)}</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <Icon name="trash" size={16} color={colors.danger} />
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
          <Icon name="arrow-forward" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        {renderEmptyCart()}
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {renderCartSummary()}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: spacing.base,
    paddingBottom: spacing.xl,
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...shadows.base,
  },

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  itemDetails: {
    flex: 1,
    marginLeft: spacing.base,
    justifyContent: 'space-between',
  },

  itemName: {
    fontSize: typography.base,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  itemPrice: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.medium,
  },

  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },

  quantitySelector: {
    flex: 1,
  },

  removeButton: {
    marginLeft: spacing.base,
    padding: spacing.sm,
  },

  itemTotal: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },

  itemTotalPrice: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  emptyCart: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  emptyTitle: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },

  emptyMessage: {
    fontSize: typography.base,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  shopNowButton: {
    ...commonStyles.button,
    ...commonStyles.buttonPrimary,
  },

  shopNowText: {
    ...commonStyles.buttonText,
  },

  cartSummary: {
    backgroundColor: colors.white,
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.sm,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  summaryLabel: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },

  summaryValue: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginBottom: spacing.base,
  },

  totalLabel: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  totalValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: spacing.base,
  },

  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.base,
    borderRadius: 8,
    gap: spacing.xs,
  },

  clearButtonText: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.danger,
  },

  checkoutButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.base,
    borderRadius: 8,
    gap: spacing.xs,
  },

  checkoutButtonText: {
    fontSize: typography.base,
    fontWeight: typography.semiBold,
    color: colors.white,
  },
});

export default CartScreen;