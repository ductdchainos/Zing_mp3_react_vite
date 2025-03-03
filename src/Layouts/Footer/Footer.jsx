import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import PropTypes from 'prop-types';

const Footer = ({ currentSong, isPlaying, togglePlay, onNext, onPrevious }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Reset audio when song changes
    if (currentSong && audioRef.current) {
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback failed:", err));
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    // Handle play/pause state changes
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.play().catch(err => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Add event listeners to audio element
    const audio = audioRef.current;
    
    // Guard clause to prevent accessing methods on null
    if (!audio) return;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      if (isRepeatOn) {
        audio.currentTime = 0;
        audio.play().catch(err => console.error("Repeat playback failed:", err));
      } else {
        onNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [isRepeatOn, onNext, currentSong]);

  // Set CSS variable for footer height
  useEffect(() => {
    if (footerRef.current) {
      const footerHeight = footerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    }

    return () => {
      document.documentElement.style.setProperty('--footer-height', '0px');
    };
  }, [currentSong]);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const progressBar = progressBarRef.current;
    if (!progressBar || !audioRef.current) return;
    
    const percent = e.nativeEvent.offsetX / progressBar.clientWidth;
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };

  const handlePlayPause = () => {
    togglePlay();
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  return (
    <div 
      ref={footerRef}
      className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-3 z-100"
    >
      {currentSong && (
        <audio 
          ref={audioRef} 
          src={currentSong.source} 
        />
      )}
      
      {currentSong && (
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main content container with flex layout */}
          <div className="flex items-center">
            {/* Left side - Song info */}
            <div className="w-1/5">
              <div className="font-medium text-white text-sm truncate">{currentSong.name}</div>
              <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
            </div>
            
            {/* Center - Playback controls and progress */}
            <div className="w-3/5 flex flex-col items-center">
              {/* Playback controls - above progress bar */}
              <div className="flex justify-center items-center space-x-8 mb-2">
                <button 
                  onClick={toggleShuffle}
                  className={`focus:outline-none ${isShuffleOn ? 'text-green-500' : 'text-gray-400'} hover:text-white transition-colors`}
                >
                  <Shuffle size={16} />
                </button>
                
                <button 
                  onClick={onPrevious}
                  className="focus:outline-none text-white"
                >
                  <SkipBack size={20} />
                </button>
                
                <button 
                  onClick={handlePlayPause}
                  className="p-2 bg-white rounded-full text-black focus:outline-none hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                
                <button 
                  onClick={onNext}
                  className="focus:outline-none text-white"
                >
                  <SkipForward size={20} />
                </button>
                
                <button 
                  onClick={toggleRepeat}
                  className={`focus:outline-none ${isRepeatOn ? 'text-green-500' : 'text-gray-400'} hover:text-white transition-colors`}
                >
                  <Repeat size={16} />
                </button>
              </div>
              
              {/* Progress bar with timestamps - below controls */}
              <div className="flex items-center w-full">
                <div className="text-xs text-white mr-2 w-10 text-right">{formatTime(currentTime)}</div>
                
                <div 
                  ref={progressBarRef}
                  className="flex-grow h-1.5 bg-gray-700 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={handleProgressChange}
                >
                  <div 
                    className="h-full bg-white" 
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-white ml-2 w-10">{formatTime(duration)}</div>
              </div>
            </div>
            
            {/* Right side - Volume (placeholder for future implementation) */}
            <div className="w-1/5 flex justify-end">
              {/* This space can be used for volume controls or additional features */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Footer.propTypes = {
  currentSong: PropTypes.shape({
    source: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }),
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default Footer;