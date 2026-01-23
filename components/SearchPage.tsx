import React, { useState, useEffect } from 'react';
import { Campsite } from '../types';
import { api } from '../services/api';

interface SearchPageProps {
  onBack: () => void;
  initialLocation?: string;
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateDetails: (id: string) => void;
  onNavigateBookings: () => void;
  onNavigateFavorites: () => void;
}

export default function SearchPage({ onBack, initialLocation, isDark, toggleTheme, onNavigateDetails, onNavigateBookings, onNavigateFavorites }: SearchPageProps) {
  const [searchValue, setSearchValue] = useState(initialLocation || 'Lake Tahoe, CA');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [campsites, setCampsites] = useState<Campsite[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'eco' | 'pets' | 'instant'>('all');

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const data = await api.getCampsites(searchValue);
      setCampsites(data);
    };
    fetchData();
    setFavorites(api.getFavorites());
  }, [searchValue]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await api.getCampsites(searchValue);
    setCampsites(data);
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    api.toggleFavorite(id);
    setFavorites(api.getFavorites());
  };

  const filteredCampsites = campsites.filter(site => {
    if (filter === 'eco') return site.isEco;
    if (filter === 'pets') return site.tags.some(t => t.toLowerCase().includes('pet'));
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-search-bg overflow-hidden text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-landing-border px-4 md:px-10 py-3 bg-white dark:bg-search-bg z-20 shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <img src="https://cdn.imgchest.com/files/91aa51b5d4a5.png" alt="Ventureline" className="h-10 md:h-12 w-auto object-contain" />
          </div>
          <form onSubmit={handleSearch} className="flex flex-col w-full md:max-w-md h-10">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-none shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/50">
               <div className="text-slate-400 dark:text-[#9db8a6] flex bg-white dark:bg-landing-border items-center justify-center pl-4">
                  <span className="material-symbols-outlined text-[20px]">search</span>
               </div>
               <input 
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-landing-border placeholder:text-slate-400 dark:placeholder:text-[#9db8a6] px-4 pl-2 text-sm font-normal leading-normal" 
                  placeholder="Search campsites, parks, or cities..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
               />
            </div>
          </form>
        </div>
        
        <div className="flex flex-1 justify-end gap-6 items-center">
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => setFilter('all')} className={`text-sm font-medium hover:text-primary transition-colors ${filter === 'all' ? 'text-primary' : 'text-slate-600 dark:text-white'}`}>Discover</button>
            <button onClick={onNavigateBookings} className="text-slate-600 dark:text-white text-sm font-medium hover:text-primary transition-colors">Bookings</button>
            <button onClick={onNavigateFavorites} className="text-slate-600 dark:text-white text-sm font-medium hover:text-primary transition-colors">Favorites</button>
          </nav>
          <div className="flex gap-2">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-landing-border text-slate-600 dark:text-white hover:bg-primary/20 transition-all"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-landing-border text-slate-600 dark:text-white hover:bg-primary/20 transition-all">
               <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-landing-border text-slate-600 dark:text-white hover:bg-primary/20 transition-all">
               <span className="material-symbols-outlined text-[20px]">account_circle</span>
            </button>
          </div>
          <div 
            className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" 
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200")` }}
          ></div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="px-6 py-3 border-b border-slate-200 dark:border-landing-border bg-white dark:bg-search-bg z-10 flex items-center justify-between shrink-0 transition-colors duration-300">
        <div className="flex gap-3 overflow-x-auto no-scrollbar mask-linear-fade">
          <button onClick={() => setFilter('all')} className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-landing-border border-slate-200 dark:border-none text-slate-700 dark:text-white hover:border-primary'}`}>
             <span>All</span>
          </button>
          <button onClick={() => setFilter('eco')} className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors whitespace-nowrap ${filter === 'eco' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-landing-border border-slate-200 dark:border-none text-slate-700 dark:text-white hover:border-primary'}`}>
             <span className="material-symbols-outlined text-[18px]">eco</span>
             <span>Eco Friendly</span>
          </button>
          <button onClick={() => setFilter('pets')} className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors whitespace-nowrap ${filter === 'pets' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-landing-border border-slate-200 dark:border-none text-slate-700 dark:text-white hover:border-primary'}`}>
             <span className="material-symbols-outlined text-[18px]">pets</span>
             <span>Pet Friendly</span>
          </button>
        </div>
        <div className="hidden md:flex items-center gap-2 pl-4">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-widest whitespace-nowrap">View:</span>
          <div className="flex bg-slate-100 dark:bg-landing-border p-1 rounded-lg">
             <button className="p-1 px-3 rounded-md bg-white dark:bg-[#3d5244] text-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">splitscreen</span>
             </button>
             <button className="p-1 px-3 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">list</span>
             </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: List */}
        <div className="w-full lg:w-[45%] xl:w-[500px] overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-search-bg border-r border-slate-200 dark:border-landing-border pb-10 transition-colors duration-300">
          <div className="flex flex-wrap gap-2 p-6 pb-2">
            <span className="text-slate-400 dark:text-[#9db8a6] text-xs font-medium uppercase tracking-wider">Locations</span>
            <span className="text-slate-300 dark:text-landing-border text-xs">/</span>
            <span className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">{searchValue.split(',')[0]}</span>
          </div>

          <div className="px-6 py-4 flex flex-col gap-1">
             <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">Stays in {searchValue.split(',')[0]}</h1>
             <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-[#9db8a6] text-sm">{filteredCampsites.length} stays available</p>
                <button className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-landing-border px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-landing-border/80 transition-colors">
                  Sort: Recommended <span className="material-symbols-outlined text-[14px]">swap_vert</span>
                </button>
             </div>
          </div>

          <div className="flex flex-col gap-6 p-6 pt-2">
            {filteredCampsites.map((site) => (
              <div 
                key={site.id}
                onClick={() => onNavigateDetails(site.id)}
                onMouseEnter={() => setHoveredId(site.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group flex flex-col gap-3 rounded-xl bg-white dark:bg-search-surface border transition-all cursor-pointer overflow-hidden
                  ${hoveredId === site.id ? 'shadow-xl ring-1 ring-primary border-primary' : 'shadow-sm border-slate-100 dark:border-landing-border hover:shadow-lg'}
                `}
              >
                <div 
                  className="relative h-48 w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url('${site.image}')` }}
                >
                   {site.rating >= 4.9 && (
                     <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Top Rated</div>
                   )}
                   {site.id === 's3' && (
                     <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">A-Frame</div>
                   )}
                   <button 
                    onClick={(e) => toggleFavorite(e, site.id)}
                    className={`absolute top-3 right-3 h-8 w-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${favorites.includes(site.id) ? 'bg-primary text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                   >
                      <span className="material-symbols-outlined text-[20px]">{favorites.includes(site.id) ? 'favorite' : 'favorite_border'}</span>
                   </button>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors">{site.name}</h3>
                     <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="text-sm font-bold">{site.rating}</span>
                        <span className="text-slate-400 text-xs font-normal">({site.reviews})</span>
                     </div>
                  </div>
                  <p className="text-slate-500 dark:text-[#9db8a6] text-sm mb-3">{site.location}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                     {site.tags.map(tag => (
                       <span key={tag} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-landing-border text-slate-600 dark:text-[#9db8a6] text-[10px] font-bold uppercase">{tag}</span>
                     ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-landing-border pt-4">
                     <div>
                        <span className="text-slate-900 dark:text-white text-xl font-bold">${site.price}</span>
                        <span className="text-slate-500 dark:text-[#9db8a6] text-sm font-medium">/ night</span>
                     </div>
                     <button className="bg-primary hover:bg-primary/90 text-search-bg font-bold text-sm px-5 py-2 rounded-lg transition-colors">View Stay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="hidden lg:block flex-1 relative bg-slate-200 dark:bg-slate-800">
           {/* Clearer high-res map image */}
           <div 
             className="absolute inset-0 bg-cover bg-center grayscale-[20%] brightness-[0.95] dark:brightness-[0.5] opacity-100" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')` }}
           ></div>
           
           <div className="absolute inset-0 z-10 p-6 pointer-events-none">
              {/* Controls */}
              <div className="flex flex-col gap-2 absolute top-6 right-6 pointer-events-auto">
                 <button className="w-10 h-10 bg-white dark:bg-search-surface rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:text-primary transition-colors border border-slate-200 dark:border-landing-border">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                 </button>
                 <button className="w-10 h-10 bg-white dark:bg-search-surface rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:text-primary transition-colors border border-slate-200 dark:border-landing-border">
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                 </button>
                 <button className="w-10 h-10 mt-4 bg-white dark:bg-search-surface rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:text-primary transition-colors border border-slate-200 dark:border-landing-border">
                    <span className="material-symbols-outlined text-[20px]">my_location</span>
                 </button>
              </div>

              {/* Pins */}
              {filteredCampsites.filter(s => s.coordinates).map((site) => (
                <div 
                  key={site.id} 
                  className="absolute pointer-events-auto transition-transform duration-300"
                  style={{ top: site.coordinates?.top, left: site.coordinates?.left, transform: hoveredId === site.id ? 'scale(1.1) translateY(-10px)' : 'scale(1)' }}
                  onMouseEnter={() => setHoveredId(site.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onNavigateDetails(site.id)}
                >
                   <div className="relative group">
                      <div className={`
                         px-3 py-1.5 rounded-full shadow-lg text-sm font-bold flex items-center gap-1 cursor-pointer transition-colors
                         ${hoveredId === site.id 
                           ? 'bg-primary text-search-bg shadow-[0_0_20px_rgba(23,207,84,0.4)] z-50' 
                           : 'bg-white dark:bg-landing-border text-slate-900 dark:text-white hover:bg-primary hover:text-white'}
                      `}>
                         ${site.price}
                         {hoveredId === site.id && <span className="material-symbols-outlined text-[14px]">star</span>}
                      </div>
                      <div className={`w-3 h-3 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 ${hoveredId === site.id ? 'bg-primary' : 'bg-white dark:bg-landing-border'}`}></div>
                   </div>
                </div>
              ))}

              {/* Floating Bottom Tip */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto bg-search-bg/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-xl">
                 <p className="text-white text-sm font-medium whitespace-nowrap">Search as I move the map</p>
                 <label className="relative inline-block w-10 h-6 cursor-pointer">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                 </label>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}