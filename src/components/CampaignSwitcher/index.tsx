import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { backToSchoolCampaign } from '../../campaigns/backToSchool';
import { summerPlayhouseCampaign } from '../../campaigns/summerPlayhouse';
import { mysteryGiftCampaign } from '../../campaigns/mysteryGift';
import { memo, useCallback } from 'react';

/**
 * Campaign Switcher Component
 * Developer-only tool for switching between campaigns
 * Demonstrates OTA-style runtime behavior
 * 
 * Switching campaigns:
 * - Updates theme instantly
 * - Updates overlay configuration
 * - Updates homepage payload
 * - No app reload required
 * 
 * Performance optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - useCallback for stable handlers
 */
const CampaignSwitcher = memo(() => {
  const { theme } = useTheme();
  const { setTheme } = useTheme();

  const switchToBackToSchool = useCallback(() => {
    setTheme(backToSchoolCampaign.theme);
    console.log('Switched to Back to School campaign');
  }, [setTheme]);

  const switchToSummerPlayhouse = useCallback(() => {
    setTheme(summerPlayhouseCampaign.theme);
    console.log('Switched to Summer Playhouse campaign');
  }, [setTheme]);

  const switchToMysteryGift = useCallback(() => {
    setTheme(mysteryGiftCampaign.theme);
    console.log('Switched to Mystery Gift Carnival campaign');
  }, [setTheme]);

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Campaign Switcher (Dev Only)
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: backToSchoolCampaign.theme.primary }]}
          onPress={switchToBackToSchool}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Back To School</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: summerPlayhouseCampaign.theme.primary }]}
          onPress={switchToSummerPlayhouse}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Summer Playhouse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: mysteryGiftCampaign.theme.primary }]}
          onPress={switchToMysteryGift}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Mystery Gift</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

CampaignSwitcher.displayName = 'CampaignSwitcher';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CampaignSwitcher;
