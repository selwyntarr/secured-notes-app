import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, } from 'react-native';
import { View, SafeAreaView, Text, Image } from "react-native";
import Colors from '../components/Colors.js';
import { db } from "../firebaseConfig.js";
import { addDoc, collection } from 'firebase/firestore';

const RegisterScreen = ({navigation}) => {

  const [inputName, setInputName] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('')
  const [inputConfirmPassword, setInputConfirmPassword] = useState('')

  const handleChange = ({input, type}) => {
    if (type === 'name'){
      setInputName(input)
    } else if (type === 'username'){
      setInputUsername(input)
    } else if (type === 'email'){
      setInputEmail(input)
    } else if (type === 'password'){
      setInputPassword(input)
    } else if (type === 'confirm-password'){
      setInputConfirmPassword(input)
    }
  }

  const handleRegister = () => {
    try {
      if (inputName.trim() === '' || 
          inputUsername.trim() === '' || 
          inputEmail.trim() === '' || 
          inputPassword.trim() === '' ||
          inputConfirmPassword.trim() === '') {

        console.log('Error: Empty Fields');
        return;

      }

      if (inputPassword.trim() !== inputConfirmPassword.trim() ) {

        console.log("Error: Password Mismatch");
        return;

      } 

      const userRef = collection(db, 'users');

      // Set the user data in the document
      addDoc(userRef, {
        "name": inputName,
        "username": inputUsername,
        "email": inputEmail,
        "password": inputPassword
      });

      console.log("Success: Created New Account")
      navigation.replace('Login');

    } catch (error) {
      
      console.log('Error:', error.message)
    
    }
  }

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
            <TextInput 
              placeholder="Full Name" 
              multiline={false} 
              style={styles.input}
              value={inputName}
              onChangeText={(text) => handleChange({input: text, type: 'name'})}/>
          </View>

          <View style={styles.input_box}>
            <TextInput 
              placeholder="Username"
              multiline={false} 
              style={styles.input}
              value={inputUsername}
              onChangeText={(text) => handleChange({input: text, type: 'username'})}/>
          </View>

          <View style={styles.input_box}>
            <TextInput 
              placeholder="Email"
              multiline={false} 
              style={styles.input}
              value={inputEmail}
              onChangeText={(text) => handleChange({input: text, type: 'email'})}/>
          </View>

          <View style={styles.input_box}>
            <TextInput 
              placeholder="Password"
              multiline={false} 
              style={styles.input}
              secureTextEntry
              value={inputPassword}
              onChangeText={(text) => handleChange({input: text, type: 'password'})}/>
          </View>

          <View style={styles.input_box}>
            <TextInput 
              placeholder="Confirm Password"
              multiline={false} 
              style={styles.input}
              secureTextEntry
              value={inputConfirmPassword}
              onChangeText={(text) => handleChange({input: text, type: 'confirm-password'})}/>
          </View>

          <View style={{alignItems: "center"}}>
            <Pressable style={styles.btn} onPress={handleRegister}>
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
    padding: 15
  },
  input: {
    textAlign: "center",
  }
});

export default RegisterScreen;