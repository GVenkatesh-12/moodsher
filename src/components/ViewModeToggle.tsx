import React from 'react';
import { ViewMode } from '../types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onToggle: (viewMode: ViewMode) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative bg-stone-200 rounded-full p-1 shadow-inner">
        <div className="flex">
          <button
            onClick={() => onToggle('normal')}
            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
              viewMode === 'normal'
                ? 'text-white shadow-lg'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => onToggle('flow')}
            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
              viewMode === 'flow'
                ? 'text-white shadow-lg'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            Flow
          </button>
        </div>
        <div
          className={`absolute top-1 h-10 w-28 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-transform duration-300 ease-in-out ${
            viewMode === 'flow' ? 'transform translate-x-24' : ''
          }`}
        />
      </div>
    </div>
  );
};
