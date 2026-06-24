# Kiddo SDUI - Production-Grade Server Driven UI Architecture

A production-ready React Native Server Driven UI (SDUI) architecture demonstrating scalable patterns used by Blinkit, Swiggy Instamart, Zepto, and Zomato.

## Project Overview

This project implements a complete SDUI system where the frontend acts as a dumb rendering engine. All screens, themes, campaigns, actions, and sections are derived from a JSON configuration payload. The architecture demonstrates:

- **Scalable SDUI Architecture** - Factory Registry Pattern for dynamic component resolution
- **Runtime Theming** - Theme updates without app reload (OTA-style)
- **Campaign Engine** - Multiple campaign configurations with instant switching
- **Render Optimization** - FlashList virtualization, React.memo, stable references
- **State Isolation** - Selector-based Zustand subscriptions preventing unnecessary re-renders
- **Production Engineering** - Resilience patterns, TypeScript strict mode, comprehensive error handling

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ThemeProvider                            │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         AppNavigator (React Navigation)         │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │            HomeScreen                    │  │  │  │
│  │  │  │  ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │  │        HomeRenderer (FlashList)    │  │  │  │  │
│  │  │  │  │  ┌──────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │    Component Registry        │  │  │  │  │  │
│  │  │  │  │  │  ┌────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │  Dynamic Components   │  │  │  │  │  │  │
│  │  │  │  │  │  │  - BannerHero          │  │  │  │  │  │  │
│  │  │  │  │  │  │  - ProductGrid         │  │  │  │  │  │  │
│  │  │  │  │  │  │  - DynamicCollection    │  │  │  │  │  │  │
│  │  │  │  │  │  │  - FullScreenOverlay    │  │  │  │  │  │  │
│  │  │  │  │  │  └────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └──────────────────────────────┘  │  │  │  │  │
│  │  │  │  └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Action Dispatcher                         │  │
│  │  - ADD_TO_CART → Zustand Store                        │  │
│  │  - DEEP_LINK → Navigation                             │  │
│  │  - APPLY_MYSTERY_GIFT_COUPON → Campaign Logic         │  │
│  │  - SHOW_TOAST → UI Feedback                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Zustand Store (Cart)                      │  │
│  │  - Selector-based subscriptions                       │  │
│  │  - Render isolation                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
src/
├── actions/
│   └── ActionDispatcher.ts       # Universal action handler
├── campaigns/
│   ├── backToSchool.ts           # Back to School campaign config
│   ├── summerPlayhouse.ts        # Summer Playhouse campaign config
│   └── mysteryGift.ts            # Mystery Gift Carnival config
├── components/
│   ├── BannerHero/               # Hero banner component
│   ├── ProductCard/              # Product card with add to cart
│   ├── ProductGrid/              # 2x2 product grid
│   ├── DynamicCollection/        # Horizontal FlashList collection
│   ├── FullScreenOverlay/        # Lottie overlay component
│   ├── CampaignSwitcher/         # Developer campaign switcher
│   └── index.ts                  # Component registration
├── hooks/
│   ├── useCartCount.ts           # Cart count selector
│   └── useAddToCart.ts           # Add to cart action
├── mock/
│   └── homepage.json             # Mock homepage payload
├── navigation/
│   └── AppNavigator.tsx          # React Navigation setup
├── registry/
│   └── ComponentRegistry.ts      # Factory Registry Pattern
├── renderer/
│   └── HomeRenderer.tsx          # Master FlashList renderer
├── screens/
│   ├── HomeScreen.tsx            # Main homepage
│   ├── CategoryScreen.tsx        # Dummy category screen
│   └── ProductScreen.tsx         # Dummy product screen
├── store/
│   └── cartStore.ts              # Zustand cart store with selectors
├── theme/
│   ├── ThemeContext.tsx          # Theme context
│   └── ThemeProvider.tsx         # Theme provider
├── types/
│   └── index.ts                  # TypeScript type definitions
└── utils/
    └── navigationRef.ts          # Global navigation ref
```

## Design Decisions

### Factory Registry Pattern

**Why:** Eliminates switch-case rendering trees and if-else chains, making the codebase scalable and maintainable.

**Implementation:**
```typescript
// Component Registry maps types to components
registry['BANNER_HERO'] = BannerHeroComponent;
registry['PRODUCT_GRID_2X2'] = ProductGridComponent;

