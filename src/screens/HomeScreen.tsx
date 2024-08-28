import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/EventCard';
import { getEvents } from '../api/api';
import { setEvents, setLoading, setError } from '../store/eventsSlice';
import { RootState } from '../store/store';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state: RootState) => state.events);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        dispatch(setLoading(true));
        try {
            const eventsData = await getEvents();
            dispatch(setEvents(eventsData));
        } catch (error) {
            dispatch(setError('Error fetching events'));
        }
    };

    const handleEventPress = (event) => {
        navigation.navigate('EventDetails', { event });
    };

    if (loading) {
        return <View><Text>Loading...</Text></View>;
    }

    if (error) {
        return <View><Text>{error}</Text></View>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <EventCard event={item} onPress={() => handleEventPress(item)} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default HomeScreen;