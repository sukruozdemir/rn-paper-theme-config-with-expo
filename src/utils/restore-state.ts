import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ThemeName } from '../../types';
import AsyncStorageConstants from '../constants/AsyncStorageConstants';

/**
 * Returns theme name from AsyncStorage. If couldn't found it'll return "light"
 */
export async function restoreThemeState(): Promise<ThemeName> {
  const { getItem: getThemePersistenceKey } = useAsyncStorage(AsyncStorageConstants.THEME_NAME);
  try {
    let themeName = (await getThemePersistenceKey()) as ThemeName;
    if (!themeName) themeName = 'light';

    return Promise.resolve<ThemeName>(themeName);
  } catch (exception) {
    return Promise.resolve<ThemeName>('light');
  }
}
