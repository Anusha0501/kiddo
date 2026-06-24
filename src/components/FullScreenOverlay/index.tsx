import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Overlay } from '../../types';
import { memo } from 'react';

interface FullScreenOverlayProps {
  data: Overlay;
}

/**
 * Full Screen Overlay Component
 * Displays Lottie animations as overlay effects
 * 
 * Key design decision:
 * - pointerEvents="none" is CRITICAL
 * - This ensures the overlay never blocks:
 *   - Button presses
 *   - Scrolling
 *   - Gestures
 * - The overlay is purely visual and should not interfere with user interactions
 * 
 * Performance optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - Conditional rendering based on enabled flag
 */
const FullScreenOverlay = memo(({ data }: FullScreenOverlayProps) => {
  if (!data.enabled || !data.lottieSource) {
    return null;
  }

  return (
    <View 
      style={[
        styles.container,
        data.position === 'top' && styles.topPosition,
        data.position === 'bottom' && styles.bottomPosition,
        data.position === 'center' && styles.centerPosition,
      ]}
      pointerEvents="none"
    >
      <LottieView
        source={require(`../../assets/lottie/${data.lottieSource}.json`)}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
});

FullScreenOverlay.displayName = 'FullScreenOverlay';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  topPosition: {
    top: 0,
  },
  bottomPosition: {
    bottom: 0,
  },
  centerPosition: {
    top: '50%',
    marginTop: -100,
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default FullScreenOverlay;