// Renderer dynamically resolves components
const Component = getComponent(section.type);
return Component ? <Component data={section.data} /> : null;
```

**Benefits:**
- New components can be added without modifying the renderer
- O(1) component lookup
- Type-safe registration
- Easy to test and maintain

### Theme Engine

**Why:** Enables OTA-style theme updates without app reload, critical for marketing campaigns and A/B testing.

**Implementation:**
- ThemeContext provides theme values to all components
- ThemeProvider manages theme state
- Campaign switcher updates theme instantly
- Components consume theme through context, no hardcoded colors

**Benefits:**
- Runtime theme switching
- Campaign-specific theming
- No app reload required
- Consistent theming across app

### Campaign Engine

**Why:** Demonstrates how to manage multiple marketing campaigns with different themes, overlays, and configurations.

**Implementation:**
- Each campaign has its own configuration (theme, overlay, features)
- Campaign switcher allows instant switching
- Overlays use Lottie animations
- Campaign-specific product collections

**Supported Campaigns:**
1. **Back to School** - Yellow + Blue theme, paper airplane animation
2. **Summer Playhouse** - Ocean blue palette, water splash overlay
3. **Mystery Gift Carnival** - Carnival red, confetti animation

### Action Dispatcher

**Why:** Centralizes all user actions, maintaining separation of concerns between UI and business logic.

**Implementation:**
- Single entry point for all actions
- Components contain NO business logic
- Actions flow through dispatcher to appropriate handlers
- Extensible for new action types

**Supported Actions:**
- `ADD_TO_CART` - Updates Zustand store
- `DEEP_LINK` - Navigates to screens
- `APPLY_MYSTERY_GIFT_COUPON` - Campaign-specific logic
- `SHOW_TOAST` - User feedback

### Performance Optimizations

**Why:** Ensures smooth scrolling and responsive UI even with large product catalogs.

**Optimizations Applied:**

1. **FlashList Virtualization**
   - Single vertical FlashList for homepage
   - Horizontal FlashLists for collections
   - Estimated item sizes for smooth scrolling
   - No nested vertical lists (performance anti-pattern)

2. **React.memo**
   - All components memoized to prevent unnecessary re-renders
   - Stable references for callbacks (useCallback)
   - Memoized values for computations (useMemo)

3. **Selector-based Zustand Subscriptions**
   - Components only subscribe to specific state slices
   - Cart updates don't re-render homepage feed
   - Fine-grained re-render control

4. **Component Registry**
   - O(1) component lookup
   - No conditional rendering logic in renderer

### Render Isolation Strategy

**Why:** Prevents cascading re-renders when state changes, ensuring performance at scale.

**Implementation:**
```typescript
// Selector hooks for fine-grained subscriptions
export const useCartCount = () => useCartStore((state) => state.cartCount);
export const useCartItems = () => useCartStore((state) => state.cartItems);

// Product card only re-renders when its own props change
const ProductCard = memo(({ product }) => { ... });

// Adding to cart updates only:
// - Product card (shows updated state)
// - Cart counter (shows new count)
// Homepage feed remains unaffected
```

**Benefits:**
- Adding to cart doesn't re-render entire homepage
- Theme changes only re-render themed components
- Campaign switching is instant and smooth

### Why Zustand

**Why:** Lightweight, performant state management with built-in selector support.

**Advantages over Redux:**
- Less boilerplate
- Built-in selector support
- No context provider needed
- Better TypeScript support
- Smaller bundle size

**Selector Pattern:**
```typescript
// Components subscribe to specific state slices
const cartCount = useCartStore((state) => state.cartCount);

// Only re-renders when cartCount changes
// Not when cartItems or other state changes
```

### Why FlashList

**Why:** Superior performance over FlatList for large lists with complex items.

**Advantages:**
- Better recycling of off-screen items
- Smoother scrolling with less memory
- Optimized for heterogeneous item sizes
- Better performance with nested lists

**Usage:**
- Single vertical FlashList for homepage
- Horizontal FlashLists for collections
- Estimated item sizes for performance
- Stable key extractors

### How Unknown Components Are Handled

**Why:** Ensures app resilience when backend introduces new component types.

**Implementation:**
```typescript
const Component = getComponent(item.type);

if (!Component) {
  console.warn(`Unknown component type: ${item.type}. This section will be ignored.`);
  return null; // Silently ignore unknown components
}

return <Component data={item.data} />;
```

**Benefits:**
- App doesn't crash on unknown component types
- Logs warning in development for debugging
- Returns null in production (graceful degradation)
- Enables gradual rollout of new components

## How To Run

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Type Checking

```bash
npm run type-check
```

## Future Improvements

1. **API Integration**
   - Replace mock JSON with actual API calls
   - Implement error handling and retry logic
   - Add loading states and skeletons

2. **Analytics**
   - Track component impressions
   - Monitor action performance
   - A/B testing framework

3. **Offline Support**
   - Cache homepage payload
   - Offline-first architecture
   - Sync on reconnection

4. **More Component Types**
   - Video banners
   - Interactive carousels
   - Story-style sections
   - Gamification elements

5. **Advanced Campaigns**
   - Personalized campaigns
   - Time-based campaigns
   - Location-based campaigns
   - User segment targeting

6. **Testing**
   - Unit tests for components
   - Integration tests for renderer
   - E2E tests with Detox
   - Snapshot testing

7. **Performance Monitoring**
   - React DevTools integration
   - Performance profiling
   - Memory leak detection
   - Bundle size optimization

## Screenshots

*(Add screenshots here after running the app)*

- Home Screen with Campaign Switcher
- Back to School Campaign
- Summer Playhouse Campaign
- Mystery Gift Carnival Campaign
- Product Grid and Collections

## Tech Stack

- **React Native (Expo)** - Mobile framework
- **TypeScript** - Type safety (strict mode)
- **Zustand** - State management
- **@shopify/flash-list** - Virtualized lists
- **React Navigation** - Navigation
- **Lottie React Native** - Animations
- **Context API** - Theme management

## License

MIT

## Author

Built as a demonstration of production-grade SDUI architecture for quick commerce applications.
