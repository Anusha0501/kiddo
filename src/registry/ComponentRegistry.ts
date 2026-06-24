import { ComponentType } from 'react';
import { Section } from '../types';

/**
 * Component Registry using Factory Registry Pattern
 * Maps section types to their corresponding React components
 * 
 * Key benefits:
 * - No switch-case rendering trees
 * - No if-else chains
 * - Scalable: new components can be registered without modifying renderer
 * - Type-safe: registry is typed against Section types
 * 
 * Resilience: Unknown component types return null instead of crashing
 */

// Registry type definition
type ComponentRegistry = Record<string, ComponentType<{ data: Section['data'] }>>;

// Component registry map
// Components will be registered here after they are created
const registry: ComponentRegistry = {};

/**
 * Register a component for a specific section type
 * Called during component initialization
 */
export const registerComponent = (
  type: string,
  component: ComponentType<{ data: Section['data'] }>
): void => {
  registry[type] = component;
};

/**
 * Get component for a section type
 * Returns undefined for unknown types (resilience pattern)
 */
export const getComponent = (
  type: string
): ComponentType<{ data: Section['data'] }> | undefined => {
  return registry[type];
};

/**
 * Check if a component type is registered
 */
export const hasComponent = (type: string): boolean => {
  return type in registry;
};

/**
 * Get all registered component types
 * Useful for debugging and validation
 */
export const getRegisteredTypes = (): string[] => {
  return Object.keys(registry);
};
