import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Screens from "../screens/Screens.js";

const Stack = createStackNavigator()

const HomeStack = () => {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Screens.HomeScreen}/> 
        <Stack.Screen name='AccountsRecord' component={Screens.AccountRecordScreen} />
    </Stack.Navigator>
    )
};

export default HomeStack;