import React, { useState } from 'react';
import { pricingPlans } from '../data/nutritionData';
import { PlanPricingConfig } from '../types';
import { Check, X, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface PricingComparisonProps {
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
  onScrollToCalculator: () => void;
  plansConfig?: PlanPricingConfig[];
}

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  onOpenCheckout,
  onScrollToCalculator,
  plansConfig,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Merge pricingPlans with custom dynamic configurations if available
  const activePlans = pricingPlans.map((p) => {
    const custom = plansConfig?.find((c) => c.id === p.id);
    if (!custom) return p;
    return {
      ...p,
      monthlyPrice: custom.monthlyPrice,
      annualPrice: custom.annualPrice,
    };
  });

  return (
    <section id="planos" className="relative py-24 bg-[#07080C]">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00FF87]/5 blur-[160px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF87]/30 bg-[#00FF87]/10 px-3.5 py-1 text-xs font-bold text-[#00FF87] uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            <span>Investimento de Alto Retorno</span>
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Planos & Comparativo <span className="text-[#00FF87]">Grátis vs Premium</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Comece calculando gratuitamente hoje ou acelere seus resultados com o plano completo por menos de 33 centavos por dia.
          </p>

          {/* Billing Cycle Switch */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <span
              className={`text-xs font-bold uppercase tracking-wider cursor-pointer ${
                billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Mensal
            </span>

            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-white/10 p-1 transition-colors border border-white/20"
              aria-label="Alternar ciclo de pagamento"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-[#00FF87] shadow-md transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>

            <div
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                billingCycle === 'annual' ? 'text-white' : 'text-slate-500'
              }`}
              onClick={() => setBillingCycle('annual')}
            >
              <span>Anual</span>
              <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#00FF87] text-black">
                Economize 35%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {activePlans.map((plan) => {
            const isFree = plan.id === 'free';
            const isPremium = plan.id === 'premium';
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all relative ${
                  isPremium
                    ? 'glow-card-neon bg-[#10141F] lg:-translate-y-2'
                    : 'border border-white/10 bg-[#0E1119] hover:border-white/20'
                }`}
              >
                {/* Popular Badge */}
                {isPremium && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#00FF87] px-4 py-1 text-[11px] font-athletic font-extrabold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(0,255,135,0.4)]">
                    Mais Popular entre Atletas
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-athletic text-2xl uppercase tracking-wider text-white">
                      {plan.name}
                    </span>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {plan.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-400 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 border-b border-white/10 pb-6">
                    {isFree ? (
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white">
                          R$ 0
                        </span>
                        <span className="text-xs text-slate-400">/ sempre livre</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#00FF87]">
                          R$ {price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-slate-400">/mês</span>
                      </div>
                    )}

                    {!isFree && billingCycle === 'annual' && (
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Cobrado anualmente (R$ {(price * 12).toFixed(2).replace('.', ',')}/ano)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#00FF87]/20 text-[#00FF87] shrink-0 mt-0.5">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/5 text-slate-600 shrink-0 mt-0.5">
                            <X className="h-3 w-3" />
                          </div>
                        )}
                        <span className={feat.included ? 'text-slate-200' : 'text-slate-500'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-8 mt-6 border-t border-white/10">
                  {isFree ? (
                    <button
                      onClick={onScrollToCalculator}
                      className="w-full py-3.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-all"
                    >
                      Usar Calculadora Grátis
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenCheckout(plan.id as 'premium' | 'vip')}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isPremium
                          ? 'bg-[#00FF87] text-black hover:bg-[#10B981] shadow-[0_0_20px_rgba(0,255,135,0.3)] active:scale-95'
                          : 'bg-white/10 text-white hover:bg-[#00FF87] hover:text-black'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 7-Day Guarantee Strip */}
        <div className="mt-14 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0E1119] p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00FF87]/20 text-[#00FF87] shrink-0">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h4 className="font-athletic text-lg uppercase tracking-wide text-white">
              Garantia Incondicional de 7 Dias
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Experimente o NutriSeven Premium. Se por qualquer motivo você não gostar dos cardápios e da precisão dos macros, devolvemos 100% do seu dinheiro. Sem perguntas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
