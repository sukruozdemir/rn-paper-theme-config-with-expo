export type ThemeName = 'light' | 'dark';

export type ThemeContextProps = {
  children: React.ReactNode;
  theme: ThemeName;
};

export type ThemeContextType = {
  isDark: boolean;
  theme: ReactNativePaper.Theme | undefined;
  setTheme: () => void;
};
