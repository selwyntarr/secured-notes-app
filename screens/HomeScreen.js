import React, { useState} from 'react';
import {SectionList, Image, View, Text, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import Colors from '../components/Colors';
import { useFocusEffect } from '@react-navigation/native'; 
import { db, iconFiles } from '../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { getDocs, query, collection, where, limit, orderBy } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {

  const userId = '5nbfM3FhXABp5jJgo5oo';

  const [accountListRecent, setAccountListRecent] = useState([]);
  const [accountListFav, setAccountListFav] = useState([]);
  const [sectionItem, setSectionItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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

      const fetchData = async () => {
      try {

        // Generate Recent List

        const q_recent = query(collection(db, 'accounts'), where('user-id', '==', userId), orderBy("date_added", "desc"), limit(3));
        const querysnapshot_recent = await getDocs(q_recent)
        
        const imageUrls_recent = await Promise.all(
          querysnapshot_recent.docs.map(async (doc) => {
            const path = doc.data().icon;
            try {
              return await loadIcons(path);
            } catch (error) {
              console.error(`Error loading image for ${path}:`, error);
              return null; // or handle the error in a different way
            }
          })
        );
        
        const q1_recent = query(collection(db, 'accounts'), where('user-id', '==', userId), orderBy("date_added", "desc"), limit(3));
        const querysnapshot1_recent = await getDocs(q1_recent);
        
        const accs_recent = querysnapshot1_recent.docs.map((doc, index) => ({
          id: doc.id,
          cred:  doc.data().credentials[0].value,
          title: doc.data().name,
          image: imageUrls_recent[index]
          }));
          
        console.log(accs_recent)

        setAccountListRecent(accs_recent);

        // Generate Favorite List

        const q = query(collection(db, 'accounts'), where('user-id', '==', userId), where('is-favorite', '==', true), limit(3));
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
        
        const q1 = query(collection(db, 'accounts'), where('user-id', '==', userId), where('is-favorite', '==', true), limit(3));
        const querysnapshot1 = await getDocs(q1);

        const accs = querysnapshot1.docs.map((doc, index) => ({
          id: doc.id,
          cred:  doc.data().credentials[0].value,
          title: doc.data().name,
          image: imageUrls[index]
          }));

        console.log(accs)

        setAccountListFav(accs);
            
      } catch (error) {
          console.error('Error fetching data:', error);
      }
      };

      fetchData();

      console.log(sectionItem)

    }, [])
  );

  setTimeout(() => {
    if ( !Object.is(accountListFav, null) && !Object.is(accountListRecent, null) ) {
      setSectionItem(
        [
          {
            id: 'Favorite',
            data: accountListFav
          },
          {
            id: 'Recently Added',
            data: accountListRecent
          }
        ]
      );
      setIsLoading(false);
    }
  }, 10000);

  const handleAddRecord = () => {
    console.log('Add Record')
  }

  const renderSectionHeader = ({ section: { id } }) => (
    <Text style={styles.textDivider}>{id}</Text>
  );

  const handleRefresh = () => {
    console.log('Refresh');
    // Refresh logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headerText}>Home</Text>
          <Pressable style={styles.addBtn} onPress={handleRefresh}>
            <Text style={{ fontSize: 12 }}>Refresh</Text>
            <Image
              source={require('../assets/refresh.png')}
              resizeMode='contain'
              style={{ height: 25, width: 25 }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.card}>
      {isLoading ? (
        <Text style={{ textAlign: 'center' }}>Loading</Text>
              ) : (
        <SectionList
          sections={sectionItem}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index, section}) => {
            return (
              <Pressable style={styles.rowItems} onPress={()=>{
                navigation.navigate('AccountsRecord', {id:item.id})
              }}>
                <Image source={{ uri: item.image }} style={{ height: 40, width: 40 }} resizeMode='contain' />
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ fontSize: 10 }}>{item.cred}</Text>
                </View>
              </Pressable>
            );
          }}
          renderSectionHeader={renderSectionHeader}
        />
        )}
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
    marginBottom: 20,
    marginTop: 10
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
    gap: 20
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
