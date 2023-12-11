import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, SafeAreaView, Pressable, StyleSheet, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../components/Colors';
import { db } from '../firebaseConfig'; 
import { setDoc, doc, getDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native'; 

const AccountRecordInputScreen = ({route, navigation }) => {

  const userId = '5nbfM3FhXABp5jJgo5oo';

  const addType = route.params.type
  const data = route.params.data

  const [selectedBank, setSelectedBank] = useState(data[0].label);
  const [icon, setIcon] = useState('')

  const determineBankImage = (bankName) => {
    switch (bankName) {
      case 'Banco De Oro':
        return require('../assets/banks/BDO.png');
      case 'Union Bank':
        return require('../assets/banks/UnionBank.png');
      case 'Land Bank':
        return require('../assets/banks/LandBank.png');
      case 'Security Bank':
        return require('../assets/banks/SecurityBank.png');
      case 'Facebook':
        return require('../assets/Socials/Facebook.png');
      case 'Instagram':
        return require('../assets/Socials/Insta.png');
      case 'Gmail':
        return require('../assets/Socials/Gmail.png');
      case 'Twitter':
        return require('../assets/Socials/Twitter.png');
      case 'Gcash':
        return require('../assets/Others/Gcash.png');
      case 'Maya':
        return require('../assets/Others/Maya.png');
      case 'Pagibig':
        return require('../assets/Others/Pagibig.png');
      case 'PhilHealth':
        return require('../assets/Others/PhilHealth.png');
      default:
        return require('../assets/banks/BDO.png');
    }
  };

  const determineBankImageName = (bankName) => {
    switch (bankName) {
      case 'Banco De Oro':
        return setIcon('bdo.png')
      case 'Union Bank':
        return setIcon('unionbank.png')
      case 'Land Bank':
        return setIcon('landbank.png')
      case 'Security Bank':
        return setIcon('securitybank.png')
      case 'Facebook':
        return setIcon('facebook.png')
      case 'Instagram':
        return setIcon('instagram.png')
      case 'Gmail':
        return setIcon('gmail.png')
      case 'Twitter':
        return setIcon('twitter.png')
      case 'Gcash':
        return setIcon('gcash.png')
      case 'Maya':
        return setIcon('maya.png')
      case 'Pagibig':
        return setIcon('pagibig.png')
      case 'PhilHealth':
        return setIcon('philhealth.png')
      default:
        return setIcon('bdo.png')
    }
  };

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  }

  const [isPasswordVisible1, setPasswordVisible1] = useState(false);

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!isPasswordVisible1);
  }

  const bankImage = determineBankImage(selectedBank);

  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [cvc, setCvc] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [pinCode, setPinCode] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = ({input, type}) => {
    if ( type === 'acc-num' ) {
      setAccountNumber(input)
    } else if ( type === 'acc-name' ) {
      setAccountName(input)
    } else if ( type === 'cvc' ) {
      setCvc(input)
    } else if ( type === 'exp-date' ) {
      setExpirationDate(input)
    } else if ( type === 'pin-code' ) {
      setPinCode(input)
    } else if ( type === 'username' ) { 
      setUsername(input)
    } else if ( type === 'password' ) {
      setPassword(input)
    }
  } 

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
  };

  const handleAddRecord = () => {
    if ( addType === "Bank" ) {
      const accRef = collection(db, 'accounts');
      
      addDoc(accRef, {
        "credentials": [
          {id: "account-number", value: accountNumber},
          {id: "account-name", value: accountName},
          {id: "expiration-date", value: expirationDate},
          {id: "cvc", value: cvc},
          {id: "pin-code", value: pinCode}
        ],
        "date-added": serverTimestamp(),
        "icon": icon,
        "is-favorite": false,
        "name": selectedBank,
        "type": "bank",
        "user-id": userId
      });

      navigation.goBack()
    } else {
      const accRef = collection(db, 'accounts');
      const recordType = addType === 'Account' ? "account" : "others"
      addDoc(accRef, {
        "credentials": [
          {id: "username-email", value: username},
          {id: "password", value: password},
        ],
        "date-added": serverTimestamp(),
        "icon": icon,
        "is-favorite": false,
        "name": selectedBank,
        "type": recordType,
        "user-id": userId
      });

      
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.headerText}>Record</Text>
            <Pressable style={styles.addBtn} onPress={() => { navigation.navigate('AddRecord') }}>
              <Text style={{ fontSize: 12 }}>Cancel</Text>
              <Image source={require('../assets/Close.png')} resizeMode='contain' style={{ height: 25, width: 25 }} />
            </Pressable>
          </View>
        </View>
        <View style={styles.titleBar}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{addType}</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Image source={bankImage} resizeMode='contain' style={{ height: 100, width: 100 }} />
          <View style={{ marginBottom: 20, padding: 10, borderRadius: 15, backgroundColor: '#E9E9E9', width: '80%' }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder= {addType === 'Bank' ? "Select Bank" : "Select Platform"}
              value={addType}
              onChange={(item) => {
                setSelectedBank(item.value);
                determineBankImageName(item.value);
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          {
            addType === "Bank" ? (
              <View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}>Account Number</Text>
                  <View style={styles.input_box}>
                    <TextInput 
                      value={accountNumber}
                      onChangeText={(text) => {handleChange({input:text, type:'acc-num'})}}
                      multiline={false} 
                      style={styles.input} />
                  </View>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}>Account Name</Text>
                  <View style={styles.input_box}>
                    <TextInput 
                      value={accountName}
                      onChangeText={(text) => {handleChange({input:text, type:'acc-name'})}} 
                      multiline={false} 
                      style={styles.input} />
                  </View>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}>Cvc</Text>
                  <View style={{... styles.input_box, flexDirection: 'row', 
                                    justifyContent: 'space-between', gap: 10}}>
                    <TextInput 
                      value={cvc}
                      onChangeText={(text) => {handleChange({input:text, type:'cvc'})}} 
                      secureTextEntry={!isPasswordVisible} 
                      multiline={false} 
                      style={{...styles.input, flex: 1}}/>
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Image source={isPasswordVisible ? require('../assets/not_visible.png') : require('../assets/visible.png')}
                      style={{height: 25, width: 25}} resizeMode="contain"/>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}>Expiration Date</Text>
                  <View style={styles.input_box}>
                    <TextInput 
                      value={expirationDate}
                      onChangeText={(text) => {handleChange({input:text, type:'exp-date'})}}
                      multiline={false} 
                      style={styles.input} />
                  </View>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}>Pin Code</Text>
                  <View style={{... styles.input_box, flexDirection: 'row', 
                                    justifyContent: 'space-between', gap: 10}}>
                    
                    <TextInput 
                      value={pinCode}
                      onChangeText={(text) => {handleChange({input:text, type:'pin-code'})}}
                      secureTextEntry={!isPasswordVisible1} 
                      multiline={false} style={{...styles.input, flex: 1}}/>
                    <TouchableOpacity onPress={togglePasswordVisibility1}>
                      <Image source={isPasswordVisible1 ? require('../assets/not_visible.png') : require('../assets/visible.png')}
                      style={{height: 25, width: 25}} resizeMode="contain"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}> Username/Email: </Text>
                  <View style={styles.input_box}>
                    <TextInput 
                      value={username}
                      onChangeText={(text) => {handleChange({input:text, type:'username'})}}
                      multiline={false} 
                      style={styles.input} />
                  </View>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, paddingLeft: 12 }}>Password: </Text>
                  <View style={{... styles.input_box, flexDirection: 'row', 
                                    justifyContent: 'space-between', gap: 10}}>
                    
                    <TextInput 
                      value={password}
                      onChangeText={(text) => {handleChange({input:text, type:'password'})}}
                      secureTextEntry={!isPasswordVisible} 
                      multiline={false} style={{...styles.input, flex: 1}}/>
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Image source={isPasswordVisible ? require('../assets/not_visible.png') : require('../assets/visible.png')}
                      style={{height: 25, width: 25}} resizeMode="contain"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          }
          
          <Pressable style={styles.btn} onPress={handleAddRecord}>
            <Text style={{ color: Colors.white }}>Add Record</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
      },
      input_box: {
        backgroundColor: Colors.input_gray,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
      },
      btn:{
        backgroundColor: Colors.dark_brown,
        padding: 12,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
      },
      rowItems: {
        padding: 10, 
        backgroundColor: '#E9E9E9',
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
      },
      titleBar: {
        backgroundColor: Colors.khaki_30,
        width: '90%',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 20,
        marginTop: 20
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
        gap: 20,
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
      input: {
        flex: 1,
        padding: 5
      }
    });


export default AccountRecordInputScreen;