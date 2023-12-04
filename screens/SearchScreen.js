import React from 'react';
import { FlatList, Image, View, Text, StyleSheet, SafeAreaView, Pressable, TextInput } from 'react-native';
import Colors from '../components/Colors';

const SearchScreen = ({ navigation }) => {

  const handleAddRecord = () => {
    console.log('Add Record')
  }

  const data = [
    { id: '1', cred: "5434 5345 2312 4124",pass: '123123', title: 'Banco De Oro', asset: require('../assets/BDO.png') },
    { id: '2', cred: "John.Doe@gmail.com",pass: '123123', title: 'Gmail', asset: require('../assets/gmail.png') },
    { id: '3', cred: "John.Doe@facebook.com",pass: '123123', title: 'Facebook', asset: require('../assets/Facebook.png') },
  ];

  const renderItem = ({ item }) => (
    <Pressable style={styles.rowItems} onPress={()=>{
      navigation.navigate('AccountsRecord', item)
    }}>
      <Image source={item.asset} style={{height: 40, width: 40}} resizeMode='contain'/>
      <View>
        <Text style = {{fontWeight: 'bold'}}>{item.title}</Text>
        <Text style = {{fontSize: 10}}>{item.cred}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Search</Text>
          <Pressable style={styles.addBtn} onPress={handleAddRecord}>

            <Text style={{fontSize: 12}}>Add Record</Text>

            <Image source={require('../assets/AddIcon.png')} resizeMode='contain' 
            style={{height:25, width: 25}}/>

          </Pressable>
        </View>
      </View>
      <View style={styles.searchBar}>
        <TextInput placeholder='Search' style={styles.inputBox}/>
      </View>
      <View style={styles.card}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    gap: 20
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
  searchBar: {
    backgroundColor: Colors.khaki_30,
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 20
  },
  inputBox: {
    backgroundColor: '#E9E9E9',
    padding:10,
    borderRadius: 15,
    paddingStart: 15
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
  },
  headerText: {
    alignSelf: 'flex-end',
    fontSize: 25,
  },
});

export default SearchScreen;
