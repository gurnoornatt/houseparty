import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard';

const DUMMY_EVENTS = [
    { id: '1', title: 'Rooftop Party', date: '2023-06-15', price: 25 },
    { id: '2', title: 'House Music Night', date: '2023-06-16', price: 30 },
    // Add more dummy events...
];

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Discover Events in San Francisco</Text>
            <FlatList
                data={DUMMY_EVENTS}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
                        testID="event-card"
                    />
                )}
                keyExtractor={(item) => item.id}
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
        marginBottom: 16,
    },
});

export default HomeScreen;