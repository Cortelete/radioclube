import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ModalType } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: ModalType;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setShow(false), 300);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!show && !isOpen) return null;

  return (
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#051826]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Content */}
      <div 
        className={`
            relative w-full max-w-md bg-[#0B2F48] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[85vh]
            transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
            ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-xl font-display text-white font-bold tracking-tight">
                {title}
            </h2>
            <button 
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-white/80">
            {children}
        </div>
      </div>
    </div>
  );
};