import { StyleSheet, Text, View } from 'react-native'
import { color } from 'react-native-elements/dist/helpers';

export default function Header(){
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container:{
        height: '10%',
        backgroundColor: '#fff1ce50',
    },
});