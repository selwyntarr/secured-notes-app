import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';

const SettingsScreen = ({ navigation }) => {

  const handleAddRecord = () => {
    console.log('Logout')
    navigation.replace('Auth')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Settings</Text>
          <Pressable style={styles.addBtn} onPress={handleAddRecord}>

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

      <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
        <Text style={{fontSize: 30, fontWeight:'bold'}}>John Doe</Text>
        <Image source={require('../assets/Edit.png')} resizeMode='contain'
        style={{height: 30, width: 30, alignSelf: 'center'}}/>
      </View>

      <View style={styles.card}>
        <View style ={styles.row}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Account Settings</Text>
        </View>

        <View style ={styles.row}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Preferences</Text>
        </View>

        <View style ={styles.row}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>About</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    gap: 10
  },
  row: {
    backgroundColor: '#E9E9E9',
    padding: 13,
    borderRadius: 15
  },
  card: {
    backgroundColor: Colors.card_container,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '65%',
    width: '90%',
    alignSelf: 'center',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    flex: 1,
    gap: 10
  },
  user_icon: {
    height: '20%',
    alignSelf: "center"
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
});

export default SettingsScreen;
