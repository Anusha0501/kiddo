import { useAddToCart as useAddToCartSelector } from '../store/cartStore';

/**
 * Custom hook for add to cart action
 * Provides a stable reference to prevent unnecessary re-renders
 */
export const useAddToCart = useAddToCartSelector;
