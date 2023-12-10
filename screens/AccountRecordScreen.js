import React, { useState } from 'react';
import { FlatList, Image, View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, ScrollView } from 'react-native';
import Colors from '../components/Colors';
import { useFocusEffect } from '@react-navigation/native'; 
import { db, iconFiles } from '../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { getDocs, query, collection, where, getDoc, doc, updateDoc} from 'firebase/firestore';

kebabToCapital = (kebabString) => {
  return kebabString
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


const AccountRecordScreen = ({ route, navigation }) => {
    
  const recordId = route.params.id;

  const [account, setAccount] = useState({})
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

      const q = doc(db, 'accounts', recordId);
      const querysnapshot = await getDoc(q)

      const imageUrl = await loadIcons(querysnapshot.data().icon);

      const acc = {
        id: querysnapshot.id,
        creds: querysnapshot.data().credentials,
        title: querysnapshot.data().name,
        type: querysnapshot.data().type,
        isFavorite: Boolean(querysnapshot.data()['is-favorite']),
        image: imageUrl
      }

      setIsFavorite(acc.isFavorite)

      setAccount(acc);   

    } catch (error) {

      console.error('Error fetching data:', error);
      
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();

      console.log(account);

      setTimeout(() => {
        if ( !Object.is(account, null) ) {
          setIsLoading(false);
        }
      }, 1000);

    }, [])
  );
  
  const handleFavorite = async (favorite) => {
    const docRef = doc(db, 'accounts', recordId); // Replace 'yourCollection' with the actual collection name
    try {
      await updateDoc(docRef, {
        ['is-favorite']: !favorite,
      });
      toggleIsFavorite();
    } catch (error) {
      console.error('Error updating field:', error);
    }
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
          <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>{kebabToCapital(account.type)}</Text>
        </View>
        
        <View style={{alignItems: 'center' }}>
          <Image source={{ uri: account.image }} resizeMode='contain' style={{height: 100, width: 100}}/>
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
                  {account.creds.map((item, index) => (
                    <View key={index} style={{ paddingTop: 20 }}>
                      <Text style={{ fontSize: 12, paddingLeft: 12 }}>
                        {kebabToCapital(item.id)}
                      </Text>
                      <View style={styles.input_box}>
                        <TextInput
                          value={item.value}
                          multiline={false}
                          style={styles.input} 
                          editable={false}      
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={{paddingTop: 20}}>
              <Pressable
                style={isFavorite === true ? styles.btnLight : styles.btn}
                onPress={() => {handleFavorite(isFavorite)}}
              >
                <Text
                  style={
                    isFavorite === true
                      ? { color: Colors.dark_brown }
                      : { color: Colors.white }
                  }
                >
                  {isFavorite === true
                    ? 'Remove to favorite'
                    : 'Add to favorite'}
                </Text>
              </Pressable>
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