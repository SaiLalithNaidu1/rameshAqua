/**
 * Quantity Selector Component
 * Clean quantity input with increment/decrement buttons
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, typography, spacing} from '../styles/theme';

const QuantitySelector = ({
  value,
  onValueChange,
  min = 1,
  max = 99,
  style
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onValueChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onValueChange(value + 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, value <= min && styles.disabledButton]}
        onPress={handleDecrement}
        disabled={value <= min}
      >
        <Icon name="remove" size={16} color={value <= min ? colors.gray : colors.primary} />
      </TouchableOpacity>
      
      <Text style={styles.quantity}>{value}</Text>
      
      <TouchableOpacity
        style={[styles.button, value >= max && styles.disabledButton]}
        onPress={handleIncrement}
        disabled={value >= max}
      >
        <Icon name="add" size={16} color={value >= max ? colors.gray : colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.xs,
  },

  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  disabledButton: {
    opacity: 0.5,
  },

  quantity: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginHorizontal: spacing.base,
    minWidth: 30,
    textAlign: 'center',
  },
});

export default QuantitySelector;