import React from "react";
import Screens from "../screens/Screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Text } from "react-native";
import RecordStack from "./RecordStack";

const Tab = createBottomTabNavigator()

const AppStack = () => {
    return (
    <Tab.Navigator 
        initialRouteName = 'Home' 
        backBehavior ='history'
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { padding: 10, height: 80},
            tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen name='Home' component={Screens.HomeScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/Home.png')}
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused? 'rgba(161,127,96, 1)': 'rgba(161,127,96, 0.5)',
                            }}
                        />
                        <Text
                        style={{color: focused? 'rgba(0,0,0, 1)': 'rgba(0,0,0, 0.5)', fontSize: 10}}>
                            Home</Text>
                    </View>
                )
            }}
        /> 
        <Tab.Screen name='RecordStack' component={RecordStack}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/Card.png')}
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused? 'rgba(161,127,96, 1)': 'rgba(161,127,96, 0.5)',
                            }}
                        />
                        <Text
                        style={{color: focused? 'rgba(0,0,0, 1)': 'rgba(0,0,0, 0.5)', fontSize: 10}}>
                            Records</Text>
                    </View>
                )
            }}
         />
        <Tab.Screen name= 'Search' component={Screens.SearchScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/Search.png')}
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused? 'rgba(161,127,96, 1)': 'rgba(161,127,96, 0.5)',
                            }}
                        />
                        <Text
                        style={{color: focused? 'rgba(0,0,0, 1)': 'rgba(0,0,0, 0.5)', fontSize: 10}}>
                            Search</Text>
                    </View>
                )
            }}
        />
        <Tab.Screen name= 'Setings' component={Screens.SettingsScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/Settings.png')}
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused? 'rgba(161,127,96, 1)': 'rgba(161,127,96, 0.5)',
                            }}
                        />
                        <Text
                        style={{color: focused? 'rgba(0,0,0, 1)': 'rgba(0,0,0, 0.5)', fontSize: 10}}>
                            Settings</Text>
                    </View>
                )
            }}
        />
    </Tab.Navigator>
    )
};

export default AppStack;