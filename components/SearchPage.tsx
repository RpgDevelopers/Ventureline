import React, { useState } from 'react';
import { Campsite } from '../types';

interface SearchPageProps {
  onBack: () => void;
  initialLocation?: string;
  isDark: boolean;
  toggleTheme: () => void;
}

const SEARCH_RESULTS: Campsite[] = [
  {
    id: 's1',
    name: 'Emerald Bay Viewpoints',
    location: '0.5 miles from South Lake Tahoe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt_zCRgoYO0CPzOx6IB_JM_01su9mqURjcY99L41gVT0VnP3YaXoYCniIhVlzcK1Plw4tFbTJqqj45Un7Yi9p0kwb6eb5brPDG6L0ZvvTZ4MFWBXvpc9YDkw0NbyTm9vBHn_CFNU7DeASDvstC-BVa3HIEsibhrHopklMkJF5UmI4-v7BAfsfXrp-_cJCQCe9lEPxP4XZZkFDSp9CVLhoL65h33dLHTlM7_QSHwBrrReQI3ydAAxe_McACwSJSZ5fr2Hg4qHLoj-mR',
    rating: 4.9,
    reviews: 128,
    price: 75,
    tags: ['Near Lake', 'Electric Hookup', 'RV/Tent'],
    coordinates: { top: '35%', left: '45%' }
  },
  {
    id: 's2',
    name: 'Pine Grove Retreat',
    location: '2.1 miles from Tahoe City',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQXJGD7fdxvDqnqwmoGNuTH2r7AkWJvJpQRqwxbue66PS5v7xsIbSxFwnYQZlPMVew9q7C9c7fZYQ6RzQN0Ok0p4dsKxohSHkTRwLJGC9PbJOm-giLMcVmn3MaIYURzeNxEkGGkcbTuAzDfZ2HAA6sRs7bVa_-_LFY8ca2PLLcxgaS5MrBu8sjf95K1ZSNsnt0xG_J_Y_3SBcQDyCLWk_A26A1ta0X5o9iqhU9c5CfbhdOvjDaMz6ewFTNrKLc-A9kIBGlyBrND3',
    rating: 4.7,
    reviews: 84,
    price: 42,
    tags: ['Pet Friendly', 'Showers'],
    coordinates: { top: '55%', left: '30%' }
  },
  {
    id: 's3',
    name: 'Whispering Pines Cabin',
    location: '1.5 miles from Kings Beach',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7_9vp3gKuc2aamFAIkt2-pB1_wmoCw8LrN_gpwmOyjCcCh5nRbKkxOIzI1J7ZNEyyJda040_S8jHfaSKsBt0V7VwBvRm-t2Sktr8LNQoDbl4LQGLaelCoMS1xlSrFIeA4q0OqwqMfOkTQkRbPVMiCB_8sUOP0Bp46AEojsCrzX0tSo9u0z-h4C_Eabv-Vyr7en--8hgj9uMe34QTy5cLauIWiWuDr2ljryK23d6VofgXOipZmzIKg-6ZaJ03rQNBVXoz2Ab82IV25',
    rating: 4.9,
    reviews: 42,
    price: 185,
    tags: ['Wi-Fi', 'Fire Pit'],
    coordinates: { top: '20%', left: '65%' }
  }
];

// Additional mock for map pin only
const EXTRA_PIN = { price: 35, top: '70%', left: '55%' };

