import React from 'react';
import { Genre, GENRES } from '../types';
import { Tag, Filter } from 'lucide-react';

interface GenreFilterProps {
  selectedGenre: Genre | 'All';
  onGenreChange: (genre: Genre | 'All') => void;
  language: 'hindi' | 'english';
}

const genreColors: Record<Genre, string> = {
  Love: 'from-rose-500 to-pink-500',
  Emotional: 'from-blue-500 to-indigo-500',
  Philosophy: 'from-purple-500 to-violet-500',
  Nature: 'from-green-500 to-emerald-500',
  Spiritual: 'from-amber-500 to-orange-500',
  Motivation: 'from-red-500 to-orange-500'
};

export const GenreFilter: React.FC<GenreFilterProps> = ({ 
  selectedGenre, 
  onGenreChange, 
  language 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <Filter className="w-5 h-5 text-amber-600 mr-2" />
        <h3 className="text-lg font-semibold text-stone-700">
          Filter by Genre
        </h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => onGenreChange('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            selectedGenre === 'All'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
              : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-600 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Tag className="w-3 h-3" />
            <span>All</span>
          </div>
        </button>

        {/* Genre Buttons */}
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedGenre === genre
                ? `bg-gradient-to-r ${genreColors[genre]} text-white shadow-lg`
                : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-600 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>{genre}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};