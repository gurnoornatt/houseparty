// src/screens/EventDetailsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getEventDetails, createBooking } from '../api/api';

function EventDetailsScreen() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const route = useRoute();
    const { eventId } = route.params;

    useEffect(() => {
        fetchEventDetails();
    }, []);

    const fetchEventDetails = async () => {
        try {
            const eventData = await getEventDetails(eventId);
            setEvent(eventData);
        } catch (error) {
            console.error('Error fetching event details:', error);
            Alert.alert('Error', 'Failed to load event details');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        try {
            setBooking(true);
            await createBooking(eventId);
            Alert.alert('Success', 'Event booked successfully!');
        } catch (error) {
            console.error('Error booking event:', error);
            Alert.alert('Error', 'Failed to book event');
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{new Date(event.date).toLocaleDateString()}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text style={styles.price}>Price: ${event.price}</Text>
            <Button
                title={booking ? "Booking..." : "Book Now"}
                onPress={handleBooking}
                disabled={booking}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default EventDetailsScreen;
