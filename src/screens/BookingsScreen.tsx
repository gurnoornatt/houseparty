// src/screens/BookingsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getUserBookings } from '../api/api';

interface Booking {
    id: string;
    event: {
        id: string;
        title: string;
        date: string;
    };
    status: string;
    createdAt: string;
}

function BookingsScreen() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const fetchedBookings = await getUserBookings();
            setBookings(fetchedBookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Bookings</Text>
            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bookingItem}>
                        <Text style={styles.eventName}>{item.event.title}</Text>
                        <Text style={styles.bookingDate}>Date: {new Date(item.event.date).toLocaleDateString()}</Text>
                        <Text style={styles.bookingStatus}>Status: {item.status}</Text>
                    </View>
                )}
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
