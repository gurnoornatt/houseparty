import React from 'react';
import { render } from '@testing-library/react-native';
import ExploreScreen from '../screens/ExploreScreen';

// Mock react-native-maps
jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props) => {
        return <View testID="map-view" {...props} />;
    };
    const MockMarker = (props) => {
        return <View testID="map-marker" {...props} />;
    };
    return {
        __esModule: true,
        default: MockMapView,
        Marker: MockMarker,
    };
});

describe('ExploreScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<ExploreScreen />);

        expect(getByTestId('map-view')).toBeTruthy();
        expect(getByTestId('map-marker')).toBeTruthy();
    });
});
