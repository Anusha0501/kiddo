import { StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import HomeRenderer from '../renderer/HomeRenderer';
import CampaignSwitcher from '../components/CampaignSwitcher';
import FullScreenOverlay from '../components/FullScreenOverlay';
import homepageJson from '../mock/homepage.json';
import { memo } from 'react';

/**
 * Home Screen
 * Main homepage screen that renders the SDUI homepage
 * 
 * Features:
 * - Campaign switcher for developer testing
 * - HomeRenderer for dynamic section rendering
 * - Full screen overlay for campaign effects
 * - Theme-aware styling
 */
const HomeScreen = memo(() => {
  const { theme } = useTheme();

  // In a real app, this would come from an API
  const homepagePayload = homepageJson as any;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CampaignSwitcher />
      <HomeRenderer sections={homepagePayload.sections} />
      <FullScreenOverlay data={homepagePayload.sections.find(
        (s: any) => s.type === 'FULL_SCREEN_OVERLAY'
      )?.data || { enabled: false }} />
    </SafeAreaView>
  );
});

HomeScreen.displayName = 'HomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
