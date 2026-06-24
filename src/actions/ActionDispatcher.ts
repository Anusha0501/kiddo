import { Action, Product } from '../types';
import { useAddToCart } from '../store/cartStore';
import { Alert } from 'react-native';

/**
 * Universal Action Dispatcher
 * Centralized handler for all user actions across the app
 * 
 * Key design principles:
 * - Components contain NO business logic
 * - All actions flow through this dispatcher
 * - Separation of concerns: UI vs business logic
 * - Extensible: new action types can be added easily
 */

/**
 * Handle an action based on its type
 * This is the single entry point for all actions in the app
 */
export const handleAction = (action: Action): void => {
  switch (action.type) {
    case 'ADD_TO_CART':
      handleAddToCart(action);
      break;
    case 'DEEP_LINK':
      handleDeepLink(action);
      break;
    case 'APPLY_MYSTERY_GIFT_COUPON':
      handleApplyMysteryGiftCoupon(action);
      break;
    case 'SHOW_TOAST':
      handleShowToast(action);
      break;
    default:
      // TypeScript exhaustiveness check will catch unhandled types
      const _exhaustiveCheck: never = action;
      console.warn('Unknown action type:', _exhaustiveCheck);
  }
};

/**
 * Handle ADD_TO_CART action
 * Updates cart state through Zustand store
 */
const handleAddToCart = (action: Action): void => {
  if (action.type !== 'ADD_TO_CART') return;

  const { productId, quantity } = action.payload;
  const addToCart = useAddToCart.getState().addToCart;

  // In a real app, we would fetch product details from an API
  // For this demo, we create a mock product
  const mockProduct: Product = {
    id: productId,
    name: 'Product',
    price: 99,
    rating: 4.5,
    image: 'https://via.placeholder.com/150',
  };

  addToCart(mockProduct, quantity);
  console.log(`Added ${quantity} of product ${productId} to cart`);
};

/**
 * Handle DEEP_LINK action
 * Navigates to a different screen
 * This will be integrated with React Navigation
 */
const handleDeepLink = (action: Action): void => {
  if (action.type !== 'DEEP_LINK') return;

  const { screen, params } = action.payload;
  console.log(`Deep linking to screen: ${screen}`, params);

  // Navigation will be handled by the navigation ref
  // This is a placeholder for the actual navigation logic
  // In production, this would use navigationRef.navigate(screen, params)
};

/**
 * Handle APPLY_MYSTERY_GIFT_COUPON action
 * Applies a coupon code for the mystery gift campaign
 */
const handleApplyMysteryGiftCoupon = (action: Action): void => {
  if (action.type !== 'APPLY_MYSTERY_GIFT_COUPON') return;

  const { couponCode } = action.payload;
  console.log(`Applying mystery gift coupon: ${couponCode}`);

  // In a real app, this would call an API to validate and apply the coupon
  // For demo purposes, we show an alert
  Alert.alert('Coupon Applied!', `Mystery gift coupon ${couponCode} has been applied.`);
};

/**
 * Handle SHOW_TOAST action
 * Displays a toast message to the user
 */
const handleShowToast = (action: Action): void => {
  if (action.type !== 'SHOW_TOAST') return;

  const { message } = action.payload;
  console.log('Toast:', message);

  // In a real app, this would use a toast library like react-native-toast-message
  // For demo purposes, we use Alert
  Alert.alert('Notification', message);
};

/**
 * Hook for components to access the action dispatcher
 * Provides a stable reference to prevent unnecessary re-renders
 */
export const useActionDispatcher = () => {
  return { handleAction };
};
