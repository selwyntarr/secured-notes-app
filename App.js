import { useCallback, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OpenSans from './globals/fonts';
import Header from './globals/components/Header';

import { AntDesign } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import * as colors from './globals/colorPalette';

import { db } from './firebaseConfig'
import { doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';


SplashScreen.preventAutoHideAsync();

export default function App() {

  // Temp text input handler
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  function create () {
    addDoc(collection(db, 'users'), {
      username: username,
      password: password,
    }).then(() => {
      console.log('data submitted');
    }).catch((error) => {
      console.log(error)
    })
  };

  async function fetch () {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
  

  const HomeScreen = ({navigation}) => {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Header label={'Home'} />
        <View>
          <TextInput 
            id='usernameField' 
            value={username}
            onChangeText={text => setUsername(text)} 
            style={styles.input} 
            placeholder='Username' 
            placeholderTextColor={'#cccccc'}
          />
          <TextInput 
            id='passwordField' 
            value={password}
            onChangeText={text => setPassword(text)} 
            style={styles.input} 
            placeholder='Password' 
            placeholderTextColor={'#cccccc'}
          />
          <Pressable onPress={create} title='Submit' style={styles.submit_button}>
            <Text style={styles.center_text}>Submit</Text>
          </Pressable>
        </View>
        
        <Text style={styles.center_text}>Home</Text>
      </View>
    )
  }

  const RecordsScreen = ({navigation, route}) => {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Header label={'Records'}/>
        <View>
          <Pressable onPress={fetch} title='GetData' style={styles.fetch_button}>
            <Text style={styles.center_text}>Fetch</Text>
          </Pressable>
        </View>
        <Text style={styles.center_text}>Records</Text>
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
        <Tab.Screen name="Records" component={RecordsScreen} />
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
  },
  submit_button: {
    backgroundColor: colors.brown,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#cce1f2',
    height: '25%',
    width: '100%',
    justifyContent: 'center',
  },
  fetch_button: {
    backgroundColor: colors.brown,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#cce1f2',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
});
