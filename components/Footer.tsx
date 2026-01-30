import React from 'react';

interface FooterProps {
  variant?: 'default' | 'sidebar';
}

export default function Footer({ variant = 'default' }: FooterProps) {
  const isSidebar = variant === 'sidebar';

  return (
    <footer className={`bg-slate-100 dark:bg-landing-bg border-t border-slate-200 dark:border-landing-border transition-colors duration-300 ${isSidebar ? 'px-6 py-10' : 'px-6 md:px-20 py-16'}`}>
      <div className={`mx-auto grid gap-8 ${isSidebar ? 'grid-cols-2 max-w-full' : 'max-w-[1280px] grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12'}`}>
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center gap-3">
               <img src="https://cdn.imgchest.com/files/38408a6bf587.png" alt="Ventureline" className="h-10 w-auto object-contain" />
               <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Ventureline</span>
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
        
        {/* Navigation Columns - Always show all columns, but adjust grid for sidebar */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 md:mb-6">Discovery</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-white/40">
            <li><a href="#" className="hover:text-primary transition-colors">Trending Now</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Last Minute Stays</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Eco Stays</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 md:mb-6">Hosting</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-white/40">
            <li><a href="#" className="hover:text-primary transition-colors">List Your Property</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Host Community</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Safety Standards</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Resource Center</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 md:mb-6">Support</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-white/40">
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cancellation Options</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className={`mx-auto pt-8 border-t border-slate-200 dark:border-landing-border flex flex-col md:row justify-between items-center gap-4 text-xs text-slate-400 dark:text-white/20 ${isSidebar ? 'mt-8' : 'mt-16 max-w-[1280px]'}`}>
        <p>© 2024 Ventureline Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}