import { useCartCount as useCartCountSelector } from '../store/cartStore';

/**
 * Custom hook for cart count
 * Provides a stable selector-based subscription
 * Components using this will only re-render when cart count changes
 */
export const useCartCount = useCartCountSelector;
