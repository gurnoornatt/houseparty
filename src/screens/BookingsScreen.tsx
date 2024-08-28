import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy data for bookings
const DUMMY_BOOKINGS = [
    { id: '1', eventName: 'Rooftop Party', date: '2023-06-15', status: 'Confirmed' },
    { id: '2', eventName: 'House Music Night', date: '2023-06-16', status: 'Pending' },
    // Add more dummy bookings...
];

function BookingItem({ booking }: { booking: { eventName: string; date: string; status: string } }) {
    return (
        <TouchableOpacity style={styles.bookingItem}>
            <Text style={styles.eventName}>{booking.eventName}</Text>
            <Text style={styles.bookingDate}>{booking.date}</Text>
            <Text style={[styles.bookingStatus, { color: booking.status === 'Confirmed' ? 'green' : 'orange' }]}>
                {booking.status}
            </Text>
        </TouchableOpacity>
    );
}

function BookingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Bookings</Text>
            <FlatList
                data={DUMMY_BOOKINGS}
                renderItem={({ item }) => <BookingItem booking={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    bookingItem: {
        backgroundColor: '#f8f8f8',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookingDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    bookingStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
});

export default BookingsScreen;