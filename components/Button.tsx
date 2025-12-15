import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, icon: Icon, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full group relative flex items-center justify-between 
        py-2.5 px-3 sm:p-4 md:py-3 md:px-4 rounded-xl sm:rounded-2xl
        bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20
        backdrop-blur-sm transition-all duration-300
        hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5
        active:scale-[0.99]
        shrink-0
        ${className}
      `}
    >
        <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/5 text-brand-cyan group-hover:text-white group-hover:bg-brand-cyan transition-colors duration-300">
                <Icon size={18} className="sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={1.5} />
            </div>
            <span className="font-display font-medium text-sm sm:text-lg md:text-sm text-white/90 group-hover:text-white transition-colors text-left leading-tight">
                {label}
            </span>
        </div>
        
        <div className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
    </button>
  );
};