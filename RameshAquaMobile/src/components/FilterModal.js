/**
 * Filter Modal Component
 * Clean filtering interface for products
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, typography, spacing, shadows} from '../styles/theme';

const FilterModal = ({
  visible,
  onClose,
  categories,
  currentFilters,
  onApplyFilters
}) => {
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category);
  const [selectedPriceRange, setSelectedPriceRange] = useState(currentFilters.priceRange);

  useEffect(() => {
    setSelectedCategory(currentFilters.category);
    setSelectedPriceRange(currentFilters.priceRange);
  }, [currentFilters]);

  const priceRanges = [
    {label: 'Under ₹500', value: [0, 500]},
    {label: '₹500 - ₹1,000', value: [500, 1000]},
    {label: '₹1,000 - ₹2,500', value: [1000, 2500]},
    {label: '₹2,500 - ₹5,000', value: [2500, 5000]},
    {label: 'Above ₹5,000', value: [5000, 999999]},
  ];

  const handleApply = () => {
    onApplyFilters({
      category: selectedCategory,
      priceRange: selectedPriceRange,
    });
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
  };

  const isPriceRangeSelected = (range) => {
    if (!selectedPriceRange) return false;
    return selectedPriceRange[0] === range[0] && selectedPriceRange[1] === range[1];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Categories Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.optionsList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.optionItem,
                    selectedCategory === category.id && styles.selectedOption
                  ]}
                  onPress={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <Text style={[
                    styles.optionText,
                    selectedCategory === category.id && styles.selectedOptionText
                  ]}>
                    {category.name}
                  </Text>
                  {selectedCategory === category.id && (
                    <Icon name="checkmark" size={16} color={colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.optionsList}>
              {priceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    isPriceRangeSelected(range.value) && styles.selectedOption
                  ]}
                  onPress={() => setSelectedPriceRange(
                    isPriceRangeSelected(range.value) ? null : range.value
                  )}
                >
                  <Text style={[
                    styles.optionText,
                    isPriceRangeSelected(range.value) && styles.selectedOptionText
                  ]}>
                    {range.label}
                  </Text>
                  {isPriceRangeSelected(range.value) && (
                    <Icon name="checkmark" size={16} color={colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },

  title: {
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
  },

  clearText: {
    fontSize: typography.base,
    color: colors.primary,
    fontWeight: typography.medium,
  },

  content: {
    flex: 1,
    padding: spacing.base,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },

  optionsList: {
    gap: spacing.sm,
  },

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  optionText: {
    fontSize: typography.base,
    color: colors.textPrimary,
    fontWeight: typography.medium,
  },

  selectedOptionText: {
    color: colors.white,
  },

  footer: {
    padding: spacing.base,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.sm,
  },

  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.base,
    borderRadius: 8,
    alignItems: 'center',
  },

  applyButtonText: {
    fontSize: typography.base,
    fontWeight: typography.semiBold,
    color: colors.white,
  },
});

export default FilterModal;