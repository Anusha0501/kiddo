import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import ProductCard from '../ProductCard';
import { memo } from 'react';

interface ProductGridProps {
  data: {
    title: string;
    products: Product[];
  };
}

/**
 * Product Grid Component
 * Displays products in a 2x2 grid layout
 * 
 * Performance optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - ProductCard is already memoized
 * - Theme consumption through context
 */
const ProductGrid = memo(({ data }: ProductGridProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        {data.title}
      </Text>
      <View style={styles.grid}>
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
});

ProductGrid.displayName = 'ProductGrid';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductGrid;
