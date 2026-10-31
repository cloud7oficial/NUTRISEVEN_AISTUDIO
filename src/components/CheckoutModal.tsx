import React, { useState } from 'react';
import { pricingPlans } from '../data/nutritionData';
import { PlanPricingConfig, Transaction, UserProfile } from '../types';
import { X, ShieldCheck, CheckCircle2, Zap, QrCode, CreditCard, Copy, Check } from 'lucide-react';

interface CheckoutModalProps {
  planId: 'premium' | 'vip' | null;
  onClose: () => void;
  onUpgradeSuccess: (newPlan: 'premium' | 'vip') => void;
  currentUser: UserProfile | null;
  plansConfig?: PlanPricingConfig[];
  onNewTransaction?: (txn: Transaction) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  planId,
  onClose,
  onUpgradeSuccess,
  currentUser,
  plansConfig,
  onNewTransaction,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [pixCopied, setPixCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!planId) return null;

  const basePlan = pricingPlans.find((p) => p.id === planId) || pricingPlans[1];
  const customConfig = plansConfig?.find((c) => c.id === planId);
  const activeMonthlyPrice = customConfig?.monthlyPrice ?? basePlan.monthlyPrice;

  const handleConfirm = () => {
    setSuccess(true);
    
    // Dispatch new transaction to admin store
    if (onNewTransaction) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      const newTxn: Transaction = {
        id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
        customerName: currentUser?.name || 'Cliente Novo',
        customerEmail: currentUser?.email || 'novo.cliente@gmail.com',
        planId,
        planName: basePlan.name,
        amount: activeMonthlyPrice,
        method: paymentMethod === 'pix' ? 'pix' : 'credit_card',
        status: 'approved',
        date: dateStr,
      };
      onNewTransaction(newTxn);
    }

    setTimeout(() => {
      onUpgradeSuccess(planId);
      setSuccess(false);
      onClose();
    }, 1800);
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136nutriseven-assinaturas@pix.com.br520400005303986540514.995802BR5910NutriSeven6009Sao Paulo62070503***6304E8A2');
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#00FF87]/40 bg-[#0F121B] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,135,0.15)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00FF87]/20 text-[#00FF87] animate-bounce">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>
            <h3 className="font-athletic text-3xl font-extrabold uppercase text-white">
              Parabéns, Assinatura Ativada!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Seu plano <strong className="text-[#00FF87]">{basePlan.name}</strong> está 100% liberado. Todos os cardápios, listas e ferramentas foram desbloqueados.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00FF87] mb-1">
                <Zap className="h-4 w-4" />
                <span>Checkout Seguro NutriSeven</span>
              </div>
              <h3 className="font-athletic text-2xl uppercase tracking-wider text-white">
                Assinar {basePlan.name}
              </h3>
              <p className="text-xs text-slate-400">
                Acesso imediato e garantia incondicional de 7 dias com devolução integral.
              </p>
            </div>

            {/* Plan Summary Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total a pagar</span>
                <span className="font-mono text-2xl font-extrabold text-[#00FF87]">
                  R$ {activeMonthlyPrice.toFixed(2).replace('.', ',')}
                  <span className="text-xs font-normal text-slate-400">/mês</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white block">Acesso Ilimitado</span>
                <span className="text-[11px] text-slate-400">Cancele quando quiser</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Escolha a Forma de Pagamento
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-[#00FF87] bg-[#00FF87]/15 text-[#00FF87]'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="h-4 w-4" />
                  <span>PIX Instantâneo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#00FF87] bg-[#00FF87]/15 text-[#00FF87]'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>
            </div>

            {/* Payment details panel */}
            {paymentMethod === 'pix' ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-3 text-center">
                <div className="h-32 w-32 mx-auto rounded-xl bg-white p-2 flex items-center justify-center">
                  <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-black rounded">
                    {[...Array(36)].map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          i % 2 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-white/5 p-2 border border-white/10 text-xs">
                  <span className="font-mono text-slate-400 truncate max-w-[240px]">
                    00020126580014br.gov.bcb.pix0136nutriseven...
                  </span>
                  <button
                    onClick={copyPixKey}
                    className="flex items-center gap-1 font-bold text-[#00FF87] hover:underline shrink-0"
                  >
                    {pixCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{pixCopied ? 'Copiado!' : 'Copiar Chave'}</span>
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Aprovação em segundos. O app identifica seu pagamento automaticamente.
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Número do Cartão (0000 0000 0000 0000)"
                  defaultValue="4532 •••• •••• 9821"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs font-mono font-medium text-white focus:border-[#00FF87] focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    defaultValue="08/29"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs font-mono font-medium text-white focus:border-[#00FF87] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="829"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs font-mono font-medium text-white focus:border-[#00FF87] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleConfirm}
              className="w-full py-4 rounded-xl bg-[#00FF87] hover:bg-[#10B981] font-bold text-xs uppercase tracking-wider text-black transition-all shadow-[0_0_20px_rgba(0,255,135,0.35)] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Confirmar Assinatura Agora</span>
            </button>

            {/* Security seal */}
            <div className="flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
              <ShieldCheck className="h-4 w-4 text-[#00FF87]" />
              <span>Ambiente criptografado SSL 256-bit com garantia de reembolso em 7 dias</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
