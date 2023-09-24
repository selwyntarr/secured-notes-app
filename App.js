import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';

import OpenSans from './globals/fonts';
import Header from './globals/components/Header';

import * as SplashScreen from 'expo-splash-screen';


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
      <Header/>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Nav Bar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'OpenSans-Regular',
  }
});
