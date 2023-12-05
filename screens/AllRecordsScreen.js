import React, { useState } from 'react';
import { FlatList, Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable, TextInput } from 'react-native';
import Colors from '../components/Colors';
import { useFocusEffect } from '@react-navigation/native'; 
import { db, iconFiles } from '../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { getDocs, query, collection, where } from 'firebase/firestore';


const AllRecordsScreen = ({ route, navigation }) => {

  const userId = '5nbfM3FhXABp5jJgo5oo';
  const screenType = route.params.type;

  const [accountList, setAccountList] = useState([]);

  const loadIcons = (path) => {
    return new Promise((resolve, reject) => {
      getDownloadURL(ref(iconFiles, path))
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log(screenType)

      const fetchData = async () => {
      try {
          
          if (screenType !== 'all' && screenType !== 'favorite'){
            
            const q = query(collection(db, 'accounts'), where('user-id', '==', userId), where('type', '==', screenType));
            const querysnapshot = await getDocs(q)
            
            const imageUrls = await Promise.all(
              querysnapshot.docs.map(async (doc) => {
                const path = doc.data().icon;
                try {
                  return await loadIcons(path);
                } catch (error) {
                  console.error(`Error loading image for ${path}:`, error);
                  return null; // or handle the error in a different way
                }
              })
            );

            const q1 = query(collection(db, 'accounts'), where('user-id', '==', userId), where('type', '==', screenType))
            const querysnapshot1 = await getDocs(q1);

            const accs = querysnapshot1.docs.map((doc, index) => ({
              id: doc.id,
              cred:  doc.data().credentials[0].value,
              title: doc.data().name,
              image: imageUrls[index]
              }));

            setAccountList(accs);

          } else if ( screenType === 'all') {

            const q = query(collection(db, 'accounts'), where('user-id', '==', userId));
            const querysnapshot = await getDocs(q)
            
            const imageUrls = await Promise.all(
              querysnapshot.docs.map(async (doc) => {
                const path = doc.data().icon;
                try {
                  return await loadIcons(path);
                } catch (error) {
                  console.error(`Error loading image for ${path}:`, error);
                  return null; // or handle the error in a different way
                }
              })
            );
            
            const q1 = query(collection(db, 'accounts'), where('user-id', '==', userId));
            const querysnapshot1 = await getDocs(q);
            
            const accs = querysnapshot1.docs.map((doc, index) => ({
              id: doc.id,
              cred:  doc.data().credentials[0].value,
              title: doc.data().name,
              image: imageUrls[index]
              }));
            
            setAccountList(accs);

          } else if ( screenType === 'favorite') {

            const q = query(collection(db, 'accounts'), where('user-id', '==', userId), where('is-favorite', '==', true));
            const querysnapshot = await getDocs(q)
            
            const imageUrls = await Promise.all(
              querysnapshot.docs.map(async (doc) => {
                const path = doc.data().icon;
                try {
                  return await loadIcons(path);
                } catch (error) {
                  console.error(`Error loading image for ${path}:`, error);
                  return null; // or handle the error in a different way
                }
              })
            );
            
            const q1 = query(collection(db, 'accounts'), where('user-id', '==', userId), where('is-favorite', '==', true));
            const querysnapshot1 = await getDocs(q);

            const accs = querysnapshot1.docs.map((doc, index) => ({
              id: doc.id,
              cred:  doc.data().credentials[0].value,
              title: doc.data().name,
              image: imageUrls[index]
              }));

            setAccountList(accs);
            
          }

      } catch (error) {
          console.error('Error fetching data:', error);
      }
      };

      fetchData();

    }, [])
  );

  const handleAddRecord = () => {
    console.log('Add Record')
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.rowItems} onPress={()=>{
        navigation.navigate('AccountRecord', {id:item.id})
      }}>
      <Image source={{ uri: item.image }} style={{height: 40, width: 40}} resizeMode='contain'/>
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
          <Text style={styles.headerText}>Accounts</Text>
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
          data={accountList}
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

export default AllRecordsScreen;