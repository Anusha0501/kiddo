import { Campaign } from '../types';

/**
 * Back to School Campaign Configuration
 * Theme: Yellow + Blue
 * Features: Paper airplane animation, Lunchboxes collection, School products
 */
export const backToSchoolCampaign: Campaign = {
  id: 'BACK_TO_SCHOOL',
  name: 'Back to School',
  theme: {
    primary: '#FFD700', // Gold/Yellow
    background: '#FFF9E6',
    secondary: '#4169E1', // Royal Blue
    text: '#333333',
    cardBackground: '#FFFFFF',
    accent: '#FF6B35'
  },
  overlay: {
    enabled: true,
    lottieSource: 'paper-airplane',
    position: 'top'
  }
};
