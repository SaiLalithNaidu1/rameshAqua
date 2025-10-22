/**
 * Loading Spinner Component
 * Simple, reusable loading indicator
 */

import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

const LoadingSpinner = ({size = 'small', color = colors.primary, style}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;