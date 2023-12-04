import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Screens from "../screens/Screens.js";

const Stack = createStackNavigator()

const RecordStack = () => {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Records' component={Screens.RecordScreen}/> 
        <Stack.Screen name='Accounts' component={Screens.AccountScreen}/> 
        <Stack.Screen name='AddRecord' component={Screens.AddRecordsScreen} />
        <Stack.Screen name='AccountRecord' component={Screens.AccountRecordScreen} />
        <Stack.Screen name='AccountRecordInput' component={Screens.AccountRecordInputScreen} />
    </Stack.Navigator>
    )
};

export default RecordStack;