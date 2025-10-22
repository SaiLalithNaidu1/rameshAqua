/**
 * Login Screen
 * Simple login interface
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {loginSuccess} from '../store/slices/authSlice';
import {addNotification} from '../store/slices/uiSlice';
import {colors, typography, spacing, commonStyles} from '../styles/theme';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Mock successful login
      const mockUser = {
        uid: 'mock-user-id',
        email: email,
        displayName: 'Test User'
      };
      
      dispatch(loginSuccess(mockUser));
      dispatch(addNotification({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome back!',
      }));
      
      setLoading(false);
      navigation.goBack();
    }, 1500);
  };

  const handleGuestLogin = () => {
    navigation.goBack();
    dispatch(addNotification({
      type: 'info',
      title: 'Guest Mode',
      message: 'You can browse products without signing in',
    }));
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Icon name="water" size={48} color={colors.primary} />
          <Text style={styles.title}>Welcome to Ramesh Aqua</Text>
          <Text style={styles.subtitle}>
            Sign in to access your account
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor={colors.gray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholderTextColor={colors.gray}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.loginButtonText}>Signing in...</Text>
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => Alert.alert('Coming Soon', 'Password reset will be available soon')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.guestSection}>
          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuestLogin}
          >
            <Icon name="person-outline" size={20} color={colors.primary} />
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Coming Soon', 'Registration will be available soon')}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.base,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  title: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: typography.base,
    color: colors.gray,
    textAlign: 'center',
  },

  form: {
    marginBottom: spacing.xl,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
    height: 52,
  },

  input: {
    flex: 1,
    fontSize: typography.base,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },

  loginButton: {
    ...commonStyles.button,
    ...commonStyles.buttonPrimary,
    height: 52,
    marginTop: spacing.base,
  },

  disabledButton: {
    backgroundColor: colors.gray,
  },

  loginButtonText: {
    ...commonStyles.buttonText,
    fontSize: typography.lg,
  },

  forgotPassword: {
    alignItems: 'center',
    marginTop: spacing.base,
  },

  forgotPasswordText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.medium,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    fontSize: typography.sm,
    color: colors.gray,
    marginHorizontal: spacing.base,
  },

  guestSection: {
    marginBottom: spacing.xl,
  },

  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.base,
    gap: spacing.sm,
  },

  guestButtonText: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.primary,
  },

  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupText: {
    fontSize: typography.base,
    color: colors.gray,
  },

  signupLink: {
    fontSize: typography.base,
    color: colors.primary,
    fontWeight: typography.medium,
  },
});

export default LoginScreen;