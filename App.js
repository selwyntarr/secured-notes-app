import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OpenSans from './globals/fonts';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = OpenSans();

  const handleOnLayout = useCallback( async () => {
    if (fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    // Fonts are not loaded yet, you can show a loading screen or a placeholder.
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <Text style={styles.changeFont}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeFont:{
    fontFamily: 'OpenSans-Regular',
  }
});
