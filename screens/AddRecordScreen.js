import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';

const AddRecordsScreen = ({ navigation }) => {

  const handleCancel = () => {
    navigation.navigate('Records')
  }

  const handleAccounts = () => {
    navigation.navigate('Accounts')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Add Record</Text>
          <Pressable style={styles.addBtn} onPress={handleCancel}>

            <Text style={{fontSize: 12}}>Cancel</Text>

            <Image source={require('../assets/AddIcon.png')} resizeMode='contain' 
            style={{height:25, width: 25}}/>

          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.innerCard}>
            <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>
                <Image source={require('../assets/banks/BDO.png')} style={{height:65,width: 65}} resizeMode='contain'/>
                <Image source={require('../assets/banks/UnionBank.png')} style={{height:65,width: 65}} resizeMode='contain'/>
                <Image source={require('../assets/banks/LandBank.png')} style={{height:65,width: 65}} resizeMode='contain'/>
                <Image source={require('../assets/banks/SecurityBank.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            </View>
            <Pressable style={styles.btn} onPress={()=>{
              navigation.navigate('AccountRecordInput', {type: 'Banco De Oro', data: 
              [{ label: 'Banco De Oro', value: 'Banco De Oro' },
              { label: 'Union Bank', value: 'Union Bank' },
              { label: 'Land Bank', value: 'Land Bank' },
              { label: 'Security Bank', value: 'Security Bank' }]
            })
            }}>
              <Text style={{color: Colors.white}}>Banks</Text>
            </Pressable>
        </View>
        <View style={styles.innerCard}>
          <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>
            <Image source={require('../assets/Socials/Facebook.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            <Image source={require('../assets/Socials/Insta.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            <Image source={require('../assets/Socials/Gmail.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            <Image source={require('../assets/Socials/Twitter.png')} style={{height:65,width: 65}} resizeMode='contain'/>
          </View>
          <Pressable style={styles.btn}onPress={()=>{
              navigation.navigate('AccountRecordInput', {type: 'Facebook', data: 
              [{ label: 'Facebook', value: 'Facebook' },
              { label: 'Instagram', value: 'Instagram' },
              { label: 'Gmail', value: 'Gmail' },
              { label: 'Twitter', value: 'Twitter' }]
            })
            }}>
              <Text style={{color: Colors.white}}>Accounts</Text>
            </Pressable>
        </View>
        <View style={styles.innerCard}>
          <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>
            <Image source={require('../assets/Others/Gcash.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            <Image source={require('../assets/Others/Maya.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            <Image source={require('../assets/Others/Pagibig.png')} style={{height:65,width: 65}} resizeMode='contain'/>
            <Image source={require('../assets/Others/PhilHealth.png')} style={{height:65,width: 65}} resizeMode='contain'/>
          </View>
            <Pressable style={styles.btn}onPress={()=>{
              navigation.navigate('AccountRecordInput', {type: 'Gcash', data: 
              [{ label: 'Gcash', value: 'Gcash' },
              { label: 'Maya', value: 'Maya' },
              { label: 'Pagibig', value: 'Pagibig' },
              { label: 'PhilHealth', value: 'PhilHealth' }]})
            }}>
              <Text style={{color: Colors.white}}>Others</Text>
            </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    gap: 10
  },
  innerCard: {
    backgroundColor: '#EDEDED',
    borderRadius: 15,
    padding: 5,
  },
  btn:{
    backgroundColor: Colors.dark_brown,
    padding: 12,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    width: '90%',
    marginBottom: 15
  },
  row:{
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  card: {
    backgroundColor: Colors.card_container,
    borderRadius: 20,
    height: '65%',
    width: '90%',
    alignSelf: 'center',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    marginBottom: 20,
    gap: 15,
    flex: 1
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
    marginBottom: 10
  },
  headerText: {
    alignSelf: 'flex-end',
    fontSize: 25,
  },
});

export default AddRecordsScreen;