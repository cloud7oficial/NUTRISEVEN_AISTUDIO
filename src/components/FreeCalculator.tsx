import React, { useState, useMemo } from 'react';
import { Activity, Goal, Sex } from '../types';
import { activityFactors, calculateNutrition, goalDetails } from '../data/nutritionData';
import { Flame, Droplet, Lock, Sparkles, Check, ArrowRight, Info, ShieldAlert, Award } from 'lucide-react';

interface FreeCalculatorProps {
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
  onOpenAuth: () => void;
}

export const FreeCalculator: React.FC<FreeCalculatorProps> = ({ onOpenCheckout, onOpenAuth }) => {
  // Input State
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState<number>(28);
  const [height, setHeight] = useState<number>(178);
  const [weight, setWeight] = useState<number>(78);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal] = useState<Goal>('lose');

  // Calculation in real-time
  const result = useMemo(() => {
    return calculateNutrition({
      sex,
      age: Math.max(14, Math.min(99, age || 25)),
      height: Math.max(120, Math.min(230, height || 170)),
      weight: Math.max(35, Math.min(250, weight || 70)),
      activity,
      goal,
    });
  }, [sex, age, height, weight, activity, goal]);

  // Macro percentages
  const proteinKcal = result.protein * 4;
  const carbsKcal = result.carbs * 4;
  const fatKcal = result.fat * 9;
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal;

  const proteinPct = Math.round((proteinKcal / totalMacroKcal) * 100);
  const carbsPct = Math.round((carbsKcal / totalMacroKcal) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  return (
    <section id="calculadora" className="relative py-20 bg-[#0B0D13] border-t border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span>Versão Gratuita Liberada</span>
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Calculadora de Calorias & <span className="text-[#00FF87]">Macronutrientes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Insira suas métricas corporais e receba sua recomendação diária exata em segundos. Sem cadastro e sem custo.
          </p>
        </div>

        {/* 2-Column Athletic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#12151F] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-athletic text-xl uppercase tracking-wider text-white">
                1. Seus Dados Corporais
              </h3>
              <span className="text-xs text-slate-400">Tempo estimado: 20s</span>
            </div>

            {/* Sex Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Sexo Biológico
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    sex === 'male'
                      ? 'bg-[#00FF87] text-black border-[#00FF87] shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  Masculino
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    sex === 'female'
                      ? 'bg-[#00FF87] text-black border-[#00FF87] shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  Feminino
                </button>
              </div>
            </div>

            {/* Numeric Fields (Age, Height, Weight) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Idade <span className="text-slate-500">(anos)</span>
                </label>
                <input
                  type="number"
                  min="14"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-3 text-sm font-mono font-bold text-white focus:border-[#00FF87] focus:outline-none focus:ring-1 focus:ring-[#00FF87]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Altura <span className="text-slate-500">(cm)</span>
                </label>
                <input
                  type="number"
                  min="120"
                  max="230"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-3 text-sm font-mono font-bold text-white focus:border-[#00FF87] focus:outline-none focus:ring-1 focus:ring-[#00FF87]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Peso <span className="text-slate-500">(kg)</span>
                </label>
                <input
                  type="number"
                  min="35"
                  max="250"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-3 text-sm font-mono font-bold text-white focus:border-[#00FF87] focus:outline-none focus:ring-1 focus:ring-[#00FF87]"
                />
              </div>
            </div>

            {/* Activity Level Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Nível de Atividade Física
              </label>
              <div className="space-y-2">
                {(Object.keys(activityFactors) as Activity[]).map((key) => {
                  const item = activityFactors[key];
                  const isSelected = activity === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActivity(key)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#00FF87] bg-[#00FF87]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/25'
                      }`}
                    >
                      <div>
                        <span className={`text-xs font-bold block ${isSelected ? 'text-[#00FF87]' : 'text-white'}`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{item.desc}</span>
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {item.factor}x
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Seu Objetivo Principal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(Object.keys(goalDetails) as Goal[]).map((key) => {
                  const item = goalDetails[key];
                  const isSelected = goal === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setGoal(key)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-[#00FF87] bg-[#00FF87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.25)]'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xs font-bold block uppercase">{item.label.split(' / ')[0]}</span>
                      <span className="text-[10px] opacity-80 block mt-0.5">
                        {key === 'lose' ? '-500 kcal' : key === 'gain' ? '+300 kcal' : 'Equilíbrio'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Calculation Results */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Results Box */}
            <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#141824] to-[#0E1119] p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-athletic text-2xl uppercase tracking-wide text-white block">
                    Resultado Recomendado
                  </span>
                  <span className="text-xs text-slate-400">Estimativa calculada em tempo real</span>
                </div>
                <div className="rounded-lg bg-[#00FF87]/20 border border-[#00FF87]/40 px-3 py-1 font-mono text-xs font-bold text-[#00FF87]">
                  GRÁTIS
                </div>
              </div>

              {/* Primary Numbers Highlight */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-black/40 p-4 border border-white/5">
                  <span className="text-xs text-slate-400 block">Metabolismo Basal (TMB)</span>
                  <span className="font-mono text-2xl font-extrabold text-slate-200">
                    {result.bmr.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-500">kcal</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Gasto em repouso total</span>
                </div>

                <div className="rounded-xl bg-black/40 p-4 border border-[#00FF87]/30 bg-[#00FF87]/5">
                  <span className="text-xs text-[#00FF87] font-semibold block">Calorias da Meta (Diárias)</span>
                  <span className="font-mono text-3xl font-extrabold text-[#00FF87]">
                    {result.calories.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-400">kcal</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Gasto total (TDEE): {result.tdee} kcal
                  </span>
                </div>
              </div>

              {/* Macronutrient Distribution Cards */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Divisão de Macronutrientes por Dia
                </span>

                <div className="grid grid-cols-3 gap-3 text-left">
                  {/* Protein */}
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00FF87]">PROTEÍNA</span>
                      <span className="font-mono text-xs text-slate-400">{proteinPct}%</span>
                    </div>
                    <span className="font-mono text-2xl font-extrabold text-white block mt-1">
                      {result.protein}g
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {proteinKcal} kcal · {(result.protein / weight).toFixed(1)}g/kg
                    </span>
                  </div>

                  {/* Carbs */}
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-400">CARBO</span>
                      <span className="font-mono text-xs text-slate-400">{carbsPct}%</span>
                    </div>
                    <span className="font-mono text-2xl font-extrabold text-white block mt-1">
                      {result.carbs}g
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {carbsKcal} kcal · Energia
                    </span>
                  </div>

                  {/* Fat */}
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">GORDURA</span>
                      <span className="font-mono text-xs text-slate-400">{fatPct}%</span>
                    </div>
                    <span className="font-mono text-2xl font-extrabold text-white block mt-1">
                      {result.fat}g
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {fatKcal} kcal · Hormonal
                    </span>
                  </div>
                </div>

                {/* Macro Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 flex mt-2">
                  <div style={{ width: `${proteinPct}%` }} className="h-full bg-[#00FF87]" />
                  <div style={{ width: `${carbsPct}%` }} className="h-full bg-sky-400" />
                  <div style={{ width: `${fatPct}%` }} className="h-full bg-amber-400" />
                </div>
              </div>

              {/* Water Intake recommendation */}
              <div className="flex items-center justify-between rounded-xl bg-sky-950/20 border border-sky-500/20 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Meta de Água Diária</span>
                    <span className="text-[11px] text-slate-400">Para manter o metabolismo acelerado</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-lg font-extrabold text-sky-400">
                    {(result.waterDailyMl / 1000).toFixed(1)} L
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    ~{Math.round(result.waterDailyMl / 250)} copos de 250ml
                  </span>
                </div>
              </div>
            </div>

            {/* TEASER: LOCKED PREMIUM MEAL PLANS */}
            <div className="relative rounded-2xl border border-[#00FF87]/30 bg-[#0F131D] p-6 overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#00FF87]" />
                    <span className="font-athletic text-lg uppercase tracking-wide text-white">
                      Cardápio Detalhado & Refeições
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm">
                    No plano <strong className="text-white">NutriSeven Premium</strong>, suas {result.calories} kcal são divididas em sugestões exatas de pratos com medidas caseiras, lista de mercado e trocas ilimitadas.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-[#00FF87] uppercase px-2.5 py-1 rounded bg-[#00FF87]/10 border border-[#00FF87]/30 whitespace-nowrap shrink-0">
                  Recurso Premium
                </span>
              </div>

              {/* Sample locked meal rows preview */}
              <div className="mt-4 space-y-2 opacity-50 filter blur-[0.5px]">
                {result.mealPlan.slice(0, 3).map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-white/5 p-2.5 text-xs text-slate-300">
                    <span className="font-semibold text-white">{m.name}</span>
                    <span className="font-mono text-slate-400">{m.calories} kcal</span>
                  </div>
                ))}
              </div>

              {/* CTA Overlay to Unlock */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-300 text-center sm:text-left">
                  Tenha seu cardápio personalizado a partir de apenas <strong className="text-[#00FF87]">R$ 9,90/mês</strong>.
                </span>
                <button
                  onClick={() => onOpenCheckout('premium')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#00FF87] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#10B981] transition-all whitespace-nowrap"
                >
                  <span>Desbloquear Cardápio Completo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
