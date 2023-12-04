import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Screens from "../screens/Screens.js";

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Screens.LoginScreen}/> 
        <Stack.Screen name='Register' component={Screens.RegisterScreen} />
    </Stack.Navigator>
    )
};

export default AuthStack;