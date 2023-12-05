import React, { useState } from 'react';
import { FlatList, Image, View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, ScrollView } from 'react-native';
import Colors from '../components/Colors';
import { useFocusEffect } from '@react-navigation/native'; 
import { db, iconFiles } from '../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { getDocs, query, collection, where } from 'firebase/firestore';

const AccountRecordScreen = ({ route, navigation }) => {
    
  const recordId = route.params.id;

  const [account, setAccount] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const toggleIsFavorite = () => {
    setIsFavorite(!isFavorite);
  }

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

  const fetchData = async () => {
    try {

      const q = query(collection(db, 'accounts'), recordId);
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

      const q1 = query(collection(db, 'accounts'), recordId);
      const querysnapshot1 = await getDocs(q1);

      const accs = querysnapshot1.docs.map((doc, index) => ({
        id: doc.id,
        creds: doc.data().credentials,
        title: doc.data().name,
        type: doc.data().type,
        isFavorite: doc.data()['is-favorite'],
        image: imageUrls[index]
      }));

      setAccount(accs[0]);   

      if (isFavorite !== accs[0].isFavorite) {
        toggleIsFavorite();
      }

    } catch (error) {

      console.error('Error fetching data:', error);
      
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      console.log(account)
      if ( !Object.is(account, null) ) {
        setIsLoading(false);
      }
    }, [])
  );
  
  const handleFavorite = () => {
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
          <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>{account.type}</Text>
        </View>
        
        <View style={{alignItems: 'center' }}>
          <Image source={{uri:account.image}} resizeMode='contain' style={{height: 100, width: 100}}/>
          <View style={{marginBottom: 20, padding: 10, borderRadius: 15, 
              backgroundColor:'#E9E9E9', width: '80%'}}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>{account.title}</Text>
          </View>
        </View>
      
        <View style={styles.card}>
          <ScrollView>
            <View>
              {isLoading ? (
                <Text style={{ textAlign: 'center' }}>Loading</Text>
              ) : (
                <View>
                  {account.creds.map((item) => (
                    <View key={account.id}>
                      <Text style={{ fontSize: 12, paddingLeft: 12 }}>{item.label}</Text>
                      <View style={styles.input_box}>
                        <TextInput
                          value={item.value}
                          multiline={false}
                          style={styles.input}
                          editable={false}
                        />
                      </View>

                      <Pressable
                        style={isFavorite === false ? styles.btnLight : styles.btn}
                        onPress={toggleIsFavorite}
                      >
                        <Text
                          style={
                            isFavorite === false
                              ? { color: Colors.dark_brown }
                              : { color: Colors.white }
                          }
                        >
                          {isFavorite === false
                            ? 'Remove to favorite'
                            : 'Add to favorite'}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
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
    btnLight:{
      backgroundColor: '#0000ff00',
      borderColor: Colors.dark_brown,
      borderWidth: 2,
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