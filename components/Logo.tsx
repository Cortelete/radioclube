import React, { useRef, useEffect, useState, useCallback } from 'react';

export const Logo: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const velocityRef = useRef(0);
  const rotationRef = useRef(0);
  const requestRef = useRef<number>(0);

  const animate = useCallback(() => {
    if (Math.abs(velocityRef.current) > 0.1) {
      rotationRef.current += velocityRef.current;
      velocityRef.current *= 0.95; 
      setRotation(rotationRef.current);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      const remainder = rotationRef.current % 360;
      if (Math.abs(velocityRef.current) > 0) {
         const target = Math.round(rotationRef.current / 360) * 360;
         const diff = target - rotationRef.current;
         
         if (Math.abs(diff) > 0.5) {
             rotationRef.current += diff * 0.1;
             setRotation(rotationRef.current);
             requestRef.current = requestAnimationFrame(animate);
         } else {
             rotationRef.current = target;
             setRotation(target);
             velocityRef.current = 0;
         }
      }
    }
  }, []);

  const handleClick = () => {
    velocityRef.current += 30;
    if (velocityRef.current > 100) velocityRef.current = 100;
    if (!requestRef.current || Math.abs(velocityRef.current) > 0.1) {
      cancelAnimationFrame(requestRef.current!);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-40 sm:h-40 mx-auto perspective-1000 z-10 shrink-0">
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
                    className="w-full h-full object-contain"
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
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/200/200'; 
                    }}
                />
            </div>
        </div>
    </div>
  );
};