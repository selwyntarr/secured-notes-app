import React, {useState,useEffect}from "react";
import { TouchableOpacity, Pressable, Keyboard, StyleSheet, TextInput, } from 'react-native';
import { View, SafeAreaView, Text, Image } from "react-native";
import Colors from '../components/Colors.js'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({navigation}) => {

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    navigation.replace('App');
  };   


  const handleRegister = () => {
    navigation.navigate('Register')
  };    

  return (
    <KeyboardAwareScrollView style={styles.container} scrollEnabled={true}
      contentContainerStyle={{flexGrow: 1}} extraHeight={150} enableOnAndroid={true}>
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

          <View style={{... styles.input_box, flexDirection: 'row', 
                            justifyContent: 'space-between', gap: 10}}>
            <TextInput placeholder="Password" secureTextEntry={!isPasswordVisible} 
              multiline={false} style={{...styles.input, flex: 1}}/>
            <TouchableOpacity
              onPress={togglePasswordVisibility}
            >
              <Image source={isPasswordVisible ? require('../assets/not_visible.png') : require('../assets/visible.png')}
              style={{height: 25, width: 25}} resizeMode="contain"/>
            </TouchableOpacity>
          </View>

          <View style={{display: isKeyboardOpen?'none' : null }}>
            <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: "center"}}>Or</Text>
          </View>

          <View style={{height: 135, alignSelf: "center", display: isKeyboardOpen?'none' : null}}>
            <Image source={require('../assets/Fingerprint.png')} resizeMode="contain"
            style={{height: '100%'}}/>
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

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    height: 100,
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
    width: '90%',
    alignSelf: 'center',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    height: '200%',
    gap: 20
  },
  user_icon: {
    height: 150,
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