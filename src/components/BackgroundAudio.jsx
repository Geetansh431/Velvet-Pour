import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

const BackgroundAudio = ({ 
  audioSrc = "/videos/Riptide.mp3",
  startTime = 85, // 1:25 in seconds
  volume = 0.5
}) => {
  // State for toggling audio - START WITH AUDIO ENABLED
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Ref for audio element
  const audioElementRef = useRef(null);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Auto-start audio on first user interaction
  useEffect(() => {
    const enableAudioOnInteraction = async () => {
      if (!hasUserInteracted && audioElementRef.current) {
        try {
          if (isAudioPlaying) {
            // Set start time and play
            audioElementRef.current.currentTime = startTime;
            await audioElementRef.current.play();
            setHasUserInteracted(true);
            console.log('Audio started from', startTime, 'seconds');
          }
        } catch (error) {
          console.log('Autoplay blocked, waiting for user interaction:', error);
        }
      }
    };

    const handleFirstInteraction = async () => {
      if (!hasUserInteracted && isAudioPlaying && audioElementRef.current) {
        try {
          audioElementRef.current.currentTime = startTime;
          await audioElementRef.current.play();
          setHasUserInteracted(true);
          console.log('Audio started on user interaction');
          
          // Remove event listeners after first successful play
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        } catch (error) {
          console.log('Failed to start audio:', error);
        }
      }
    };

    // Try to start audio immediately
    enableAudioOnInteraction();

    // Add event listeners for first user interaction
    if (!hasUserInteracted) {
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasUserInteracted, isAudioPlaying, startTime]);

  // Set audio volume and handle looping from custom start time
  useEffect(() => {
    const audio = audioElementRef.current;
    if (audio) {
      audio.volume = volume;
      
      // Handle custom loop (restart from startTime when ended)
      const handleEnded = () => {
        if (audio && isAudioPlaying) {
          audio.currentTime = startTime;
          audio.play().catch(console.error);
        }
      };

      const handleTimeUpdate = () => {
        // Ensure we don't go before start time
        if (audio.currentTime < startTime) {
          audio.currentTime = startTime;
        }
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [volume, startTime, isAudioPlaying]);

  // Manage audio playback
  useEffect(() => {
    if (hasUserInteracted && audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.currentTime = startTime;
        audioElementRef.current.play().catch(console.error);
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying, hasUserInteracted, startTime]);

  return (
    <button
      onClick={toggleAudioIndicator}
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3 hover:bg-white/20 transition-all duration-300"
      title={isAudioPlaying ? 'Pause background music' : 'Play background music'}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioElementRef}
        className="hidden"
        src={audioSrc}
        preload="auto"
        playsInline
      />
      
      {/* Audio indicator bars */}
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={clsx(
            "w-1 bg-white rounded-full transition-all duration-300",
            {
              "h-2 animate-pulse": isIndicatorActive,
              "h-1 opacity-40": !isIndicatorActive,
            }
          )}
          style={{
            animationDelay: isIndicatorActive ? `${bar * 0.1}s` : '0s',
            animationDuration: '0.6s',
            height: isIndicatorActive ? `${Math.random() * 8 + 4}px` : '4px'
          }}
        />
      ))}
    </button>
  );
};

export default BackgroundAudio;
