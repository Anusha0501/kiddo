import { create } from 'zustand';
import { CartItem, Product } from '../types';

/**
 * Zustand store for cart state management
 * Uses selector-based subscriptions for render isolation
 * 
 * Key design decisions:
 * - Selectors prevent unnecessary re-renders
 * - Adding to cart only updates cart-related components
 * - Homepage feed remains unaffected by cart changes
 */
interface CartState {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  cartCount: 0,

  addToCart: (product: Product, quantity: number) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      let newCartItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newCartItems = [...state.cartItems, { product, quantity }];
      }

      const newCartCount = newCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        cartItems: newCartItems,
        cartCount: newCartCount,
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
      const newCartCount = newCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        cartItems: newCartItems,
        cartCount: newCartCount,
      };
    });
  },

  clearCart: () => {
    set({
      cartItems: [],
      cartCount: 0,
    });
  },
}));

/**
 * Selector hooks for fine-grained subscriptions
 * Components using these will only re-render when the specific value changes
 */
export const useCartCount = () => useCartStore((state) => state.cartCount);
export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () => useCartStore((state) => state.removeFromCart);
