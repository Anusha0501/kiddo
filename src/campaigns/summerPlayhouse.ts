import { Campaign } from '../types';

/**
 * Summer Playhouse Campaign Configuration
 * Theme: Ocean blue palette
 * Features: Water splash overlay, Beach toys, Summer products, Petting zoo ticket card
 */
export const summerPlayhouseCampaign: Campaign = {
  id: 'SUMMER_PLAYHOUSE',
  name: 'Summer Playhouse',
  theme: {
    primary: '#00BFFF', // Deep Sky Blue
    background: '#E0F7FA',
    secondary: '#00CED1', // Dark Turquoise
    text: '#333333',
    cardBackground: '#FFFFFF',
    accent: '#FF7F50' // Coral
  },
  overlay: {
    enabled: true,
    lottieSource: 'water-splash',
    position: 'bottom'
  }
};
