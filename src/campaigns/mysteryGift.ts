import { Campaign } from '../types';

/**
 * Mystery Gift Carnival Campaign Configuration
 * Theme: Carnival red
 * Features: Confetti animation, Coupon actions, Mystery gift products
 */
export const mysteryGiftCampaign: Campaign = {
  id: 'MYSTERY_GIFT_CARNIVAL',
  name: 'Mystery Gift Carnival',
  theme: {
    primary: '#FF4444', // Carnival Red
    background: '#FFF0F0',
    secondary: '#FFD700', // Gold
    text: '#333333',
    cardBackground: '#FFFFFF',
    accent: '#FF69B4' // Hot Pink
  },
  overlay: {
    enabled: true,
    lottieSource: 'confetti',
    position: 'center'
  }
};
