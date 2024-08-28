import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
    latitude: 37.7749, // San Francisco coordinates
    longitude: -122.4194,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

function ExploreScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={INITIAL_POSITION}
            >
                <Marker
                    coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
                    title="San Francisco"
                    description="City Center"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default ExploreScreen;