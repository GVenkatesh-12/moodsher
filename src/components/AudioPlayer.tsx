import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  audioFile: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioFile, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    
    // Set the audio source
    audio.src = audioFile;
    
    // Force load the audio
    audio.load();
    
    // Add timeout for loading
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('Audio loading timeout');
      }
    }, 10000); // 10 second timeout
    
    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
      clearTimeout(loadingTimeout);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      setError(null);
      clearTimeout(loadingTimeout);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      if (target.error) {
        let errorMessage = 'Failed to load audio';
        switch (target.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = 'Audio loading aborted';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error loading audio';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = 'Audio decoding error';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Audio format not supported';
            break;
          default:
            errorMessage = `Audio error: ${target.error.message}`;
        }
        setError(errorMessage);
      } else {
        setError('Failed to load audio');
      }
      setIsLoading(false);
      clearTimeout(loadingTimeout);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      clearTimeout(loadingTimeout);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [audioFile]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        setError(`Failed to play audio: ${err.message}`);
      });
    }
  };

  if (error) {
    return (
      <div className={`flex items-center ${className}`}>
        <button
          disabled
          className="group flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-md opacity-50 cursor-not-allowed"
        >
          <Volume2 className="w-4 h-4" />
          <span className="text-sm font-medium">Error</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className="group flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
        <Volume2 className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
        <span className="text-sm font-medium">
          {isPlaying ? 'Pause' : 'Play'}
        </span>
      </button>
      
      <audio ref={audioRef} preload="none" controls={false} />
    </div>
  );
};