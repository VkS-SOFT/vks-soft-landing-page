import React, { useState, useEffect } from 'react';
import { VksLogo } from './VksLogo';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Engenharia & Stack', href: '#arquitetura' },
    { label: 'Cases & Impacto', href: '#cases' },
    { label: 'Processo', href: '#processo' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-vks-black/80 backdrop-blur-xl border-b border-vks-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 focus:outline-none group"
          aria-label="VKS Soft Home"
        >
          <VksLogo className="h-11 sm:h-12" showSubtitle={true} variant="dark" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-2 rounded-full glass-panel">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-sm font-medium text-vks-white/80 hover:text-white rounded-full hover:bg-vks-primary/20 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#diagnostico"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-vks-primary hover:bg-vks-primaryGlow text-white font-semibold text-sm shadow-vks-glow hover:shadow-vks-glow-lg transition-all duration-300 group overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-vks-white/90" />
            <span>Iniciar Projeto</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl glass-panel text-vks-white hover:text-white focus:outline-none"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl glass-panel border border-vks-primary/30 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-vks-white hover:bg-vks-primary/20"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-vks-white/10">
            <a
              href="#diagnostico"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-vks-primary text-white font-semibold text-sm shadow-vks-glow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Solicitar Proposta Técnica</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
