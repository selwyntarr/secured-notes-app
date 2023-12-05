import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Screens from "../screens/Screens.js";

const Stack = createStackNavigator()

const SearchStack = () => {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Search">
        <Stack.Screen name='Search' component={Screens.SearchScreen}/> 
        <Stack.Screen name='AccountsRecord' component={Screens.AccountRecordScreen} />
    </Stack.Navigator>
    )
};

export default SearchStack;