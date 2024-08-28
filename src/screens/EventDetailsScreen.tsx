import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: event.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.date}>{event.date} at {event.time}</Text>
                <Text style={styles.price}>${event.price}</Text>
                <Text style={styles.location}>{event.location}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <TouchableOpacity style={styles.bookButton} onPress={() => console.log('Book event')}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
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
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF5A5F',
        marginBottom: 8,
    },
    location: {
        fontSize: 16,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    bookButton: {
        backgroundColor: '#FF5A5F',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EventDetailsScreen;
