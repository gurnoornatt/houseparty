import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventCreationScreen from '../screens/EventCreationScreen';
import WebAppNavigator from './WebAppNavigator';

const Stack = createStackNavigator();

function AppNavigator() {
    if (Platform.OS === 'web') {
        return <WebAppNavigator />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
                <Stack.Screen name="EventCreation" component={EventCreationScreen} options={{ title: 'Create Event' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
