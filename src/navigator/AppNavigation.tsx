import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StackNavigatorParamList } from '../../types';
import AddPost from '../screens/AddPost';
import Home from '../screens/Home';
import Login from '../screens/Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function AppNavigation({ isLoggedIn }: { isLoggedIn: boolean }) {
    const Stack = createNativeStackNavigator<StackNavigatorParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ?
                    <Stack.Group>
                        <Stack.Screen name="home" component={BottomTabNav} options={{
                            headerShown: false
                        }} />
                    </Stack.Group>
                    :
                    <Stack.Group>
                        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;

const Tab = createBottomTabNavigator();

function BottomTabNav() {
    return (
        <Tab.Navigator initialRouteName='home' screenOptions={{
            tabBarShowLabel: false
        }}
        >
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="home" color={focused ? "#8F00FF" : "#808080"} size={26} />
                    ),
                    headerShown: false,
                    tabBarInactiveTintColor: "#2515"
                }}
            />
            <Tab.Screen name="addPost" component={AddPost}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="plus-box" color={focused ? "#8F00FF" : "#808080"} size={26} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}