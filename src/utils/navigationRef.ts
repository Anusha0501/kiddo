import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * Navigation Reference
 * Global navigation ref for deep linking from action dispatcher
 * This allows navigation from anywhere in the app (e.g., action dispatcher)
 */
export let navigationRef: NavigationContainerRef<RootStackParamList> | null = null;

export const setNavigationRef = (ref: NavigationContainerRef<RootStackParamList> | null) => {
  navigationRef = ref;
};
