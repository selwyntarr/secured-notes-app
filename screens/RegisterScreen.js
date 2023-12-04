import React from "react";
import { Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { View, SafeAreaView, Text, Image } from "react-native";
import { useState } from "react";
import Colors from '../components/Colors.js'

const RegisterScreen = ({navigation}) => {

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    }

    const [isPasswordVisible2, setPasswordVisible2] = useState(false);

    const togglePasswordVisibility2 = () => {
      setPasswordVisible2(!isPasswordVisible2);
    }

    const handleRegister = () => {
      navigation.navigate('Login')
    };    

  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.headerText}>Register</Text>
        </View>

        <View style={styles.user_icon}>
          <Image source={require('../assets/Display-Picture.png')} resizeMode="contain"
            style={{height: '100%'}}/>
        </View>

        <View style={styles.card}>

          <View style={styles.input_box}>
            <TextInput placeholder="Full Name" multiline={false} style={styles.input}/>
          </View>

          <View style={styles.input_box}>
            <TextInput placeholder="Email" multiline={false} style={styles.input}/>
          </View>

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

          <View style={{... styles.input_box, flexDirection: 'row', 
                            justifyContent: 'space-between', gap: 10}}>
            <TextInput placeholder="Confirm Password" secureTextEntry={!isPasswordVisible2} 
              multiline={false} style={{...styles.input, flex: 1}}/>
            <TouchableOpacity
              onPress={togglePasswordVisibility2}
            >
              <Image source={isPasswordVisible2 ? require('../assets/not_visible.png') : require('../assets/visible.png')}
              style={{height: 25, width: 25}} resizeMode="contain"/>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: "center"}}>
            <Pressable style={styles.btn}>
              <Text style={{color: Colors.white}}>Register</Text>
            </Pressable>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text>Have an account? </Text>
              <Pressable onPress={handleRegister}>
                <Text style={{color: 'blue'}}>Login here.</Text>
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
    padding: 10
  },
  input: {
    textAlign: "center",
  }
});

export default RegisterScreen;