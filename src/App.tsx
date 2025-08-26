import React, { useState } from 'react';
import { useMemo } from 'react';
import { Header } from './components/Header';
import { LanguageToggle } from './components/LanguageToggle';
import { ViewModeToggle } from './components/ViewModeToggle';
import { GenreFilter } from './components/GenreFilter';
import { SherCard } from './components/SherCard';
import { sherCollection } from './data/sherCollection';
import { Language, Genre, ViewMode } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('hindi');
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'All'>('All');

  const filteredShers = useMemo(() => {
    if (selectedGenre === 'All') {
      return sherCollection;
    }
    return sherCollection.filter(sher => sher.genre === selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative">
        {/* Header Section */}
        <Header />

        {/* Language Toggle */}
        <div className="container mx-auto px-4">
          <LanguageToggle language={language} onToggle={setLanguage} />
          
          {/* View Mode Toggle */}
          <ViewModeToggle viewMode={viewMode} onToggle={setViewMode} />
          
          {/* Genre Filter */}
          <GenreFilter 
            selectedGenre={selectedGenre} 
            onGenreChange={setSelectedGenre}
            language={language}
          />
        </div>

        {/* Poetry Cards Grid */}
        <main className="container mx-auto px-4 pb-16">
          {viewMode === 'normal' ? (
            // Normal Grid Layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredShers.map((sher) => (
                <SherCard 
                  key={sher.id} 
                  sher={sher} 
                  language={language}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            // Flow Mode Layout (like Instagram Reels/YouTube Shorts)
            <div className="flow-mode-container max-w-md mx-auto">
              {filteredShers.map((sher, index) => (
                <div key={sher.id} className="flow-mode-card mb-6 last:mb-0">
                  <SherCard 
                    sher={sher} 
                    language={language}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* No Results Message */}
          {filteredShers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500 text-lg">
                No poems available in this genre
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-stone-200 bg-white/50 backdrop-blur-sm">
          <p className="text-stone-600 text-sm">
            Welcome to the world of poetry
          </p>
          <div className="mt-2 flex items-center justify-center space-x-1">
            <span className="text-stone-400 text-xs">Made with</span>
            <div className="w-3 h-3 bg-red-500 transform rotate-45 rounded-sm"></div>
            <span className="text-stone-400 text-xs">for poetry lovers</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;