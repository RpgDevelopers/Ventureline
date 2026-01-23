import { Campsite, Destination, Booking } from '../types';
import { INITIAL_CAMPSITES, INITIAL_DESTINATIONS } from './mockData';

// Storage Keys
const FAVORITES_KEY = 'ventureline_favorites';
const BOOKINGS_KEY = 'ventureline_bookings';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getDestinations: async (): Promise<Destination[]> => {
    // await delay(300);
    return INITIAL_DESTINATIONS;
  },

  getCampsites: async (query: string = ''): Promise<Campsite[]> => {
    // await delay(500);
    if (!query) return INITIAL_CAMPSITES;
    
    const lowerQuery = query.toLowerCase();
    return INITIAL_CAMPSITES.filter(site => 
      site.name.toLowerCase().includes(lowerQuery) || 
      site.location.toLowerCase().includes(lowerQuery) ||
      site.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  getCampsiteById: async (id: string): Promise<Campsite | undefined> => {
    // await delay(200);
    return INITIAL_CAMPSITES.find(site => site.id === id);
  },

  getFavorites: (): string[] => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  toggleFavorite: (campsiteId: string): boolean => {
    const favorites = api.getFavorites();
    const index = favorites.indexOf(campsiteId);
    let newFavorites;
    let isFav = false;

    if (index === -1) {
      newFavorites = [...favorites, campsiteId];
      isFav = true;
    } else {
      newFavorites = favorites.filter(id => id !== campsiteId);
      isFav = false;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return isFav;
  },

  isFavorite: (campsiteId: string): boolean => {
    const favorites = api.getFavorites();
    return favorites.includes(campsiteId);
  },

  getBookings: (): Booking[] => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'status' | 'bookedAt'>): Promise<Booking> => {
    await delay(800); // Simulate processing
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };

    const bookings = api.getBookings();
    bookings.unshift(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    
    return newBooking;
  }
};
