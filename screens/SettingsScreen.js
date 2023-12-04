import React from 'react';
import {TextInput, Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';
import { useState } from 'react';

const SettingsScreen = ({ navigation }) => {

  const [fullname, setFullname] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [username, setUsername] = useState('johndoe');
  const [password, setPassword] = useState('securepassword');
  const [confirmpassword, setConfirmPassword] = useState('securepassword');

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
    setconfirmVisible(!confirmVisible)
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Search</Text>
          <Pressable style={styles.addBtn} onPress={handleLogout}>

            <Text style={{fontSize: 12}}>Logout</Text>

            <Image source={require('../assets/AddIcon.png')} resizeMode='contain' 
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
            <TextInput value = {fullname} placeholder="Full Name" multiline={false} style={styles.input}/>
          </View>

          <View style={styles.input_box}>
            <TextInput value = {email} placeholder="Email" multiline={false} style={styles.input}/>
          </View>

          <View style={styles.input_box}>
            <TextInput value = {username} placeholder="Username" multiline={false} style={styles.input}/>
          </View>

          <View style={{... styles.input_box, flexDirection: 'row', 
                            justifyContent: 'space-between', gap: 10}}>
            <TextInput value = {password} placeholder="Password" secureTextEntry={!isPasswordVisible} 
              multiline={false} style={{...styles.input, flex: 1}}/>
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
            <TextInput value = {confirmpassword} placeholder="Confirm Password" secureTextEntry={!isPasswordVisible2} 
              multiline={false} style={{...styles.input, flex: 1}}/>
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
