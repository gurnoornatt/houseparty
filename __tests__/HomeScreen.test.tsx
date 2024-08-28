import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

// Mock the navigation prop
const mockNavigation = {
    navigate: jest.fn(),
};

// Mock the EventCard component
jest.mock('../components/EventCard', () => 'EventCard');

describe('HomeScreen', () => {
    it('renders correctly', () => {
        const { getByText, getAllByTestId } = render(<HomeScreen navigation={mockNavigation} />);

        expect(getByText('Discover Events in San Francisco')).toBeTruthy();
        expect(getAllByTestId('event-card')).toHaveLength(2); // Assuming we have 2 dummy events
    });
});
