import React, { useRef, useEffect, useState, useCallback } from 'react';

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  const [rotation, setRotation] = useState(0);
  const velocityRef = useRef(0);
  const rotationRef = useRef(0);
  const requestRef = useRef<number>(0);

  const animate = useCallback(() => {
    // Physics Phase
    if (Math.abs(velocityRef.current) > 0.1) {
      rotationRef.current += velocityRef.current;
      velocityRef.current *= 0.95; 
      setRotation(rotationRef.current);
      requestRef.current = requestAnimationFrame(animate);
    } 
    // Snapping Phase
    else {
      // Snap to nearest 180 degrees (Front or Back face)
      const target = Math.round(rotationRef.current / 180) * 180;
      const diff = target - rotationRef.current;
      
      // If far from target, interpolate towards it
      if (Math.abs(diff) > 0.5) {
         rotationRef.current += diff * 0.1;
         setRotation(rotationRef.current);
         requestRef.current = requestAnimationFrame(animate);
      } else {
         // Snapped
         rotationRef.current = target;
         setRotation(target);
         velocityRef.current = 0;
         requestRef.current = 0;
      }
    }
  }, []);

  const handleClick = () => {
    // High velocity for user interaction
    velocityRef.current += 40; 
    if (velocityRef.current > 150) velocityRef.current = 150;
    
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // If already animating, the loop continues picking up new velocity
    }

    if (onClick) {
        setTimeout(() => {
            onClick();
        }, 250);
    }
  };

  // Auto-rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
        // Only spin if currently stable/stopped
        if (Math.abs(velocityRef.current) < 0.5) {
            velocityRef.current = 12; // Enough impulse to flip ~180 degrees
            if (!requestRef.current) {
                requestRef.current = requestAnimationFrame(animate);
            }
        }
    }, 5000);

    return () => clearInterval(interval);
  }, [animate]);

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 mx-auto perspective-1000 z-10 shrink-0 transition-all duration-500">
        <div 
            className="w-full h-full relative cursor-pointer preserve-3d"
            style={{ transform: `rotateY(${rotation}deg)` }}
            onClick={handleClick}
        >
            {/* Front Face - Logo */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-transparent flex items-center justify-center">
                <img 
                    src="/logo.png" 
                    alt="Logo Rádio Clube" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/200/200'; 
                    }}
                />
            </div>
            
            {/* Back Face - Globo */}
            <div 
                className="absolute inset-0 w-full h-full backface-hidden bg-transparent flex items-center justify-center"
                style={{ transform: 'rotateY(180deg)' }}
            >
               <img 
                    src="/globo.png" 
                    alt="Globo Rádio Clube" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/200/200'; 
                    }}
                />
            </div>
        </div>
    </div>
  );
};