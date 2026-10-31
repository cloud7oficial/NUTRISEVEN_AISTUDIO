import React, { useState } from 'react';
import { Coupon } from '../../types';
import { Ticket, Plus, Trash2, CheckCircle2, X, Calendar, Percent, Tag } from 'lucide-react';

interface AdminCouponsProps {
  coupons: Coupon[];
  onToggleCoupon: (couponId: string) => void;
  onDeleteCoupon: (couponId: string) => void;
  onCreateCoupon: (newCoupon: Coupon) => void;
}

export const AdminCoupons: React.FC<AdminCouponsProps> = ({
  coupons,
  onToggleCoupon,
  onDeleteCoupon,
  onCreateCoupon,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [validUntil, setValidUntil] = useState('2026-12-31');
  const [maxUses, setMaxUses] = useState<number>(100);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      id: 'coup_' + Date.now(),
      code: code.trim().toUpperCase(),
      discountPercent,
      validUntil,
      usageCount: 0,
      maxUses,
      active: true,
    };

    onCreateCoupon(newCoupon);
    setModalOpen(false);
    setCode('');
    showFeedback(`Cupom ${newCoupon.code} criado com ${newCoupon.discountPercent}% OFF!`);
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
            Cupons de <span className="text-[#00FF87]">Desconto & Campanhas</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Crie códigos promocionais para influenciadores, campanhas sazonais e parcerias esportivas.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#10B981] text-xs font-bold uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Criar Novo Cupom</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0E1119] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-black/40 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Código do Cupom</th>
                <th className="py-3 px-4">Desconto</th>
                <th className="py-3 px-4">Utilizações</th>
                <th className="py-3 px-4">Validade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Nenhum cupom cadastrado no momento.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    {/* Code */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-[#00FF87]" />
                        <span className="font-mono text-sm font-extrabold text-white">
                          {c.code}
                        </span>
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#00FF87] text-sm">
                      {c.discountPercent}% OFF
                    </td>

                    {/* Uses */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-white font-bold">{c.usageCount}</span>
                      <span className="text-slate-500"> / {c.maxUses}</span>
                    </td>

                    {/* Expiration */}
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {c.validUntil}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => {
                          onToggleCoupon(c.id);
                          showFeedback(`Cupom ${c.code} ${c.active ? 'desativado' : 'ativado'}.`);
                        }}
                        className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded transition-colors ${
                          c.active
                            ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40'
                            : 'bg-white/5 text-slate-500 border border-white/10'
                        }`}
                      >
                        {c.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          onDeleteCoupon(c.id);
                          showFeedback(`Cupom ${c.code} excluído.`);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Excluir Cupom"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#121520] p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-athletic text-2xl uppercase tracking-wider text-white mb-1">
              Criar Cupom de Desconto
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Configure o código e a porcentagem de desconto para a landing page.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Código do Cupom (em maiúsculas)
                </label>
                <input
                  type="text"
                  required
                  placeholder="EX: ATLETA25"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono font-bold text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono font-bold text-xs text-white focus:border-[#00FF87] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Limite de Usos
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono font-bold text-xs text-white focus:border-[#00FF87] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Data Limite de Validade
                </label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#10B981] font-bold text-xs uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] mt-2"
              >
                Salvar Cupom
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
