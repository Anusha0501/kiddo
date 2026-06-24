import { ThemeProvider } from './src/theme/ThemeProvider';
import AppNavigator from './src/navigation/AppNavigator';
import './src/components';

/**
 * App Entry Point
 * 
 * This is the root component of the application.
 * It sets up:
 * - ThemeProvider for runtime theming
 * - Component registration (via import side effect)
 * - Navigation
 * 
 * Component registration happens via the import './src/components' statement,
 * which executes the registration code in src/components/index.ts
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
