import React, { useState, useEffect } from 'react';
import { Destination, Amenity, Campsite } from '../types';
import { INITIAL_DESTINATIONS, INITIAL_CAMPSITES, AMENITIES } from '../services/mockData';

interface LandingPageProps {
  onSearch: (params: { location: string; dates: string; guests: string }) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBookings: () => void;
  onNavigateFavorites: () => void;
}

export default function LandingPage({ onSearch, isDark, toggleTheme, onNavigateBookings, onNavigateFavorites }: LandingPageProps) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, dates, guests });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-slate-50 dark:bg-landing-bg w-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 dark:border-landing-border bg-white/80 dark:bg-landing-bg/80 backdrop-blur-md px-6 md:px-20 py-4 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <img src="https://cdn.imgchest.com/files/91aa51b5d4a5.png" alt="Ventureline" className="h-10 md:h-12 w-auto object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={() => onSearch({ location: '', dates: '', guests: '' })} className="text-slate-600 dark:text-white/80 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Explore</button>
            <button onClick={onNavigateBookings} className="text-slate-600 dark:text-white/80 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Bookings</button>
            <button onClick={onNavigateFavorites} className="text-slate-600 dark:text-white/80 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Favorites</button>
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors mr-2"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="material-symbols-outlined">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="flex h-10 px-5 items-center justify-center rounded-lg bg-white dark:bg-landing-surface border border-slate-200 dark:border-landing-border text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-100 dark:hover:bg-landing-border transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full px-6 md:px-20 py-10">
          <div className="max-w-[1280px] mx-auto">
            <div 
              className="relative min-h-[560px] flex flex-col items-center justify-center p-8 rounded-3xl overflow-hidden bg-cover bg-center" 
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?auto=format&fit=crop&q=80&w=2070")`
              }}
            >
              <div className="relative z-10 flex flex-col gap-6 text-center max-w-2xl mb-12">
                <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                  Find your next escape <span className="text-primary italic">under the stars</span>.
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-normal max-w-xl mx-auto">
                  Discover and book unique outdoor stays in the world's most beautiful forests and mountains.
                </p>
              </div>
              
              {/* Search Bar Widget */}
              <form onSubmit={handleSearch} className="relative z-10 w-full max-w-4xl bg-white/90 dark:bg-landing-surface/90 backdrop-blur-xl p-2 md:p-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-2 transition-colors duration-300">
                <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors rounded-xl">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div className="flex flex-col w-full">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/50 tracking-wider">Destination</span>
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent border-0 p-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:ring-0 text-sm md:text-base w-full" 
                      placeholder="Where are you going?" 
                    />
                  </div>
                </div>
                <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors rounded-xl">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <div className="flex flex-col w-full">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/50 tracking-wider">Check-in - Out</span>
                    <input 
                      type="text"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="bg-transparent border-0 p-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:ring-0 text-sm md:text-base w-full" 
                      placeholder="Add dates" 
                    />
                  </div>
                </div>
                <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors rounded-xl">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <div className="flex flex-col w-full">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/50 tracking-wider">Guests</span>
                    <input 
                      type="text"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="bg-transparent border-0 p-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:ring-0 text-sm md:text-base w-full" 
                      placeholder="Add guests" 
                    />
                  </div>
                </div>
                <button type="submit" className="w-full md:w-auto min-w-[140px] h-14 md:h-16 px-8 rounded-xl bg-primary text-landing-bg font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">search</span>
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Trending Destinations */}
        <section className="px-6 md:px-20 py-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-end justify-between px-2 mb-8">
              <div>
                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Top Picked</span>
                <h2 className="text-slate-900 dark:text-white text-3xl font-bold">Trending Destinations</h2>
              </div>
              <button onClick={() => onSearch({ location: '', dates: '', guests: '' })} className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors group">
                View all <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            <div className="flex overflow-x-auto gap-6 no-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0">
              {INITIAL_DESTINATIONS.map((dest) => (
                <div key={dest.id} className="flex-none w-72 md:w-80 group cursor-pointer" onClick={() => onSearch({ location: dest.name, dates: '', guests: '' })}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <button className="bg-white/20 backdrop-blur-md text-white py-2 rounded-lg font-semibold hover:bg-white hover:text-landing-bg transition-all">Explore Map</button>
                    </div>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">{dest.name}</h3>
                  <p className="text-slate-500 dark:text-white/50 text-sm">{dest.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="px-6 md:px-20 py-12 bg-white dark:bg-landing-surface/50 transition-colors duration-300">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-4">Tailored to Your Adventure</h2>
              <p className="text-slate-500 dark:text-white/50 max-w-lg mx-auto">Everything you need for a comfortable stay in the great outdoors.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {AMENITIES.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-landing-surface border border-slate-200 dark:border-landing-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors cursor-default group">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-landing-bg transition-colors">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Campsites */}
        <section className="px-6 md:px-20 py-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-accent-orange font-bold text-sm uppercase tracking-widest mb-2 block">Available Now</span>
                <h2 className="text-slate-900 dark:text-white text-3xl font-bold">Popular Campsites</h2>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-landing-border flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white hover:text-slate-900 dark:hover:text-landing-bg transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-landing-border flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white hover:text-slate-900 dark:hover:text-landing-bg transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INITIAL_CAMPSITES.slice(0, 3).map((site) => (
                <div key={site.id} className="bg-white dark:bg-landing-surface rounded-2xl overflow-hidden border border-slate-200 dark:border-landing-border hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={site.image} 
                      alt={site.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    {site.isEco && (
                      <div className="absolute top-4 left-4 bg-primary text-landing-bg px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Eco-Conscious</div>
                    )}
                    {site.isNew && (
                      <div className="absolute top-4 left-4 bg-accent-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">New Site</div>
                    )}
                    {site.tags.includes('Pets') && !site.isEco && !site.isNew && (
                       <div className="absolute top-4 left-4 bg-primary text-landing-bg px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pet Friendly</div>
                    )}
                    <button onClick={() => onSearch({ location: site.name, dates: '', guests: '' })} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-landing-bg transition-colors">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-slate-900 dark:text-white text-xl font-bold line-clamp-1">{site.name}</h3>
                      <div className="flex items-center gap-1 text-primary shrink-0">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{site.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-white/50 text-sm mb-4">{site.location}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/40 mb-6">
                      {site.tags.slice(0, 3).map((tag, i) => (
                         <span key={i} className="flex items-center gap-1">
                           <span className="material-symbols-outlined text-sm">
                             {tag.includes('WiFi') ? 'wifi' : 
                              tag.includes('Water') ? 'water_drop' : 
                              tag.includes('Power') ? 'bolt' : 
                              tag.includes('Fire') ? 'fireplace' : 
                              tag.includes('Kitchen') ? 'kitchen' : 
                              tag.includes('Heat') ? 'ac_unit' : 
                              tag.includes('Kayak') ? 'kayaking' : 
                              tag.includes('Trail') ? 'hiking' : 
                              'pets'}
                            </span> 
                            {tag}
                         </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-landing-border">
                      <div>
                        <span className="text-slate-900 dark:text-white text-2xl font-bold">${site.price}</span>
                        <span className="text-slate-500 dark:text-white/40 text-sm">/ night</span>
                      </div>
                      <button onClick={() => onSearch({ location: site.location, dates: '', guests: '' })} className="px-6 py-2 rounded-lg bg-slate-50 dark:bg-landing-surface border border-primary text-primary font-bold hover:bg-primary hover:text-landing-bg transition-all">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="px-6 md:px-20 py-20 bg-primary/5">
          <div className="max-w-[1280px] mx-auto bg-primary rounded-3xl p-10 md:p-20 flex flex-col items-center text-center overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
            <h2 className="text-landing-bg text-3xl md:text-5xl font-black mb-6 max-w-2xl">Ready for your next adventure? Join 50,000+ campers.</h2>
            <p className="text-landing-bg/70 text-lg mb-10 max-w-xl">Get exclusive deals on campsites and gear straight to your inbox every week.</p>
            <form className="w-full max-w-lg flex flex-col sm:flex-row gap-4 relative z-10" onSubmit={handleSubscribe}>
              <input type="email" required className="flex-1 rounded-xl border-0 bg-white/20 placeholder:text-landing-bg/50 text-landing-bg focus:ring-2 focus:ring-landing-bg/20 h-14 px-6 font-medium" placeholder="Your email address" />
              <button className="h-14 px-8 bg-landing-bg text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                {subscribed ? 'Subscribed!' : 'Join the Wild'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-landing-bg border-t border-slate-200 dark:border-landing-border px-6 md:px-20 py-16 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center">
               <img src="https://cdn.imgchest.com/files/91aa51b5d4a5.png" alt="Ventureline" className="h-10 w-auto object-contain" />
            </div>
          </div>
          <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed mb-8 max-w-xs">Connecting people with the great outdoors. We facilitate sustainable travel and meaningful experiences in nature's backyard.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-landing-surface border border-slate-200 dark:border-landing-border flex items-center justify-center text-slate-400 dark:text-white/60 hover:text-primary hover:border-primary transition-all">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-landing-surface border border-slate-200 dark:border-landing-border flex items-center justify-center text-slate-400 dark:text-white/60 hover:text-primary hover:border-primary transition-all">
              <span className="material-symbols-outlined text-lg">play_arrow</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6">Discovery</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-white/40">
            <li><a href="#" className="hover:text-primary transition-colors">Trending Now</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Last Minute Stays</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Eco Stays</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6">Hosting</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-white/40">
            <li><a href="#" className="hover:text-primary transition-colors">List Your Property</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Host Community</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Safety Standards</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Resource Center</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-white/40">
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cancellation Options</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-landing-border flex flex-col md:row justify-between items-center gap-4 text-xs text-slate-400 dark:text-white/20">
        <p>© 2024 Ventureline Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookie Preferences</a>
        </div>
      </div>
    </footer>
  );
}