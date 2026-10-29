import React from 'react';
import { VksLogo } from './VksLogo';
import { ArrowUpRight, Code2, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-vks-white/10 bg-[#141318]/90 backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-vks-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <VksLogo className="h-12" showSubtitle={true} variant="dark" />
            <p className="text-sm text-vks-white/70 max-w-sm leading-relaxed pt-2">
              Software especialista em construção civil e mercado imobiliário: sistemas, apps e sites para construtoras, imobiliárias e escritórios de engenharia e arquitetura.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-vks-white/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-vks-primaryGlow" />
                ConTech & PropTech
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-vks-primaryGlow" />
                Formação em Edificações
              </span>
            </div>
          </div>

          {/* Soluções */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-vks-primaryGlow font-semibold">
              Segmentos Atendidos
            </h4>
            <ul className="space-y-2.5 text-sm text-vks-white/75">
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  Construtoras & Incorporadoras
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  Imobiliárias & Avaliação de Imóveis
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  Escritórios de Engenharia & Arquitetura
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors">
                  Clientes: Avalui & Luminar Solar
                </a>
              </li>
            </ul>
          </div>

          {/* Contato Direto */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-vks-primaryGlow font-semibold">
              Contato & Comercial
            </h4>
            <ul className="space-y-2.5 text-sm text-vks-white/75">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-vks-primaryGlow shrink-0" />
                <span>contato@vkssoft.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-vks-primaryGlow shrink-0" />
                <span>Brasil • Atendimento Global</span>
              </li>
            </ul>
            <div className="pt-3">
              <a
                href="#diagnostico"
                className="inline-flex items-center gap-2 text-xs font-mono text-white bg-vks-primary/25 hover:bg-vks-primary border border-vks-primary/50 px-4 py-2.5 rounded-xl transition-all"
              >
                <span>Solicitar Proposta Técnica</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-vks-white/50 font-mono">
          <p>© {new Date().getFullYear()} VKS Soft. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#501BED]" />
              #501BED
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E2E2E2]" />
              #E2E2E2
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1B1A1F] border border-white/20" />
              #1B1A1F
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
