import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { ThemeContext } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';

export default function Navigation() {
  const themeContext = React.useContext(ThemeContext);

  return (
    <NavigationContainer theme={themeContext?.theme}>
      <RootNavigator />
      <StatusBar style={themeContext?.isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
