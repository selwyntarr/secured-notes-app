import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';

const HomeScreen = ({ navigation }) => {

  const handleAddRecord = () => {
    console.log('Add Record')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Home</Text>
          <Pressable style={styles.addBtn} onPress={handleAddRecord}>

            <Text style={{fontSize: 12}}>Add Record</Text>

            <Image source={require('../assets/AddIcon.png')} resizeMode='contain' 
            style={{height:25, width: 25}}/>

          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
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
  row:{
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
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
    gap: 15
  },
  user_icon: {
    height: '20%',
    alignSelf: "center"
  },
  addBtn:{
    backgroundColor: '#E9E9E9',
    height: '90%',
    width: '45%',
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


export default HomeScreen;
