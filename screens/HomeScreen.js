import React from 'react';
import {ScrollView, Image, View, Text, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';

const HomeScreen = ({ navigation }) => {

  const data = [
    { id: '1', cred: "5434 5345 2312 4124" , title: 'Banco De Oro', asset: require('../assets/BDO.png') },
    { id: '2', cred: "John.Doe@gmail.com" , title: 'Gmail', asset: require('../assets/gmail.png') },
    { id: '3', cred: "John.Doe@facebook.com" , title: 'Facebook', asset: require('../assets/Facebook.png') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.rowItems}>
      <Image source={item.asset} style={{height: 40, width: 40}} resizeMode='contain'/>
      <View>
        <Text style = {{fontWeight: 'bold'}}>{item.title}</Text>
        <Text style = {{fontSize: 10}}>{item.cred}</Text>
      </View>
    </View>
  );

  const handleRefresh = () => {
    console.log('Refresh')
    //Refresh logic
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>Home</Text>
          <Pressable style={styles.addBtn} onPress={handleRefresh}>
            <Text style={{fontSize: 12}}>Refresh</Text>
            <Image source={require('../assets/refresh.png')} resizeMode='contain' 
            style={{height:25, width: 25}}/>
          </Pressable>
        </View>
      </View>
      <Text style={styles.textDivider}>Favorites</Text>
      <View style={styles.card}>
        <View style={styles.flatListFrame}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Text style={styles.textDivider}>Recently Added</Text>
      <View style={styles.card}>
          <View style={styles.flatListFrame}>
            <FlatList style={{borderRadius: 15}}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10
  },
  flatListFrame: {
    backgroundColor: 'rgba(237,237,237,.5)',
    flex: 1,
    borderRadius: 15
  },
  textDivider: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row:{
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
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


export default HomeScreen;
