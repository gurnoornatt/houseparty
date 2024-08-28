import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function EventCard({ event, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card} testID="event-card">
            <Image source={{ uri: event.image }} style={styles.image} testID="event-image" />
            <View style={styles.info}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.date}>{event.date}</Text>
                <Text style={styles.price}>${event.price}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    info: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5A5F',
        marginTop: 4,
    },
});

export default EventCard;