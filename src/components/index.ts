/**
 * Component Registration
 * Registers all SDUI components with the registry
 * This file should be imported during app initialization
 */

import { registerComponent } from '../registry/ComponentRegistry';
import BannerHero from './BannerHero';
import ProductGrid from './ProductGrid';
import DynamicCollection from './DynamicCollection';
import FullScreenOverlay from './FullScreenOverlay';

// Register all supported component types
registerComponent('BANNER_HERO', BannerHero);
registerComponent('PRODUCT_GRID_2X2', ProductGrid);
registerComponent('DYNAMIC_COLLECTION', DynamicCollection);
registerComponent('FULL_SCREEN_OVERLAY', FullScreenOverlay);

console.log('All components registered successfully');
