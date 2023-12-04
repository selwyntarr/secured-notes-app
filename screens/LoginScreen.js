import React from "react";
import { Pressable, StyleSheet, TextInput, } from 'react-native';
import { View, SafeAreaView, Text, Image } from "react-native";
import Colors from '../components/Colors.js'
import * as LocalAuthentication from 'expo-local-authentication';


const LoginScreen = ({navigation}) => {

  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
    }
  };

  const handleBiometric = async () => {
    checkSupportedAuthentication()
    if (fingerprintAvailable === true){
      try { 
        const results = await LocalAuthentication.authenticateAsync();

        if (results.success){
          console.log('Success: Login via fingerprint!')
          navigation.replace('App');
        } else {
          console.log('Error: ', results.success)
        }
      } catch (error) {
        console.log(error.message)
      }
    } 
  }

  const handleLogin = () => {
    navigation.replace('App');
  };   

  const handleRegister = () => {
    navigation.navigate('Register')
  };    

  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.headerText}>Login</Text>
        </View>

        <View style={styles.user_icon}>
          <Image source={require('../assets/Display-Picture.png')} resizeMode="contain"
            style={{height: '100%'}}/>
        </View>

        <View style={styles.card}>
          <View style={styles.input_box}>
            <TextInput placeholder="Username" multiline={false} style={styles.input}/>
          </View>

          <View style={styles.input_box}>
            <TextInput placeholder="Password" multiline={false} style={styles.input}/>
          </View>

          <View>
            <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: "center"}}>Or</Text>
          </View>

          <View style={{height: '28%', alignSelf: "center"}}>
            <Pressable onPress={handleBiometric}>
              <Image source={require('../assets/Fingerprint.png')} resizeMode="contain"
              style={{height: '100%'}}/>
            </Pressable>
          </View>

          <View style={{alignItems: "center"}}>
            <Pressable style={styles.btn} onPress={handleLogin}>
              <Text style={{color: Colors.white}}>Login</Text>
            </Pressable>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text>Need an account? </Text>
              <Pressable onPress={handleRegister}>
                <Text style={{color: 'blue'}}>Signup instead.</Text>
              </Pressable>
            </View>
          </View>
          
        
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    gap: 10
  },
  btn:{
    backgroundColor: Colors.dark_brown,
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  header: {
    backgroundColor: Colors.khaki_30,
    height: '15%',
    width: '90%',
    alignSelf: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'flex-end',
    padding: 25,
    paddingBottom: 20,
  },
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 25,
  },
  card: {
    backgroundColor: Colors.card_container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '65%',
    width: '90%',
    alignSelf: 'center',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    flex: 1,
    gap: 20
  },
  user_icon: {
    height: '20%',
    alignSelf: "center"
  },
  input_box: {
    backgroundColor: Colors.input_gray,
    borderRadius: 20,
    padding: 15
  },
  input: {
    textAlign: "center",
  }
});

export default LoginScreen;