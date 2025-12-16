import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Radio, Volume2, VolumeX, Volume1 } from 'lucide-react';

const STREAM_URL = "https://stm1.voxplayer.com.br:7086/stream";

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(false);
  
  // Volume state (0 to 1)
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
      setIsLive(true);
    }
    setIsPlaying(!isPlaying);
  };

  const goLive = () => {
    if (!audioRef.current) return;
    const currentSrc = STREAM_URL; 
    
    // Force reload of stream to ensure we are at the live edge
    audioRef.current.src = ''; 
    audioRef.current.src = currentSrc;
    audioRef.current.load();
    
    // Restore volume
    audioRef.current.volume = isMuted ? 0 : volume;
    
    audioRef.current.play().catch(e => console.error("Playback failed:", e));
    setIsPlaying(true);
    setIsLive(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Determine which icon to show
  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="w-full mx-auto bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 relative group overflow-hidden shrink-0 transition-all duration-300">
      
      <audio ref={audioRef} src={STREAM_URL} preload="none" />

      {/* Visualizer effect background (fake) */}
      <div className={`absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-2 opacity-20 pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-20' : 'opacity-0'}`}>
         {[...Array(20)].map((_, i) => (
             <div key={i} className="w-1 bg-brand-cyan rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 60}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
         ))}
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        
        {/* Top Row: Info & Main Controls */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-brand-cyan text-white shadow-[0_0_15px_rgba(45,170,225,0.5)]' : 'bg-white/10 text-white/50'}`}>
                    <Radio size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-cyan uppercase mb-0.5 flex items-center gap-1">
                        {isPlaying ? <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> : null}
                        {isPlaying ? 'No Ar' : 'Offline'}
                    </span>
                    <span className="text-white font-display font-bold text-sm sm:text-base">94.1 FM</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button 
                    onClick={goLive}
                    className={`
                        px-2 py-0.5 rounded border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all
                        ${isLive && isPlaying 
                            ? "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:bg-red-500/30" 
                            : "bg-white/5 hover:bg-white/10 border-white/10 text-white/60 hover:text-white"
                        }
                    `}
                >
                    Ao Vivo
                </button>

                <button 
                    onClick={togglePlay}
                    className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white text-brand-dark shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                    {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" fill="currentColor" /> : <Play size={16} className="sm:w-5 sm:h-5 ml-0.5" fill="currentColor" />}
                </button>
            </div>
        </div>

        {/* Bottom Row: Volume Control */}
        <div className="flex items-center gap-3 px-1 border-t border-white/5 pt-2 mt-1">
            <button 
                onClick={toggleMute}
                className="text-white/50 hover:text-brand-cyan transition-colors active:scale-95"
            >
                <VolumeIcon size={16} />
            </button>
            
            <div className="relative w-full h-4 flex items-center group/slider">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-brand-cyan [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(45,170,225,0.5)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-125"
                />
            </div>
        </div>

      </div>
    </div>
  );
};