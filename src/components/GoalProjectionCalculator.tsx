import React, { useState, useMemo } from 'react';
import { Calendar, Target, TrendingUp, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface GoalProjectionProps {
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
}

export const GoalProjectionCalculator: React.FC<GoalProjectionProps> = ({ onOpenCheckout }) => {
  const [currentWeight, setCurrentWeight] = useState<number>(84);
  const [targetWeight, setTargetWeight] = useState<number>(75);
  const [pace, setPace] = useState<number>(0.5); // kg per week

  const projection = useMemo(() => {
    const diff = Math.abs(currentWeight - targetWeight);
    const isLosing = currentWeight > targetWeight;
    const isGaining = targetWeight > currentWeight;
    const isMaintaining = diff === 0;

    // 1 kg of fat is ~7,700 kcal. 
    // Losing 0.5 kg / week requires ~3,850 kcal deficit / week (~550 kcal / day).
    const effectivePace = isGaining ? pace * 0.6 : pace; // Lean mass gain is naturally slower
    const weeksNeeded = effectivePace > 0 ? Math.ceil(diff / effectivePace) : 0;
    const daysNeeded = weeksNeeded * 7;

    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + daysNeeded);

    const dailyCalorieAdjustment = isLosing
      ? -Math.round((pace * 7700) / 7)
      : isGaining
      ? Math.round((pace * 5000) / 7)
      : 0;

    // Milestones at 25%, 50%, 75%, 100%
    const milestones = [0.25, 0.5, 0.75, 1.0].map((fraction) => {
      const milestoneDays = Math.round(daysNeeded * fraction);
      const mDate = new Date();
      mDate.setDate(today.getDate() + milestoneDays);
      const mWeight = isLosing
        ? (currentWeight - diff * fraction).toFixed(1)
        : (currentWeight + diff * fraction).toFixed(1);

      return {
        pct: Math.round(fraction * 100),
        weight: Number(mWeight),
        date: mDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      };
    });

    return {
      diff: Number(diff.toFixed(1)),
      isLosing,
      isGaining,
      isMaintaining,
      weeksNeeded,
      daysNeeded,
      targetDateFormatted: targetDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      dailyCalorieAdjustment,
      milestones,
    };
  }, [currentWeight, targetWeight, pace]);

  return (
    <section id="projecao" className="relative py-20 bg-[#07080C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF87]/30 bg-[#00FF87]/10 px-3.5 py-1 text-xs font-bold text-[#00FF87] uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5" />
            <span>Planejamento Temporal Estratégico</span>
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Projeção de Tempo Para <span className="text-[#00FF87]">Sua Meta</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Saiba em quantas semanas você chegará no seu peso ideal com um déficit sustentável e sem perda de massa magra.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0E1119] p-6 sm:p-8 space-y-6">
            <h3 className="font-athletic text-xl uppercase tracking-wider text-white border-b border-white/10 pb-3">
              Configurar Meta Corporal
            </h3>

            {/* Weights Input */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Peso Atual (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="40"
                    max="220"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-3 text-base font-mono font-bold text-white focus:border-[#00FF87] focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-3.5 font-mono text-xs text-slate-500">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00FF87] mb-1.5">
                  Peso Meta (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="40"
                    max="220"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#00FF87]/40 bg-black/40 px-3.5 py-3 text-base font-mono font-bold text-[#00FF87] focus:border-[#00FF87] focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-3.5 font-mono text-xs text-[#00FF87]/60">kg</span>
                </div>
              </div>
            </div>

            {/* Pace Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Ritmo Semanal de Evolução
                </label>
                <span className="font-mono text-xs font-bold text-[#00FF87]">
                  {pace} kg / semana
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 0.3, label: 'Moderado', desc: '~0.3 kg/sem' },
                  { value: 0.5, label: 'Recomendado', desc: '~0.5 kg/sem' },
                  { value: 0.8, label: 'Atleta', desc: '~0.8 kg/sem' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPace(item.value)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      pace === item.value
                        ? 'border-[#00FF87] bg-[#00FF87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.2)]'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold block uppercase">{item.label}</span>
                    <span className="text-[10px] opacity-80 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Card */}
            <div className="rounded-xl bg-white/5 p-4 border border-white/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Diretriz de Ingestão Diária
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Para atingir <strong className="text-white">{targetWeight} kg</strong> no ritmo de{' '}
                <strong className="text-[#00FF87]">{pace} kg/semana</strong>, seu balanço calórico deve ter um ajuste diário de:
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-mono text-xl font-extrabold text-[#00FF87]">
                  {projection.dailyCalorieAdjustment > 0 ? `+${projection.dailyCalorieAdjustment}` : projection.dailyCalorieAdjustment} kcal
                </span>
                <span className="text-xs text-slate-400">em relação ao seu gasto energético total (TDEE).</span>
              </div>
            </div>
          </div>

          {/* Results & Milestones Projection Card */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#12151F] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Linha do Tempo Calculada
                </span>
                <span className="font-athletic text-2xl uppercase tracking-wide text-white">
                  {projection.diff} kg {projection.isLosing ? 'a eliminar' : 'a construir'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-3xl font-extrabold text-[#00FF87]">
                  {projection.weeksNeeded} <span className="text-sm font-normal text-slate-400">semanas</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  (~{projection.daysNeeded} dias de foco)
                </span>
              </div>
            </div>

            {/* Target Date Box */}
            <div className="rounded-xl border border-[#00FF87]/30 bg-[#00FF87]/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF87] text-black">
                  <Calendar className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Data Estimada de Chegada na Meta
                  </span>
                  <span className="text-lg font-bold text-white">
                    {projection.targetDateFormatted}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-[#00FF87] bg-black/40 px-3 py-1.5 rounded-lg border border-[#00FF87]/30 whitespace-nowrap">
                Foco 100% Sustentável
              </span>
            </div>

            {/* Milestone Roadmap */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Marcos Intermediários de Vitória
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {projection.milestones.map((m, idx) => (
                  <div key={idx} className="rounded-xl bg-white/5 p-3 border border-white/5 text-center">
                    <span className="font-mono text-xs font-bold text-[#00FF87] block">
                      {m.pct}% da Meta
                    </span>
                    <span className="font-mono text-lg font-extrabold text-white block mt-1">
                      {m.weight} kg
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Previsto: {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span>
                Quer registrar seu peso toda semana e ver gráficos reais da sua evolução?
              </span>
              <button
                onClick={() => onOpenCheckout('premium')}
                className="font-bold text-[#00FF87] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Acompanhar no NutriSeven Premium</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
