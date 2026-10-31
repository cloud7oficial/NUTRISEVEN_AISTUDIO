import React from 'react';
import { testimonials } from '../data/nutritionData';
import { Award, CheckCircle2, Star, TrendingUp } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-20 bg-[#0B0D14] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-[#00FF87]" />
            <span>Resultados Reais & Mensuráveis</span>
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Quem Usa, <span className="text-[#00FF87]">Transforma</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Pessoas reais alcançando o melhor físico da vida com controle matemático de macronutrientes.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#121520] p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-white/25 transition-all"
            >
              <div className="space-y-4">
                {/* Metric Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#00FF87]/10 px-3 py-1 border border-[#00FF87]/30">
                  <TrendingUp className="h-3.5 w-3.5 text-[#00FF87]" />
                  <span className="font-mono text-xs font-extrabold text-[#00FF87]">
                    {t.result}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-white/20 text-[#00FF87] font-bold text-sm">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{t.name}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#00FF87]" />
                  </div>
                  <span className="text-xs text-slate-400 block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
