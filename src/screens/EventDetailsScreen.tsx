import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { createBooking } from '../api/api';

// Dummy event data (replace with API call later)
const DUMMY_EVENT = {
    id: '1',
    title: 'Rooftop Party',
    date: '2023-06-15',
    time: '8:00 PM',
    price: 25,
    location: 'Skyline Terrace, 123 Main St, San Francisco, CA',
    description: 'Join us for an unforgettable night under the stars with great music, drinks, and views of the city.',
    image: 'https://example.com/event-image.jpg',
};

function EventDetailsScreen({ route, navigation }) {
    const { eventId } = route.params;
    // In a real app, you would fetch the event details using the eventId
    const event = DUMMY_EVENT;

    const handleBooking = async () => {
        try {
            // TODO: Replace 'user123' with actual user ID from authentication
            await createBooking(event.id, 'user123');
            Alert.alert('Success', 'Event booked successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to book event. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{event.date}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text style={styles.price}>Price: ${event.price}</Text>
            <Button title="Book Now" onPress={handleBooking} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 18,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default EventDetailsScreen;
