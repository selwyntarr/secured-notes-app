import React from 'react';
import { FlatList, Image, View, Text, StyleSheet, TextInput, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';

const AccountRecordScreen = ({ route, navigation }) => {
    const data = route.params || 'Default Title';

    const handleFavorite = () =>{
        console.log('add to fave')
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.headerText}>Record</Text>
              <Pressable style={styles.addBtn} onPress={()=>{
                navigation.navigate('Accounts')
              }}>
    
                <Text style={{fontSize: 12}}>Cancel</Text>
    
                <Image source={require('../assets/AddIcon.png')} resizeMode='contain' 
                style={{height:25, width: 25}}/>
    
              </Pressable>
            </View>
          </View>
          <View style={styles.titleBar}>
            <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Account</Text>
          </View>

          <View style={{alignItems: 'center' }}>
            <Image source={data.asset} resizeMode='contain' style={{height: 100, width: 100}}/>
            <View style={{marginBottom: 20, padding: 10, borderRadius: 15, 
                backgroundColor:'#E9E9E9', width: '80%'}}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>{data.title}</Text>
            </View>
          </View>

          <View style={styles.card}>

          <View style={styles.input_box}>
            <Text style={{fontSize:12}}>Username/Email: </Text>
            <TextInput value = {data.cred} placeholder="Username or email" multiline={false} style={styles.input}/>
          </View>

          <View style={styles.input_box}>
            <Text style={{fontSize:12}}>Password: </Text>
            <TextInput value = {data.pass} placeholder="Password" multiline={false} style={styles.input} />
          </View>

            <Pressable style={styles.btn} onPress={handleFavorite}>
              <Text style={{color: Colors.white}}>Add to favorite</Text>
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


export default AccountRecordScreen;