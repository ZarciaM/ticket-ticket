import { create } from 'zustand';

interface EventState {
    events: any[];
    setEvents: (events: any[]) => void;
}

export const useEventStore = create<EventState>((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
}));