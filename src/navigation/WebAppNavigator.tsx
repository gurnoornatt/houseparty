import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventCreationScreen from '../screens/EventCreationScreen';

function WebAppNavigator() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/explore" component={ExploreScreen} />
                <Route path="/bookings" component={BookingsScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/event/:id" component={EventDetailsScreen} />
                <Route path="/create-event" component={EventCreationScreen} />
            </Switch>
        </Router>
    );
}

export default WebAppNavigator;
