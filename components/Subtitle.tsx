import React, { useState, useEffect } from 'react';

const PHRASES = [
  "A Rádio da comunidade! 85 anos!",
  "Sintonize a alegria, viva a emoção.",
  "O Senhor é o meu pastor e nada me faltará.",
  "Música boa e informação de qualidade.",
  "Tudo posso naquele que me fortalece.",
  "A voz de Ponta Grossa.",
  "Fé, esperança e boa música.",
  "Conectando você ao melhor do rádio.",
  "Se Deus é por nós, quem será contra nós?",
];

export const Subtitle: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        setFade(true);
      }, 500); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 sm:h-12 flex items-center justify-center w-full px-2 overflow-hidden">
      <p 
        className={`
          text-sm sm:text-base text-brand-cyan font-medium font-sans text-center tracking-wide
          transition-all duration-500 transform
          ${fade ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2 blur-sm'}
        `}
      >
        {PHRASES[index]}
      </p>
    </div>
  );
};