import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export const BrowserGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay appearance slightly for smooth effect after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-3 right-3 z-50 w-72 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="relative filter drop-shadow-2xl">
        
        {/* Arrow pointing up to the 'three dots' */}
        <div className="absolute -top-2 right-4 w-4 h-4 bg-[#0B2F48] border-l border-t border-white/20 rotate-45 z-10"></div>

        {/* Card Body */}
        <div className="bg-[#0B2F48]/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-white shadow-2xl relative z-0">
          <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
            <ExternalLink size={16} className="text-brand-cyan" />
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-cyan">Dica Importante</h3>
          </div>
          
          <p className="text-xs leading-relaxed text-white/90 font-light mb-4">
            Chegou aqui pelo Instagram? <br/>
            Então clique nesses <strong>três pontinhos acima</strong> e selecione para <strong>"Abrir no navegador externo"</strong>.
            <br/><br/>
            <span className="text-brand-cyan/80 italic">Isso garante que a rádio não pause ao minimizar e você pode usar o celular enquanto escuta a melhor rádio do Brasil!</span>
          </p>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full bg-brand-cyan hover:bg-[#2390C0] text-white font-display font-bold text-xs py-2.5 rounded-lg shadow-lg shadow-brand-cyan/20 transition-all active:scale-95"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};