import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  onToggle: (language: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative bg-stone-200 rounded-full p-1 shadow-inner">
        <div className="flex">
          <button
            onClick={() => onToggle('hindi')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
              language === 'hindi'
                ? 'text-white shadow-lg'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => onToggle('english')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
              language === 'english'
                ? 'text-white shadow-lg'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            English
          </button>
        </div>
        <div
          className={`absolute top-1 h-8 w-20 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-transform duration-300 ease-in-out ${
            language === 'english' ? 'transform translate-x-20' : ''
          }`}
        />
      </div>
    </div>
  );
};