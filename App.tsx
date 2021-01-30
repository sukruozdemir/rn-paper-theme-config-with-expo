import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation';
import { restoreThemeState } from './src/utils/restore-state';
import { ThemeName } from './types';

enableScreens();

export default function App() {
  const [isAppReady, setIsAppReady] = React.useState<boolean>(false);
  const [restoredThemeName, setRestoredThemeName] = React.useState<ThemeName>('light');

  React.useEffect(() => {
    const restore = async () => {
      try {
        // Restore state from AsyncStorage with helper methods
        const themeName: ThemeName = await restoreThemeState();

        setRestoredThemeName(themeName);
      } catch (e) {
        // TODO: Handle error
      } finally {
        setIsAppReady(true);
      }
    };

    restore();
  });

  // Don't render until app is ready to go
  if (!isAppReady) return null;

  return (
    <ThemeProvider theme={restoredThemeName}>
      <Navigation />
    </ThemeProvider>
  );
}
