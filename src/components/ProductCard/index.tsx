import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import { useActionDispatcher } from '../../actions/ActionDispatcher';
import { memo } from 'react';

interface ProductCardProps {
  product: Product;
}

/**
 * Product Card Component
 * Displays product information with add to cart functionality
 * 
 * Performance optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - Stable action dispatcher reference
 * - Theme consumption through context
 */
const ProductCard = memo(({ product }: ProductCardProps) => {
  const { theme } = useTheme();
  const { handleAction } = useActionDispatcher();

  const handleAddToCart = () => {
    if (product.action) {
      handleAction(product.action);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.price, { color: theme.primary }]}>
            ₹{product.price}
          </Text>
          <Text style={[styles.rating, { color: theme.text }]}>
            ⭐ {product.rating}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 150,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  rating: {
    fontSize: 12,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductCard;
