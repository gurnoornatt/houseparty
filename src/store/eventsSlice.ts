import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    price: number;
}

interface EventsState {
    events: Event[];
    loading: boolean;
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    loading: false,
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setEvents, setLoading, setError } = eventsSlice.actions;
export default eventsSlice.reducer;