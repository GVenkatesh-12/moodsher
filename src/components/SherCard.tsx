import React from 'react';
import { useState } from 'react';
import { Sher, Language, ViewMode } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { BookOpen, Info, Tag, Heart, Share2, Bookmark } from 'lucide-react';
import { CreditsModal } from './CreditsModal';

interface SherCardProps {
  sher: Sher;
  language: Language;
  viewMode: ViewMode;
}

const genreColors: Record<string, string> = {
  Love: 'from-rose-500 to-pink-500',
  Emotional: 'from-blue-500 to-indigo-500',
  Philosophy: 'from-purple-500 to-violet-500',
  Nature: 'from-green-500 to-emerald-500',
  Spiritual: 'from-amber-500 to-orange-500',
  Motivation: 'from-red-500 to-orange-500'
};

export const SherCard: React.FC<SherCardProps> = ({ sher, language, viewMode }) => {
  const content = language === 'hindi' ? sher.hindi : sher.english;
  const [showCredits, setShowCredits] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  if (viewMode === 'flow') {
    // Flow Mode - Instagram Reels/YouTube Shorts style
    return (
      <>
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-3xl shadow-2xl overflow-hidden relative min-h-[80vh] flex flex-col justify-between animate-slide-up">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-amber-400/20"></div>
          </div>

          {/* Top Section */}
          <div className="relative z-10 p-6">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-stone-700">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400"></div>
            </div>
            
            {/* Genre Badge */}
            <div className="flex justify-between items-start mt-2">
              <div className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${genreColors[sher.genre]} shadow-lg`}>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>{sher.genre}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isBookmarked 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowCredits(true)}
                  className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-all duration-300"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Poetry Content - Centered */}
          <div className="flex-1 flex items-center justify-center px-8 relative z-10">
            <div className="text-center max-w-lg">
              {/* Decorative Quote */}
              <div className="text-8xl text-amber-400/30 font-serif leading-none select-none mb-4">
                "
              </div>
              
              {/* Poetry Text */}
              <blockquote 
                className={`mb-6 ${
                  language === 'hindi' 
                    ? 'text-2xl md:text-3xl leading-relaxed font-medium text-white' 
                    : 'text-xl md:text-2xl leading-relaxed text-white'
                }`}
                style={{
                  fontFamily: language === 'hindi' 
                    ? '"Noto Sans Devanagari", "Devanagari Sangam MN", serif' 
                    : '"Inter", "Georgia", serif'
                }}
              >
                {content.text.split('\n').map((line, index) => (
                  <div key={index} className="mb-3">
                    {line}
                  </div>
                ))}
              </blockquote>

              {/* Poet Attribution */}
              <div className="text-amber-300 text-lg font-medium">
                — {content.poet}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between">
              {/* Audio Player */}
              <div className="flex-1">
                <AudioPlayer audioFile={sher.audioFile} />
              </div>
              
              {/* Social Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">
                    {isLiked ? 'Liked' : 'Like'}
                  </span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Bottom Border */}
          <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"></div>
        </div>

        {/* Credits Modal */}
        <CreditsModal
          sher={sher}
          language={language}
          isOpen={showCredits}
          onClose={() => setShowCredits(false)}
        />
      </>
    );
  }

  // Normal Mode - Original Card Design
  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-stone-100 overflow-hidden relative">
        {/* Credits Info Button */}
        <button
          onClick={() => setShowCredits(true)}
          className="absolute top-4 right-4 w-8 h-8 bg-stone-100 hover:bg-amber-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110"
          title="View Credits"
        >
          <Info className="w-4 h-4 text-stone-600 hover:text-amber-600" />
        </button>

      {/* Card Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-stone-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-700">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">
              Sher
            </span>
          </div>
          {/* Genre Tag */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${genreColors[sher.genre]} shadow-sm`}>
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>
                {sher.genre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Poetry Content */}
      <div className="p-6 space-y-4">
        <div className="relative">
          <div className="absolute -left-2 -top-2 text-6xl text-amber-200 font-serif leading-none select-none">
            "
          </div>
          <blockquote 
            className={`relative z-10 ${
              language === 'hindi' 
                ? 'text-lg leading-relaxed font-medium text-stone-800' 
                : 'text-base leading-relaxed text-stone-700'
            }`}
            style={{
              fontFamily: language === 'hindi' 
                ? '"Noto Sans Devanagari", "Devanagari Sangam MN", serif' 
                : '"Inter", "Georgia", serif'
            }}
          >
            {content.text.split('\n').map((line, index) => (
              <div key={index} className="mb-2">
                {line}
              </div>
            ))}
          </blockquote>
        </div>

        {/* Poet Attribution */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="text-stone-500 text-sm">
            <span className="font-medium">
              — {content.poet}
            </span>
          </div>
          <AudioPlayer audioFile={sher.audioFile} />
        </div>
      </div>

      {/* Decorative Element */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>

      {/* Credits Modal */}
      <CreditsModal
        sher={sher}
        language={language}
        isOpen={showCredits}
        onClose={() => setShowCredits(false)}
      />
    </>
  );
};