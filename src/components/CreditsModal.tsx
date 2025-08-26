import React from 'react';
import { X, User, Mic, BookOpen, ExternalLink } from 'lucide-react';
import { Sher, Language } from '../types';

interface CreditsModalProps {
  sher: Sher;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ 
  sher, 
  language, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              Credits
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-amber-100 transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Original Poet */}
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <User className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-stone-800 mb-1">
                Original Poet
              </h4>
              <p className="text-stone-600 text-sm">{sher.credits.originalPoet}</p>
            </div>
          </div>

          {/* Translator */}
          {sher.credits.translator && (
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-800 mb-1">
                  Translator
                </h4>
                <p className="text-stone-600 text-sm">{sher.credits.translator}</p>
              </div>
            </div>
          )}

          {/* Audio Artist */}
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Mic className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-stone-800 mb-1">
                Voice Artist
              </h4>
              <p className="text-stone-600 text-sm">{sher.credits.audioArtist}</p>
            </div>
          </div>

          {/* Source */}
          {sher.credits.source && (
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <ExternalLink className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-800 mb-1">
                  Source
                </h4>
                <p className="text-stone-600 text-sm">{sher.credits.source}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4 rounded-b-2xl">
          <p className="text-xs text-stone-500 text-center">
            Respect all artists and their work
          </p>
        </div>
      </div>
    </div>
  );
};