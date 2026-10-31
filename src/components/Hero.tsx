import React from 'react';
import { Zap, Flame, Target, ShieldCheck, ArrowRight, Activity, TrendingUp, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00FF87]/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 right-10 w-[400px] h-[300px] bg-emerald-600/10 blur-[100px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Athletic Value Proposition */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF87]/30 bg-[#00FF87]/10 px-3.5 py-1 text-xs font-bold text-[#00FF87] tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Alta Performance & Precisão Científica</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-athletic text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
              O Fim da Adivinhação <br />
              <span className="text-[#00FF87] drop-shadow-[0_0_25px_rgba(0,255,135,0.4)]">
                Na Sua Dieta
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Calcule seu gasto energético real, descubra a divisão exata de{' '}
              <strong className="text-white">proteínas, carboidratos e gorduras</strong>{' '}
              e desbloqueie o plano alimentar completo com lista inteligente de compras e substituição de pratos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onOpenCheckout('premium')}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#00FF87] px-7 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(0,255,135,0.35)] transition duration-200 hover:bg-[#10B981] hover:shadow-[0_0_35px_rgba(0,255,135,0.5)] active:scale-95"
              >
                <span>Assinar NutriSeven Premium</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:border-[#00FF87]/60 hover:bg-white/10 active:scale-95"
              >
                <span>Testar Calculadora Grátis</span>
              </button>
            </div>

            {/* Immediate Trust Markers */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#00FF87]" />
                <span>Garantia incondicional de 7 dias</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-[#00FF87]" />
                <span>Fórmula Mifflin-St Jeor Validada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-[#00FF87]" />
                <span>Sem cortes radicais ou dietas da moda</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="glow-card-neon rounded-2xl p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-[#00FF87] shadow-[0_0_10px_#00FF87]" />
                  <span className="font-athletic text-lg uppercase tracking-wide text-white">
                    Monitoramento em Tempo Real
                  </span>
                </div>
                <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/30">
                  Modo Atleta
                </span>
              </div>

              {/* Sample Athlete Card */}
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-black/40 p-3.5 border border-white/5">
                  <div>
                    <span className="text-xs text-slate-400 block">Objetivo Definido</span>
                    <span className="text-sm font-bold text-white">Definição / Déficit Controlado</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#00FF87]">
                    -500 kcal/dia
                  </span>
                </div>

                {/* Macro Distribution Visual Rings */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="text-[11px] font-semibold text-slate-400 block">PROTEÍNAS</span>
                    <span className="font-mono text-xl font-extrabold text-[#00FF87]">160g</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">2.0g por kg</span>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="text-[11px] font-semibold text-slate-400 block">CARBOIDRATOS</span>
                    <span className="font-mono text-xl font-extrabold text-sky-400">220g</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Combustível</span>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="text-[11px] font-semibold text-slate-400 block">GORDURAS</span>
                    <span className="font-mono text-xl font-extrabold text-amber-400">55g</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Hormônios</span>
                  </div>
                </div>

                {/* Quick Meal Timeline Teaser */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Cronograma de 4 Refeições</span>
                    <span className="font-mono text-[#00FF87]">2.015 kcal total</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 flex">
                    <div className="h-full bg-[#00FF87] w-[25%]" title="Café (25%)" />
                    <div className="h-full bg-emerald-400 w-[35%]" title="Almoço (35%)" />
                    <div className="h-full bg-teal-400 w-[15%]" title="Lanche (15%)" />
                    <div className="h-full bg-emerald-600 w-[25%]" title="Jantar (25%)" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Café (25%)</span>
                    <span>Almoço (35%)</span>
                    <span>Lanche (15%)</span>
                    <span>Jantar (25%)</span>
                  </div>
                </div>

                {/* Micro CTA */}
                <button
                  onClick={() => onOpenCheckout('premium')}
                  className="w-full mt-2 py-2.5 rounded-lg bg-white/10 hover:bg-[#00FF87] hover:text-black font-athletic text-sm uppercase tracking-wider text-white transition-colors duration-200"
                >
                  Ver Cardápio Completo no Premium →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Quantified Rigor Proof Row */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-[#0E1017]/80 p-6 sm:grid-cols-4 sm:gap-6 backdrop-blur-md">
          <div className="text-left">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00FF87] block">
              +18.400
            </span>
            <span className="text-xs text-slate-400">Planos & cálculos gerados</span>
          </div>
          <div className="text-left">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
              94.2%
            </span>
            <span className="text-xs text-slate-400">Adesão à meta sem desistência</span>
          </div>
          <div className="text-left">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00FF87] block">
              &lt; 30s
            </span>
            <span className="text-xs text-slate-400">Tempo para obter seus macros</span>
          </div>
          <div className="text-left">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
              4.9 / 5
            </span>
            <span className="text-xs text-slate-400">Avaliação média de atletas</span>
          </div>
        </div>
      </div>
    </section>
  );
};
