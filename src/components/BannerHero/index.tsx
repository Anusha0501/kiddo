import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Banner } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import { useActionDispatcher } from '../../actions/ActionDispatcher';
import { memo } from 'react';

interface BannerHeroProps {
  data: Banner;
}

/**
 * Banner Hero Component
 * Displays a large promotional banner with action support
 * 
 * Performance optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - Stable action dispatcher reference
 * - Theme consumption through context
 */
const BannerHero = memo(({ data }: BannerHeroProps) => {
  const { theme } = useTheme();
  const { handleAction } = useActionDispatcher();

  const handlePress = () => {
    if (data.action) {
      handleAction(data.action);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: data.backgroundColor || theme.primary }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: data.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={[styles.title, { color: theme.cardBackground }]}>
          {data.title}
        </Text>
        {data.subtitle && (
          <Text style={[styles.subtitle, { color: theme.cardBackground }]}>
            {data.subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

BannerHero.displayName = 'BannerHero';

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BannerHero;
