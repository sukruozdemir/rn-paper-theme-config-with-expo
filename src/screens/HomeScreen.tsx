import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Switch, Title } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';

function HomeScreen() {
  const [isChanging, setIsChanging] = React.useState<boolean>(false);
  const themeContext = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {isChanging ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Title style={styles.title}>Toggle Theme</Title>
          <Switch
            value={themeContext?.isDark}
            onValueChange={() => {
              setIsChanging(true);
              setTimeout(() => {
                themeContext?.setTheme();
                setIsChanging(false);
              }, 1000);
            }}
          />
        </>
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
  },
});
