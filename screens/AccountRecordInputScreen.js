import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../components/Colors';

const AccountRecordInputScreen = ({route, navigation }) => {

  const data = route.params.data

  const [selectedBank, setSelectedBank] = useState(route.params.type);

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

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  }

  const bankImage = determineBankImage(selectedBank);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headerText}>Record</Text>
          <Pressable style={styles.addBtn} onPress={() => { navigation.navigate('AddRecord') }}>
            <Text style={{ fontSize: 12 }}>Cancel</Text>
            <Image source={require('../assets/Cancel.png')} resizeMode='contain' style={{ height: 25, width: 25 }} />
          </Pressable>
        </View>
      </View>
      <View style={styles.titleBar}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Account</Text>
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
            placeholder="Select Bank"
            value={route.params.type}
            onChange={(item) => {
              setSelectedBank(item.value);
            }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.input_box}>
          <Text style={{ fontSize: 12 }}>Username/Email: </Text>
          <TextInput placeholder="Username or email" multiline={false} style={styles.input} />
        </View>

        <View style={{... styles.input_box, flexDirection: 'row', 
                            justifyContent: 'space-between', gap: 10}}>
            <TextInput placeholder="Confirm Password" secureTextEntry={!isPasswordVisible} 
              multiline={false} style={{...styles.input, flex: 1}}/>
            <TouchableOpacity
              onPress={togglePasswordVisibility}
            >
              <Image source={isPasswordVisible ? require('../assets/not_visible.png') : require('../assets/visible.png')}
              style={{height: 25, width: 25}} resizeMode="contain"/>
            </TouchableOpacity>
          </View>

        <Pressable style={styles.btn}>
          <Text style={{ color: Colors.white }}>Add Record</Text>
        </Pressable>
      </View>
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