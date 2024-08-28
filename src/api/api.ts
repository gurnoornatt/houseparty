import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getEvents = async () => {
    try {
        const response = await api.get('/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const createBooking = async (eventId: string, userId: string) => {
    try {
        const response = await api.post('/bookings', { eventId, userId });
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

// Add more API calls as needed

export default api;