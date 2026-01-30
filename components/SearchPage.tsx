import React, { useState, useEffect, useRef } from 'react';
import { Campsite } from '../types';
import { api } from '../services/api';
import Footer from './Footer';

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
  
  // Header auto-hide logic
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Map Zoom Logic
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const data = await api.getCampsites(searchValue);
      setCampsites(data);
    };
    fetchData();
    setFavorites(api.getFavorites());
  }, [searchValue]);

  // Window Scroll handler for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide header when scrolling down more than 100px
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-landing-bg text-slate-900 dark:text-white font-sans transition-colors duration-300 animate-fade-in">
      
      {/* Fixed Header & Filter Group */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 shadow-md ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-landing-border px-4 md:px-10 py-3 bg-white dark:bg-search-bg">
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
              <img src="https://cdn.imgchest.com/files/38408a6bf587.png" alt="Ventureline" className="h-10 md:h-12 w-auto object-contain" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden md:block">Ventureline</span>
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
        <div className="px-6 py-3 border-b border-slate-200 dark:border-landing-border bg-white dark:bg-search-bg flex items-center justify-between">
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
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto pt-[140px] px-4 md:px-8 pb-10">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
            
            {/* List Section */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
                <div className="flex flex-wrap gap-2 items-center text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">
                    <span>Locations</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-900 dark:text-white">{searchValue.split(',')[0]}</span>
                </div>

                <div className="flex items-end justify-between border-b border-slate-100 dark:border-landing-border pb-4">
                   <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-1">Stays in {searchValue.split(',')[0]}</h1>
                        <p className="text-slate-500 dark:text-[#9db8a6] text-sm">{filteredCampsites.length} stays available</p>
                   </div>
                   <button className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-landing-border px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-landing-border/80 transition-colors">
                      Sort <span className="material-symbols-outlined text-[14px]">swap_vert</span>
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className="relative h-56 w-full bg-cover bg-center" 
                          style={{ backgroundImage: `url('${site.image}')` }}
                        >
                           {site.rating >= 4.9 && (
                             <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Top Rated</div>
                           )}
                           <button 
                            onClick={(e) => toggleFavorite(e, site.id)}
                            className={`absolute top-3 right-3 h-8 w-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${favorites.includes(site.id) ? 'bg-primary text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                           >
                              <span className="material-symbols-outlined text-[20px]">{favorites.includes(site.id) ? 'favorite' : 'favorite_border'}</span>
                           </button>
                        </div>
                        <div className="p-4 pt-0">
                          <div className="flex justify-between items-start mb-1 mt-3">
                             <h3 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{site.name}</h3>
                             <div className="flex items-center gap-1 text-primary shrink-0">
                                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                <span className="text-sm font-bold">{site.rating}</span>
                             </div>
                          </div>
                          <p className="text-slate-500 dark:text-[#9db8a6] text-sm mb-3 line-clamp-1">{site.location}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                             {site.tags.slice(0, 3).map(tag => (
                               <span key={tag} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-landing-border text-slate-600 dark:text-[#9db8a6] text-[10px] font-bold uppercase">{tag}</span>
                             ))}
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-100 dark:border-landing-border pt-4">
                             <div>
                                <span className="text-slate-900 dark:text-white text-xl font-bold">${site.price}</span>
                                <span className="text-slate-500 dark:text-[#9db8a6] text-sm font-medium">/ night</span>
                             </div>
                             <button className="bg-primary hover:bg-primary/90 text-search-bg font-bold text-sm px-4 py-2 rounded-lg transition-colors">View</button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>

            {/* Map Section - Sticky */}
            <div className="hidden lg:block lg:w-[40%]">
               <div className="sticky top-[150px] h-[calc(100vh-170px)] rounded-3xl overflow-hidden border border-slate-200 dark:border-landing-border shadow-2xl bg-slate-100 dark:bg-landing-surface">
                   {/* Map Container */}
                   <div 
                     className="w-full h-full relative transition-transform duration-300 ease-in-out origin-center"
                     style={{ transform: `scale(${zoom})` }}
                   >
                      <div 
                        className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.9] dark:brightness-[0.5] opacity-90" 
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')` }}
                      ></div>

                      {/* Pins */}
                      {filteredCampsites.filter(s => s.coordinates).map((site) => (
                        <div 
                          key={site.id} 
                          className="absolute pointer-events-auto transition-all duration-300 z-10 hover:z-50"
                          style={{ 
                            top: site.coordinates?.top, 
                            left: site.coordinates?.left,
                          }}
                          onMouseEnter={() => setHoveredId(site.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => onNavigateDetails(site.id)}
                        >
                           <div 
                              className="relative group origin-bottom"
                              style={{ transform: `scale(${1/zoom}) ${hoveredId === site.id ? 'scale(1.2) translateY(-10px)' : ''}` }}
                           >
                              <div className={`
                                 px-3 py-1.5 rounded-full shadow-lg text-sm font-bold flex items-center gap-1 cursor-pointer transition-colors border border-black/5
                                 ${hoveredId === site.id 
                                   ? 'bg-primary text-search-bg shadow-[0_0_20px_rgba(23,207,84,0.4)]' 
                                   : 'bg-white dark:bg-landing-border text-slate-900 dark:text-white hover:bg-primary hover:text-white'}
                              `}>
                                 ${site.price}
                                 {hoveredId === site.id && <span className="material-symbols-outlined text-[14px]">star</span>}
                              </div>
                              <div className={`w-3 h-3 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-black/5 ${hoveredId === site.id ? 'bg-primary' : 'bg-white dark:bg-landing-border'}`}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   {/* Controls Overlay */}
                   <div className="absolute inset-0 z-20 p-6 pointer-events-none">
                      <div className="flex flex-col gap-2 absolute top-4 right-4 pointer-events-auto">
                         <button 
                          onClick={handleZoomIn}
                          className="w-10 h-10 bg-white dark:bg-search-surface rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:text-primary transition-colors border border-slate-200 dark:border-landing-border"
                         >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                         </button>
                         <button 
                          onClick={handleZoomOut}
                          className="w-10 h-10 bg-white dark:bg-search-surface rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:text-primary transition-colors border border-slate-200 dark:border-landing-border"
                         >
                            <span className="material-symbols-outlined text-[20px]">remove</span>
                         </button>
                         <button className="w-10 h-10 mt-2 bg-white dark:bg-search-surface rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:text-primary transition-colors border border-slate-200 dark:border-landing-border">
                            <span className="material-symbols-outlined text-[20px]">my_location</span>
                         </button>
                      </div>

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto bg-search-bg/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-xl">
                         <p className="text-white text-sm font-medium whitespace-nowrap">Search as I move the map</p>
                         <label className="relative inline-block w-10 h-6 cursor-pointer">
                            <input type="checkbox" defaultChecked className="peer sr-only" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                         </label>
                      </div>
                   </div>
               </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}