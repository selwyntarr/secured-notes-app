import React from 'react';
import {TextInput, Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebaseConfig'; 
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native'; 

const SettingsScreen = ({ navigation }) => {

  const userId = '5nbfM3FhXABp5jJgo5oo';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = ({input,type}) => {
    if (type === 'name'){
      setName(input)
    } else if (type === 'email'){
      setEmail(input)
    } else if (type === 'username'){
      setUsername(input)
    } else if (type === 'password'){
      setPassword(input)
    } else if (type === 'confirm-password'){
      setConfirmPassword(input)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          // Your asynchronous code goes here
          // const user = await AsyncStorage.getItem('user-session');
          // const userData = JSON.parse(user);

          const user = doc(db, 'users', userId)
          const userQ = await getDoc(user)
          const userData = userQ.data()

          if (userData !== null){
            if ( name === '' || email === '' || username === '' || password === '' || confirmPassword === '') {
              setName(userData.name)
              setEmail(userData.email)
              setUsername(userData.username)
              setPassword(userData.password)
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();

    }, [])
  );

  const handleLogout = () => {
    navigation.replace('Auth')
  }
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  }
  const [isPasswordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!isPasswordVisible2);
  }
  
  const [confirmVisible, setconfirmVisible] = useState(false);

  const handleEdit = () => {
    if (confirmVisible === true && password === confirmPassword){
      const user = doc(db, 'users', userId)
      setDoc(user, {
        "name": name,
        "email": email,
        "username": username,
        "password": password
      })
    }
    setconfirmVisible(!confirmVisible)
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Settings</Text>
          <Pressable style={styles.addBtn} onPress={handleLogout}>

            <Text style={{fontSize: 12}}>Logout</Text>

            <Image source={require('../assets/turnoff.png')} resizeMode='contain' 
            style={{height:25, width: 25}}/>

          </Pressable>
        </View>
      </View>

        <View style={styles.user_icon}>
          <Image source={require('../assets/Display-Picture.png')} resizeMode="contain"
            style={{height: '100%'}}/>
        </View>

        <View style={styles.card}>

          <View style={styles.input_box}>
            <TextInput value = {name} placeholder="Full Name" multiline={false} style={styles.input} onChangeText={(text) => handleChange({input: text, type: 'name'})}/>
          </View>

          <View style={styles.input_box}>
            <TextInput value = {email} placeholder="Email" multiline={false} style={styles.input} onChangeText={(text) => handleChange({input: text, type: 'email'})}/>
          </View>

          <View style={styles.input_box}>
            <TextInput value = {username} placeholder="Username" multiline={false} style={styles.input} onChangeText={(text) => handleChange({input: text, type: 'username'})}/>
          </View>

          <View style={{... styles.input_box, flexDirection: 'row', 
                            justifyContent: 'space-between', gap: 10}}>
            <TextInput value = {password} placeholder="Password" secureTextEntry={!isPasswordVisible} 
              multiline={false} style={{...styles.input, flex: 1}} onChangeText={(text) => handleChange({input: text, type: 'password'})}/>
            <TouchableOpacity
              onPress={togglePasswordVisibility}
            >
              <Image source={isPasswordVisible ? require('../assets/not_visible.png') : require('../assets/visible.png')}
              style={{height: 25, width: 25}} resizeMode="contain"/>
            </TouchableOpacity>
          </View>

          <View style={{... styles.input_box, flexDirection: 'row', 
                            justifyContent: 'space-between', gap: 10, 
                            display: confirmVisible? null : 'none'}}>
            <TextInput value = {confirmPassword} placeholder="Confirm Password" secureTextEntry={!isPasswordVisible2} 
              multiline={false} style={{...styles.input, flex: 1}} onChangeText={(text) => handleChange({input: text, type: 'confirm-password'})}/>
            <TouchableOpacity
              onPress={togglePasswordVisibility2}
            >
              <Image source={isPasswordVisible2 ? require('../assets/not_visible.png') : require('../assets/visible.png')}
              style={{height: 25, width: 25}} resizeMode="contain"/>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: "center"}}>
            <Pressable style={styles.btn} onPress={handleEdit}>
              <Text style={{color: Colors.white}}>{confirmVisible? 'Save Info' : 'Edit Info'}</Text>
            </Pressable>
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
  addBtn:{
    backgroundColor: '#E9E9E9',
    height: '90%',
    width: '35%',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    alignItems: 'center'
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
    alignSelf: 'flex-end',
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
    gap: 15
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

export default SettingsScreen;
