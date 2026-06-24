import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Section } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { getComponent } from '../registry/ComponentRegistry';
import { memo, useCallback } from 'react';

interface HomeRendererProps {
  sections: Section[];
}

/**
 * Home Renderer Component
 * Single root FlashList that renders all homepage sections
 * 
 * Key architectural decisions:
 * - All sections render through one master list
 * - No nested vertical lists (performance anti-pattern)
 * - Component registry pattern for dynamic resolution
 * - Resilience: unknown component types return null
 * 
 * Performance optimizations:
 * - FlashList for virtualization
 * - Stable keyExtractor
 * - estimatedItemSize for smooth scrolling
 * - memoized renderItem
 * - Component registry lookup is O(1)
 */
const HomeRenderer = memo(({ sections }: HomeRendererProps) => {
  const { theme } = useTheme();

  const renderItem = useCallback(({ item }: { item: Section }) => {
    const Component = getComponent(item.type);

    // Resilience: Return null for unknown component types
    // This prevents crashes when payload contains new component types
    if (!Component) {
      console.warn(`Unknown component type: ${item.type}. This section will be ignored.`);
      return null;
    }

    return <Component data={item.data} />;
  }, []);

  const keyExtractor = useCallback((item: Section) => item.id, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlashList
        data={sections}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
});

HomeRenderer.displayName = 'HomeRenderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
});

export default HomeRenderer;
