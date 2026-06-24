import { View, Text, StyleSheet } from 'react-native';
import { Collection } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import ProductCard from '../ProductCard';
import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';

interface DynamicCollectionProps {
  data: Collection;
}

/**
 * Dynamic Collection Component
 * Displays products in a horizontal FlashList
 * 
 * Performance optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - FlashList for efficient horizontal scrolling
 * - useCallback for stable render item function
 * - ProductCard is already memoized
 * - No interference with parent vertical scroll
 */
const DynamicCollection = memo(({ data }: DynamicCollectionProps) => {
  const { theme } = useTheme();

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <ProductCard product={item} />;
  }, []);

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        {data.title}
      </Text>
      <FlashList
        data={data.products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={174}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});

DynamicCollection.displayName = 'DynamicCollection';

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
  listContent: {
    paddingHorizontal: 8,
  },
});

export default DynamicCollection;
