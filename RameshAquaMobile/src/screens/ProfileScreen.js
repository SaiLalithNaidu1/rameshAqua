/**
 * Profile Screen
 * Clean user profile interface
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {logout} from '../store/slices/authSlice';
import {addNotification} from '../store/slices/uiSlice';
import {colors, typography, spacing, commonStyles, shadows} from '../styles/theme';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, isAuthenticated} = useSelector(state => state.auth);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            dispatch(addNotification({
              type: 'info',
              title: 'Logged Out',
              message: 'You have been logged out successfully',
            }));
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      icon: 'bag-outline',
      title: 'My Orders',
      subtitle: 'View order history',
      onPress: () => Alert.alert('Coming Soon', 'Order history feature will be available soon'),
    },
    {
      icon: 'heart-outline',
      title: 'Wishlist',
      subtitle: 'Saved products',
      onPress: () => Alert.alert('Coming Soon', 'Wishlist feature will be available soon'),
    },
    {
      icon: 'location-outline',
      title: 'Addresses',
      subtitle: 'Manage delivery addresses',
      onPress: () => Alert.alert('Coming Soon', 'Address management will be available soon'),
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage payment options',
      onPress: () => Alert.alert('Coming Soon', 'Payment methods will be available soon'),
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help with your orders',
      onPress: () => Alert.alert('Coming Soon', 'Help & Support will be available soon'),
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      subtitle: 'App version and info',
      onPress: () => Alert.alert('About', 'Ramesh Aqua Mobile App\nVersion 1.0.0'),
    },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuIcon}>
        <Icon name={item.icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color={colors.gray} />
    </TouchableOpacity>
  );

  const renderUserInfo = () => {
    if (!isAuthenticated) {
      return (
        <View style={styles.loginPrompt}>
          <Icon name="person-circle-outline" size={64} color={colors.gray} />
          <Text style={styles.loginTitle}>Welcome to Ramesh Aqua</Text>
          <Text style={styles.loginSubtitle}>
            Sign in to access your profile, orders, and more
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Icon name="person" size={32} color={colors.white} />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {user.displayName || user.email || 'User'}
          </Text>
          {user.email && (
            <Text style={styles.userEmail}>{user.email}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon')}
        >
          <Icon name="pencil" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      {renderUserInfo()}
      
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </View>

      {isAuthenticated && (
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon name="log-out-outline" size={20} color={colors.danger} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for Ramesh Aqua
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginPrompt: {
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: spacing.base,
    padding: spacing.xl,
    borderRadius: 12,
    ...shadows.base,
  },

  loginTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },

  loginSubtitle: {
    fontSize: typography.base,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.lineHeight.relaxed * typography.base,
  },

  loginButton: {
    ...commonStyles.button,
    ...commonStyles.buttonPrimary,
    paddingHorizontal: spacing.xl,
  },

  loginButtonText: {
    ...commonStyles.buttonText,
    fontSize: typography.lg,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: spacing.base,
    padding: spacing.base,
    borderRadius: 12,
    ...shadows.base,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userDetails: {
    flex: 1,
    marginLeft: spacing.base,
  },

  userName: {
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  userEmail: {
    fontSize: typography.sm,
    color: colors.gray,
  },

  editButton: {
    padding: spacing.sm,
  },

  menuSection: {
    margin: spacing.base,
  },

  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
    marginLeft: spacing.sm,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.base,
    marginBottom: spacing.xs,
    borderRadius: 12,
    ...shadows.sm,
  },

  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.base,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  menuSubtitle: {
    fontSize: typography.sm,
    color: colors.gray,
  },

  logoutSection: {
    margin: spacing.base,
    marginTop: spacing.xl,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.danger,
    gap: spacing.sm,
  },

  logoutText: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.danger,
  },

  footer: {
    alignItems: 'center',
    padding: spacing.xl,
  },

  footerText: {
    fontSize: typography.sm,
    color: colors.gray,
  },
});

export default ProfileScreen;