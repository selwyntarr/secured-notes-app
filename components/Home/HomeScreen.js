import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container} onLayout={handleOnLayout}>
    <Header label={'Home'} />
    <Text style={styles.center_text}>Home</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'OpenSans-Regular',
  },
  center_text: {
    textAlign: 'center',
  }
});
  
export default HomeScreen;