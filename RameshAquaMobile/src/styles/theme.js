/**
 * Theme Configuration
 * Clean, consistent styling for mobile app
 */

export const colors = {
  // Primary colors
  primary: '#007bff',
  primaryDark: '#0056b3',
  primaryLight: '#66b3ff',
  
  // Secondary colors
  secondary: '#6c757d',
  secondaryDark: '#495057',
  secondaryLight: '#adb5bd',
  
  // Status colors
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8',
  
  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  gray: '#6c757d',
  lightGray: '#f8f9fa',
  darkGray: '#343a40',
  
  // Background colors
  background: '#ffffff',
  surface: '#f8f9fa',
  
  // Text colors
  textPrimary: '#212529',
  textSecondary: '#6c757d',
  textLight: '#ffffff',
  
  // Border colors
  border: '#dee2e6',
  borderLight: '#e9ecef',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
};

export const typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  
  // Font weights
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

export const spacing = {
  // Padding and margin values
  xs: 4,
  sm: 8,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  base: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const layout = {
  // Common layout values
  headerHeight: 60,
  tabBarHeight: 60,
  buttonHeight: 48,
  inputHeight: 48,
  cardMinHeight: 200,
  
  // Screen padding
  screenPadding: spacing.base,
  sectionSpacing: spacing.lg,
};

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: layout.screenPadding,
  },
  
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.base,
    padding: spacing.base,
    marginVertical: spacing.sm,
    ...shadows.base,
  },
  
  button: {
    height: layout.buttonHeight,
    borderRadius: borderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  
  buttonText: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.white,
  },
  
  input: {
    height: layout.inputHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.base,
    fontSize: typography.base,
    backgroundColor: colors.white,
  },
  
  textPrimary: {
    fontSize: typography.base,
    color: colors.textPrimary,
    fontWeight: typography.normal,
  },
  
  textSecondary: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.normal,
  },
  
  heading1: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  
  heading2: {
    fontSize: typography['2xl'],
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  heading3: {
    fontSize: typography.xl,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  flexGrow: {
    flex: 1,
  },
};