export default function SearchPage({ onBack, initialLocation, isDark, toggleTheme }: SearchPageProps) {
  const [searchValue, setSearchValue] = useState(initialLocation || 'Lake Tahoe, CA');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-search-bg overflow-hidden text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-landing-border px-4 md:px-10 py-3 bg-white dark:bg-search-bg z-20 shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <img src="https://cdn.imgchest.com/files/91aa51b5d4a5.png" alt="Ventureline" className="h-10 md:h-12 w-auto object-contain" />
          </div>
          <label className="flex flex-col w-full md:max-w-md h-10">
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
          </label>
        </div>
        
        <div className="flex flex-1 justify-end gap-6 items-center">
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-slate-600 dark:text-white text-sm font-medium hover:text-primary transition-colors">Discover</a>
            <a href="#" className="text-slate-600 dark:text-white text-sm font-medium hover:text-primary transition-colors">Bookings</a>
            <a href="#" className="text-slate-600 dark:text-white text-sm font-medium hover:text-primary transition-colors">Favorites</a>
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
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWh8z9FozyNuQ_19Q_e3NQjORfS7wgOKDQvY9gi3jVszP-mDhojznCDvOoGQ58Uq-41AxoofP8FGwC4PotTYbMipDEzoG2odB2pU1xK9vFE5729q8HxffeHE8ViQ8Q6Cy7e8TRec5P63Y8FpKf8FTVCW2ksKMUShSdpOzunw7v4ZdSt_MtDsowgtutP-vXOsgOvSNdVDevO4MnFQ8CGUjwVNYtp80DPkq5kmN2qBfYjxqcnpZNRk3QgcpdxIUZ4u7Yc4N0lKUXi94V")` }}
          ></div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="px-6 py-3 border-b border-slate-200 dark:border-landing-border bg-white dark:bg-search-bg z-10 flex items-center justify-between shrink-0 transition-colors duration-300">
        <div className="flex gap-3 overflow-x-auto no-scrollbar mask-linear-fade">
          {['Price Range', 'Type of Stay', 'Amenities'].map((filter) => (
             <button key={filter} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-landing-border border border-slate-200 dark:border-none px-4 text-slate-700 dark:text-white text-sm font-medium shadow-sm hover:border-primary transition-colors whitespace-nowrap">
                <span>{filter}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
             </button>
          ))}
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/10 dark:bg-primary/20 border border-primary/30 px-4 text-primary text-sm font-semibold shadow-sm whitespace-nowrap">
             <span className="material-symbols-outlined text-[18px]">flash_on</span>
             <span>Instant Book</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-landing-border border border-slate-200 dark:border-none px-4 text-slate-700 dark:text-white text-sm font-medium shadow-sm hover:border-primary transition-colors whitespace-nowrap">
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
            <a href="#" className="text-slate-400 dark:text-[#9db8a6] text-xs font-medium uppercase tracking-wider hover:text-primary transition-colors">California</a>
            <span className="text-slate-300 dark:text-landing-border text-xs">/</span>
            <span className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">{searchValue.split(',')[0]}</span>
          </div>

          <div className="px-6 py-4 flex flex-col gap-1">
             <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">Campsites in {searchValue.split(',')[0]}</h1>
             <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-[#9db8a6] text-sm">124 stays available for selected dates</p>
                <button className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-landing-border px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-landing-border/80 transition-colors">
                  Sort: Recommended <span className="material-symbols-outlined text-[14px]">swap_vert</span>
                </button>
             </div>
          </div>

          <div className="flex flex-col gap-6 p-6 pt-2">
            {SEARCH_RESULTS.map((site) => (
              <div 
                key={site.id}
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
                   <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
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
           <div 
             className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.8] dark:brightness-[0.4] opacity-80" 
             style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBz1JuDOACF4Gz3kFM9IvmDhNLjpCmF_Fj5WPIfy-_fDTxmaWejuUoCrf7krh-VLTZbju4lDClVKTkNFogjOs3HBX8oETgC-jRztqEEBuQfwWZbSR_eJeCXPenB-Zvo_nU6GeJp23GhWtLL0KH42qMLJ5Kij7CtV_dCgkwWxJy4C905JKjZmPR0FzAX-8ZdShPdfHE7RSaavt5aZQCGxmL3dztU3bZ2HS0Q17PkvCLMyjrwGeGw1dxujFAlhWRBNozj2LzbR2i1uJZu')` }}
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
              {SEARCH_RESULTS.map((site) => (
                <div 
                  key={site.id} 
                  className="absolute pointer-events-auto transition-transform duration-300"
                  style={{ top: site.coordinates?.top, left: site.coordinates?.left, transform: hoveredId === site.id ? 'scale(1.1) translateY(-10px)' : 'scale(1)' }}
                  onMouseEnter={() => setHoveredId(site.id)}
                  onMouseLeave={() => setHoveredId(null)}
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

              {/* Extra Pin */}
              <div 
                 className="absolute pointer-events-auto top-[70%] left-[55%]"
              >
                  <div className="relative">
                    <div className="bg-white dark:bg-landing-border text-slate-900 dark:text-white font-bold px-3 py-1.5 rounded-full shadow-lg text-sm hover:bg-primary hover:text-white transition-all cursor-pointer">
                        ${EXTRA_PIN.price}
                    </div>
                    <div className="w-3 h-3 bg-white dark:bg-landing-border rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                  </div>
              </div>

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