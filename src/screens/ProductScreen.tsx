import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { memo } from 'react';

interface ProductScreenProps {
  route: {
    params?: {
      productId?: string;
    };
  };
}

/**
 * Product Screen
 * Dummy product screen for deep link navigation
 * 
 * Features:
 * - Theme-aware styling
 * - Displays product ID from navigation params
 */
const ProductScreen = memo(({ route }: ProductScreenProps) => {
  const { theme } = useTheme();
  const { productId } = route.params || {};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Product Screen
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Product ID: {productId || 'N/A'}
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          This is a dummy screen for demonstration purposes.
          In a real app, this would display detailed product information,
          reviews, and add to cart functionality.
        </Text>
      </View>
    </SafeAreaView>
  );
});

ProductScreen.displayName = 'ProductScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProductScreen;
