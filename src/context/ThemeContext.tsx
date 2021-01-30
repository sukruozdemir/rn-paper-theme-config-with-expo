import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ThemeContextProps, ThemeContextType } from '../../types';
import AsyncStorageConstants from '../constants/AsyncStorageConstants';
import { CustomDarkTheme, CustomDefaultTheme } from '../theme/custom-theme';

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children, theme }: ThemeContextProps) {
  const { setItem: setStorageThemeName } = useAsyncStorage(AsyncStorageConstants.THEME_NAME);
  const [isDark, setIsDark] = React.useState<boolean>(theme === 'dark');
  const appTheme = isDark ? CustomDarkTheme : CustomDefaultTheme;

  /**
   * Toggles app theme
   *
   * If theme is light it will toggle to dark
   *
   * If theme is dark it will toggle to light
   */
  const toggleTheme = React.useCallback(async () => {
    try {
      await setStorageThemeName(isDark === true ? 'light' : 'dark');
      setIsDark(!isDark);
    } catch (ex) {
      setIsDark(false);
    }
  }, [isDark]);

  /**
   * Theme preferences
   */
  const preferences = React.useMemo(
    () => ({
      setTheme: toggleTheme,
      isDark,
      theme: appTheme,
    }),
    [toggleTheme, isDark, appTheme],
  );

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={appTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
