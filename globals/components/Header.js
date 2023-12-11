import { StyleSheet, Text, View, Pressable} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import * as colors from '../colorPalette.js';

function Header(props){
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{props.label}</Text>
            <Pressable style={styles.addRecordContainer}>
                <Text style={styles.addRecordLabel}>Add Record</Text>
                <AntDesign name={'pluscircle'} size={'6vw'} color={colors.brownLight}/>
            </Pressable>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.beigeLight,
        height: '12%',
        marginHorizontal: '5%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        padding: '5vw',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    heading:{
        flex: 1,
        fontSize: '7vw',
        fontWeight: 800,
        color: colors.brown,
    },
    addRecordContainer:{
        backgroundColor: colors.greyLight,
        borderRadius: '15px',

        padding: '1vw',

        flexDirection: 'row',
        alignItems: 'center',
    },
    addRecordLabel:{
        margin: '1vw',
        fontWeight: 600,
        fontColor: 'colors.brownLight',
    }
});

export default Header;