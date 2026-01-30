import React, { useState, useEffect } from 'react';
import { Campsite } from '../types';
import { api } from '../services/api';
import Footer from './Footer';

interface FavoritesPageProps {
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateDetails: (id: string) => void;
}

export default function FavoritesPage({ onBack, isDark, toggleTheme, onNavigateDetails }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<Campsite[]>([]);

  useEffect(() => {
    const favIds = api.getFavorites();
    const loadFavs = async () => {
        const allSites = await api.getCampsites();
        setFavorites(allSites.filter(site => favIds.includes(site.id)));
    };
    loadFavs();
  }, []);

  const removeFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    api.toggleFavorite(id);
    setFavorites(prev => prev.filter(site => site.id !== id));
  };

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

      <div className="max-w-[1280px] mx-auto px-6 py-12 flex-1 w-full">
        <h1 className="text-3xl font-bold mb-8">Saved Stays</h1>
        
        {favorites.length === 0 ? (
             <div className="text-center py-20 bg-white dark:bg-landing-surface rounded-2xl border border-slate-200 dark:border-landing-border">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">favorite_border</span>
                <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                <p className="text-slate-500 mb-6">Save your dream spots to find them easily later.</p>
                <button onClick={onBack} className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:opacity-90">Browse Stays</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((site) => (
                <div 
                  key={site.id} 
                  className="bg-white dark:bg-landing-surface rounded-2xl overflow-hidden border border-slate-200 dark:border-landing-border hover:shadow-2xl hover:shadow-primary/5 transition-all group cursor-pointer"
                  onClick={() => onNavigateDetails(site.id)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={site.image} 
                      alt={site.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <button 
                        onClick={(e) => removeFavorite(e, site.id)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                        title="Remove from favorites"
                    >
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
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
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-landing-border">
                      <div>
                        <span className="text-slate-900 dark:text-white text-2xl font-bold">${site.price}</span>
                        <span className="text-slate-500 dark:text-white/40 text-sm">/ night</span>
                      </div>
                      <button className="px-6 py-2 rounded-lg bg-slate-50 dark:bg-landing-surface border border-primary text-primary font-bold hover:bg-primary hover:text-landing-bg transition-all">View</button>
                    </div>
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