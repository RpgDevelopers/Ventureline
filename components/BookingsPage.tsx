import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { api } from '../services/api';
import Footer from './Footer';

interface BookingsPageProps {
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function BookingsPage({ onBack, isDark, toggleTheme }: BookingsPageProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(api.getBookings());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-landing-bg text-slate-900 dark:text-white transition-colors duration-300 flex flex-col animate-fade-in">
       <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 dark:border-landing-border bg-white/80 dark:bg-landing-bg/80 backdrop-blur-md px-6 md:px-20 py-4 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
             <span className="material-symbols-outlined text-2xl">arrow_back</span>
             <span className="font-bold">Back to Home</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={toggleTheme} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-6 py-12 flex-1 w-full">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-landing-surface rounded-2xl border border-slate-200 dark:border-landing-border">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">backpack</span>
                <h3 className="text-xl font-bold mb-2">No trips booked... yet!</h3>
                <p className="text-slate-500 mb-6">Time to dust off your hiking boots and find your next adventure.</p>
                <button onClick={onBack} className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:opacity-90">Start Exploring</button>
            </div>
        ) : (
            <div className="flex flex-col gap-6">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white dark:bg-landing-surface border border-slate-200 dark:border-landing-border rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-sm">
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                            <img src={booking.campsiteImage} alt={booking.campsiteName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{booking.campsiteName}</h3>
                                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wider">{booking.status}</span>
                            </div>
                            <p className="text-slate-500 dark:text-white/60 text-sm mb-4">{booking.campsiteLocation}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-slate-400 text-xs uppercase font-bold">Dates</span>
                                    <span className="font-medium">{booking.dates}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-400 text-xs uppercase font-bold">Guests</span>
                                    <span className="font-medium">{booking.guests} Guests</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end items-end border-t md:border-t-0 md:border-l border-slate-100 dark:border-landing-border pt-4 md:pt-0 md:pl-6">
                            <span className="text-sm text-slate-400">Total Price</span>
                            <span className="text-2xl font-bold text-primary">${booking.totalPrice}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      <Footer />
    </div>
  );
}