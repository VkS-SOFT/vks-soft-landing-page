import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = import.meta.env.VITE_VKS_WHATSAPP || '5586995615930';
  const defaultMsg = encodeURIComponent(
    'Olá! Vim pela Landing Page da VKS Soft e gostaria de conversar sobre um projeto de software/automação.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com especialista VKS Soft no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 p-1.5 pr-5 rounded-full bg-vks-black/90 backdrop-blur-xl border border-vks-primary/50 shadow-vks-glow hover:border-vks-primary transition-all duration-300 hover:scale-105"
    >
      <div className="w-11 h-11 rounded-full bg-vks-primary flex items-center justify-center text-white shadow-md">
        <MessageCircle className="w-5 h-5 fill-current" />
      </div>
      <div className="text-left">
        <span className="block text-[10px] font-mono uppercase tracking-wider text-emerald-400">
          ● Especialista Online
        </span>
        <span className="block text-xs font-semibold text-white group-hover:text-vks-primaryGlow transition-colors">
          Falar no WhatsApp
        </span>
      </div>
    </a>
  );
};
