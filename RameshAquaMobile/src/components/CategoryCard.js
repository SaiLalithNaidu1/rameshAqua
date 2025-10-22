/**
 * Category Card Component
 * Reusable card component for displaying categories
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {colors, typography, spacing, shadows} from '../styles/theme';

const CategoryCard = ({category, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{uri: category.image}}
          style={styles.categoryImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.categoryName}>{category.name}</Text>
          {category.productCount && (
            <Text style={styles.productCount}>
              {category.productCount} products
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.base,
    marginRight: spacing.base,
  },

  imageContainer: {
    flex: 1,
    position: 'relative',
  },

  categoryImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: spacing.sm,
  },

  categoryName: {
    fontSize: typography.sm,
    fontWeight: typography.semiBold,
    color: colors.white,
    textAlign: 'center',
  },

  productCount: {
    fontSize: typography.xs,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 2,
  },
});

export default CategoryCard;