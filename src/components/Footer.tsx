import React from 'react';
import { Zap, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenCheckout, onOpenAdmin }) => {
  return (
    <footer className="border-t border-white/10 bg-[#05060A] pt-16 pb-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2 text-2xl font-extrabold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00FF87] text-black">
                <Zap className="h-4 w-4 fill-black stroke-black" />
              </span>
              <span className="font-athletic text-2xl tracking-wide uppercase">
                NUTRI<span className="text-[#00FF87]">SEVEN</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Plataforma de alta performance para cálculo de macronutrientes, projeção de resultados e gestão alimentar descomplicada.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-[#00FF87]" />
              <span>Privacidade garantida · Sem anúncios invasivos</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Navegação Rápida
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollTo('calculadora')}
                  className="hover:text-[#00FF87] transition-colors"
                >
                  Calculadora Grátis de Calorias e Macros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('projecao')}
                  className="hover:text-[#00FF87] transition-colors"
                >
                  Calculadora de Projeção de Metas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('substitutos')}
                  className="hover:text-[#00FF87] transition-colors"
                >
                  Guia de Alimentos Substitutos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('planos')}
                  className="hover:text-[#00FF87] transition-colors"
                >
                  Planos & Assinatura NutriSeven Premium
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white text-slate-500 transition-colors flex items-center gap-1.5 pt-1"
                >
                  <Lock className="h-3 w-3" />
                  <span>Área do Administrador</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CTA Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Pronto para Começar?
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Junte-se a milhares de pessoas que transformaram seus hábitos sem cortar o que gostam.
            </p>
            <button
              onClick={() => onOpenCheckout('premium')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00FF87] hover:bg-[#10B981] font-bold text-xs uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.25)]"
            >
              Assinar NutriSeven Premium
            </button>
          </div>
        </div>

        {/* Medical / Scientific Disclaimer */}
        <div className="pt-8 border-t border-white/5 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-400">Aviso Científico & Legal:</strong> Os cálculos fornecidos pelo NutriSeven têm fins exclusivamente informativos e educacionais, fundamentados na equação de Mifflin-St Jeor e diretrizes da Sociedade Internacional de Nutrição Esportiva (ISSN). Esta ferramenta não substitui o diagnóstico, prescrição ou acompanhamento clínico individualizado realizado por médicos ou nutricionistas registrados.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-slate-500">
            <span>© {new Date().getFullYear()} NutriSeven. Todos os direitos reservados.</span>
            <span>Construído com alta performance & precisão matemática.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
