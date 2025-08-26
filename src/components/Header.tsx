import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-full shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
          Sher Market
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-stone-600 mb-2 max-w-2xl mx-auto leading-relaxed">
          A treasure of the finest Urdu and Hindi poetry
        </p>

        {/* Heart Icon with Animated Beat */}
        <div className="flex items-center justify-center mt-4">
          <Heart className="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" />
        </div>

        {/* Decorative Line */}
        <div className="mt-8 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-64"></div>
        </div>
      </div>
    </header>
  );
};