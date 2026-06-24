/**
 * Core type definitions for the SDUI architecture
 * All types use discriminated unions for type safety
 */

// Theme configuration
export interface Theme {
  primary: string;
  background: string;
  secondary?: string;
  text?: string;
  cardBackground?: string;
  accent?: string;
}

// Action types with discriminated union
export type ActionType = 
  | 'ADD_TO_CART'
  | 'DEEP_LINK'
  | 'APPLY_MYSTERY_GIFT_COUPON'
  | 'SHOW_TOAST';

export interface BaseAction {
  type: ActionType;
}

export interface AddToCartAction extends BaseAction {
  type: 'ADD_TO_CART';
  payload: {
    productId: string;
    quantity: number;
  };
}

export interface DeepLinkAction extends BaseAction {
  type: 'DEEP_LINK';
  payload: {
    screen: string;
    params?: Record<string, unknown>;
  };
}

export interface ApplyMysteryGiftCouponAction extends BaseAction {
  type: 'APPLY_MYSTERY_GIFT_COUPON';
  payload: {
    couponCode: string;
  };
}

export interface ShowToastAction extends BaseAction {
  type: 'SHOW_TOAST';
  payload: {
    message: string;
  };
}

export type Action = AddToCartAction | DeepLinkAction | ApplyMysteryGiftCouponAction | ShowToastAction;

// Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  action?: Action;
}

// Banner types
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  backgroundColor?: string;
  action?: Action;
}

// Collection types
export interface Collection {
  id: string;
  title: string;
  products: Product[];
  action?: Action;
}

// Overlay configuration
export interface Overlay {
  enabled: boolean;
  lottieSource?: string;
  position?: 'top' | 'bottom' | 'center';
}

// Campaign types
export type CampaignType = 'BACK_TO_SCHOOL' | 'SUMMER_PLAYHOUSE' | 'MYSTERY_GIFT_CARNIVAL';

export interface Campaign {
  id: CampaignType;
  name: string;
  theme: Theme;
  overlay?: Overlay;
}

// Section types with discriminated union
export type SectionType = 
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | 'FULL_SCREEN_OVERLAY';

export interface BaseSection {
  type: SectionType;
  id: string;
}

export interface BannerHeroSection extends BaseSection {
  type: 'BANNER_HERO';
  data: Banner;
}

export interface ProductGridSection extends BaseSection {
  type: 'PRODUCT_GRID_2X2';
  data: {
    title: string;
    products: Product[];
  };
}

export interface DynamicCollectionSection extends BaseSection {
  type: 'DYNAMIC_COLLECTION';
  data: Collection;
}

export interface FullScreenOverlaySection extends BaseSection {
  type: 'FULL_SCREEN_OVERLAY';
  data: Overlay;
}

export type Section = BannerHeroSection | ProductGridSection | DynamicCollectionSection | FullScreenOverlaySection;

// Homepage payload
export interface HomepagePayload {
  theme: Theme;
  campaign: CampaignType;
  sections: Section[];
}

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}
