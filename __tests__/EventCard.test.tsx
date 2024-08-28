import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventCard from '../components/EventCard';

describe('EventCard', () => {
    const mockEvent = {
        id: '1',
        title: 'Test Event',
        date: '2023-06-15',
        price: 25,
        image: 'https://example.com/image.jpg',
    };

    const mockOnPress = jest.fn();

    it('renders correctly', () => {
        const { getByText } = render(<EventCard event={mockEvent} onPress={mockOnPress} />);

        expect(getByText('Test Event')).toBeTruthy();
        expect(getByText('2023-06-15')).toBeTruthy();
        expect(getByText('$25')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const { getByText } = render(<EventCard event={mockEvent} onPress={mockOnPress} />);

        fireEvent.press(getByText('Test Event'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
