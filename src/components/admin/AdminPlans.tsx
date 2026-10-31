import React, { useState } from 'react';
import { PlanPricingConfig } from '../../types';
import { Sliders, Save, CheckCircle2, RotateCcw, Zap } from 'lucide-react';
import { INITIAL_PLANS_CONFIG } from '../../data/adminStore';

interface AdminPlansProps {
  plansConfig: PlanPricingConfig[];
  onSavePlansConfig: (newConfigs: PlanPricingConfig[]) => void;
}

export const AdminPlans: React.FC<AdminPlansProps> = ({
  plansConfig,
  onSavePlansConfig,
}) => {
  const [configs, setConfigs] = useState<PlanPricingConfig[]>(plansConfig);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handlePriceChange = (id: string, field: 'monthlyPrice' | 'annualPrice', val: number) => {
    setConfigs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: Math.max(0, val) } : c))
    );
  };

  const handleSave = () => {
    onSavePlansConfig(configs);
    showFeedback('Preços dos planos atualizados com sucesso e refletidos na Landing Page!');
  };

  const handleReset = () => {
    setConfigs(INITIAL_PLANS_CONFIG);
    onSavePlansConfig(INITIAL_PLANS_CONFIG);
    showFeedback('Preços restaurados para os valores padrão.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border border-[#00FF87]/50 bg-[#0F141F] px-4 py-3 shadow-[0_0_25px_rgba(0,255,135,0.3)] flex items-center gap-2 text-xs font-semibold text-white">
          <CheckCircle2 className="h-4 w-4 text-[#00FF87]" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-athletic text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
            Editor de <span className="text-[#00FF87]">Preços & Planos</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Ajuste os valores dos planos de assinatura. As alterações refletem imediatamente na Landing Page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#10B981] text-xs font-bold uppercase tracking-wider text-black transition-all shadow-[0_0_20px_rgba(0,255,135,0.35)]"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {configs.map((plan) => {
          const isFree = plan.id === 'free';
          const isPremium = plan.id === 'premium';

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 space-y-5 ${
                isPremium
                  ? 'border-[#00FF87]/40 bg-[#10141F] shadow-[0_0_25px_rgba(0,255,135,0.15)]'
                  : 'border-white/10 bg-[#0E1119]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-athletic text-xl uppercase tracking-wider text-white">
                  {plan.name}
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                  {plan.badge}
                </span>
              </div>

              {isFree ? (
                <div className="py-6 text-center">
                  <span className="font-mono text-3xl font-extrabold text-white">
                    R$ 0,00
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    Plano gratuito para captação de leads. Não pode ser tarifado.
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Monthly price */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preço Mensal (R$/mês)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.10"
                        min="1"
                        value={plan.monthlyPrice}
                        onChange={(e) =>
                          handlePriceChange(plan.id, 'monthlyPrice', Number(e.target.value))
                        }
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono font-bold text-sm text-[#00FF87] focus:border-[#00FF87] focus:outline-none"
                      />
                      <span className="absolute right-3.5 top-2.5 font-mono text-xs text-slate-500">
                        BRL
                      </span>
                    </div>
                  </div>

                  {/* Annual price */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preço no Ciclo Anual (R$/mês equivalente)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.10"
                        min="1"
                        value={plan.annualPrice}
                        onChange={(e) =>
                          handlePriceChange(plan.id, 'annualPrice', Number(e.target.value))
                        }
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono font-bold text-sm text-[#00FF87] focus:border-[#00FF87] focus:outline-none"
                      />
                      <span className="absolute right-3.5 top-2.5 font-mono text-xs text-slate-500">
                        BRL
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Cobrança anual calculada: R$ {(plan.annualPrice * 12).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
                <span>Status da Oferta:</span>
                <span className="font-mono text-[#00FF87] font-bold">Ativa na Landing</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
