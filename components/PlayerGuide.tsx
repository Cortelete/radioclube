import React from 'react';
import { Volume2, Radio, Play, CheckCircle } from 'lucide-react';

interface PlayerGuideProps {
  onClose: () => void;
}

export const PlayerGuide: React.FC<PlayerGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-500">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0B2F48]/90 backdrop-blur-md" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-gradient-to-br from-[#103450] to-[#051826] border border-brand-cyan/30 rounded-3xl shadow-[0_0_50px_rgba(45,170,225,0.2)] p-6 sm:p-8 flex flex-col gap-6 transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-bold text-white tracking-wide">
            Player Rádio Clube
          </h2>
          <p className="text-brand-cyan text-sm uppercase tracking-widest font-medium">
            Guia Rápido
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 bg-brand-cyan/20 rounded-lg text-brand-cyan shrink-0">
              <Volume2 size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Controle de Volume</h3>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                Ajuste o volume na barra deslizante. Se estiver sem som, verifique se não está no mudo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 bg-brand-cyan/20 rounded-lg text-brand-cyan shrink-0">
              <Radio size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Modo Ao Vivo</h3>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                Sua rádio atrasou? Clique no botão <strong>"AO VIVO"</strong> para sincronizar em tempo real.
              </p>
            </div>
          </div>

           <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 bg-brand-cyan/20 rounded-lg text-brand-cyan shrink-0">
              <Play size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Play Automático</h3>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                A rádio já está tocando! Se o navegador bloquear, clique abaixo para liberar o som.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full group bg-brand-cyan hover:bg-[#2390C0] text-white font-display font-bold py-4 rounded-xl shadow-lg shadow-brand-cyan/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Entendi, Ouvir Agora</span>
          <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />
        </button>

      </div>
    </div>
  );
};