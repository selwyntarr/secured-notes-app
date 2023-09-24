import { useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OpenSans from './globals/fonts';
import Header from './globals/components/Header';

import { AntDesign } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import * as colors from './globals/colorPalette';

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

  const Tab = createBottomTabNavigator();

  const HomeScreen = ({navigation}) => {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Header label={'Home'} />
        <Text style={styles.center_text}>Home</Text>
      </View>
    )
  }

  const ProfileScreen = ({navigation, route}) => {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Header label={'Records'}/>
        <Text style={styles.center_text}>Profile</Text>
      </View>
    )
  }

  const SearchScreen = ({navigation, route}) => {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Header label={'Search'}/>
        <Text style={styles.center_text}>Search</Text>
      </View>
    )
  }

  const SettingScreen = ({navigation, route}) => {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Header label={'Settings'}/>
        <Text style={styles.center_text}>Settings</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home'; // Change icons here
            } else if (route.name === 'Records') {
              iconName = focused ? 'profile' : 'profile'; // Change icons here
            } else if (route.name === 'Search') {
              iconName = focused ? 'search1' : 'search1'; // Change icons here
            } else if (route.name === 'Settings') {
              iconName = focused ? 'setting' : 'setting'; // Change icons here
            }

            // You can use other icon sets and libraries as well
            return <AntDesign name={iconName} size={size} color={colors.brown} />;
          },
          tabBarActiveTintColor: colors.beigeLight,
          tabBarStyle: {
            height: '10%',
          },
          tabBarIconStyle: {
            padding: 0,
            margin: 0,
          },
          tabBarLabelStyle: {
            color: colors.brown,
            fontFamily: 'OpenSans-Regular',
            fontSize: '3vw',
            fontWeight: 600,
          }
        })}
        >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Records" component={ProfileScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'OpenSans-Regular',
  },
  center_text: {
    textAlign: 'center',
  }
});
