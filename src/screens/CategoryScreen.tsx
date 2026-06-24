import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { memo } from 'react';

interface CategoryScreenProps {
  route: {
    params?: {
      categoryId?: string;
    };
  };
}

/**
 * Category Screen
 * Dummy category screen for deep link navigation
 * 
 * Features:
 * - Theme-aware styling
 * - Displays category ID from navigation params
 */
const CategoryScreen = memo(({ route }: CategoryScreenProps) => {
  const { theme } = useTheme();
  const { categoryId } = route.params || {};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Category Screen
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Category ID: {categoryId || 'N/A'}
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          This is a dummy screen for demonstration purposes.
          In a real app, this would display products for the selected category.
        </Text>
      </View>
    </SafeAreaView>
  );
});

CategoryScreen.displayName = 'CategoryScreen';

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

export default CategoryScreen;
