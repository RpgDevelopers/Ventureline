import React, { useState, useEffect } from 'react';
import { Campsite } from '../types';
import { api } from '../services/api';
import Footer from './Footer';

interface DetailsPageProps {
  campsiteId: string;
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBookings: () => void;
}

export default function DetailsPage({ campsiteId, onBack, isDark, toggleTheme, onNavigateBookings }: DetailsPageProps) {
  const [campsite, setCampsite] = useState<Campsite | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState('2');
  const [dates, setDates] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCampsiteById(campsiteId);
      setCampsite(data);
      setLoading(false);
    };
    fetchData();
  }, [campsiteId]);

  const handleBooking = async () => {
    if (!campsite) return;
    setLoading(true);
    await api.createBooking({
        campsiteId: campsite.id,
        campsiteName: campsite.name,
        campsiteImage: campsite.image,
        campsiteLocation: campsite.location,
        dates: dates || 'Oct 14 - Oct 16',
        guests,
        totalPrice: campsite.price * 2 // Mock calculation
    });
    setLoading(false);
    setIsBooked(true);
  };

  if (loading && !campsite) {
    return <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-landing-bg text-primary">Loading...</div>;
  }

  if (!campsite) return <div>Not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-landing-bg text-slate-900 dark:text-white transition-colors duration-300 animate-fade-in">
       {/* Header */}
       <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 dark:border-landing-border bg-white/80 dark:bg-landing-bg/80 backdrop-blur-md px-6 md:px-20 py-4 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
             <span className="material-symbols-outlined text-2xl">arrow_back</span>
             <span className="font-bold">Back to Search</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={toggleTheme} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[50vh] w-full">
         <img src={campsite.image} alt={campsite.name} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                     {campsite.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-white border border-primary/40 text-xs font-bold uppercase">{tag}</span>
                     ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{campsite.name}</h1>
                <p className="text-xl text-white/80 flex items-center gap-2">
                    <span className="material-symbols-outlined">location_on</span>
                    {campsite.location}
                </p>
            </div>
         </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-20 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Details */}
         <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8 text-sm">
                <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white"><span className="material-symbols-outlined text-primary">star</span> {campsite.rating} Rating</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-landing-border"></span>
                <span className="text-slate-500 dark:text-slate-400">{campsite.reviews} Reviews</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">About this stay</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10 text-lg">
                {campsite.description || "Experience nature like never before. This site offers stunning views, fresh air, and a chance to disconnect from the hustle and bustle. Perfect for solo travelers, couples, or small groups looking for a peaceful getaway."}
            </p>

            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
                {(campsite.amenities || campsite.tags).map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-landing-border bg-white dark:bg-landing-surface">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span className="font-medium">{amenity}</span>
                    </div>
                ))}
            </div>
         </div>

         {/* Booking Card */}
         <div className="relative">
             <div className="sticky top-24 bg-white dark:bg-landing-surface border border-slate-200 dark:border-landing-border rounded-2xl p-6 shadow-xl">
                 {isBooked ? (
                     <div className="text-center py-10">
                         <span className="material-symbols-outlined text-6xl text-primary mb-4">check_circle</span>
                         <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                         <p className="text-slate-500 dark:text-white/60 mb-6">You're all set for your adventure.</p>
                         <button onClick={onNavigateBookings} className="w-full py-3 rounded-xl bg-slate-100 dark:bg-landing-border text-slate-900 dark:text-white font-bold hover:bg-slate-200 transition-colors">View My Bookings</button>
                     </div>
                 ) : (
                    <>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <span className="text-3xl font-bold">${campsite.price}</span>
                                <span className="text-slate-500 dark:text-white/60"> / night</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-xl border border-slate-200 dark:border-landing-border bg-slate-50 dark:bg-landing-bg">
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Check-in</label>
                                    <input type="text" placeholder="Add date" className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0" value={dates.split('-')[0] || ''} onChange={(e) => setDates(e.target.value)} />
                                </div>
                                <div className="p-3 rounded-xl border border-slate-200 dark:border-landing-border bg-slate-50 dark:bg-landing-bg">
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Check-out</label>
                                    <input type="text" placeholder="Add date" className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0" value={dates.split('-')[1] || ''} onChange={(e) => setDates(dates.split('-')[0] + '-' + e.target.value)} />
                                </div>
                            </div>
                            <div className="p-3 rounded-xl border border-slate-200 dark:border-landing-border bg-slate-50 dark:bg-landing-bg">
                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Guests</label>
                                <select className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0" value={guests} onChange={(e) => setGuests(e.target.value)}>
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={handleBooking}
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Reserve'}
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">You won't be charged yet</p>
                    </>
                 )}
             </div>
         </div>
      </div>
      <Footer />
    </div>
  );
}