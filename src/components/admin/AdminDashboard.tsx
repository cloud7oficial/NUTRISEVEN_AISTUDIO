import React from 'react';
import { Transaction, UserProfile } from '../../types';
import {
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { AdminTab } from './AdminLayout';

interface AdminDashboardProps {
  users: UserProfile[];
  transactions: Transaction[];
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  users,
  transactions,
  onSelectTab,
}) => {
  // Calculations
  const activeSubscribers = users.filter((u) => u.plan === 'premium' || u.plan === 'vip').length;
  const premiumCount = users.filter((u) => u.plan === 'premium').length;
  const vipCount = users.filter((u) => u.plan === 'vip').length;
  const freeCount = users.filter((u) => u.plan === 'free').length;

  const totalRevenue = transactions
    .filter((t) => t.status === 'approved')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingPayments = transactions.filter((t) => t.status === 'pending');
  const pendingAmount = pendingPayments.reduce((sum, t) => sum + t.amount, 0);

  // MRR estimate based on active subscribers
  // Premium ~ 14.99, VIP ~ 39.90
  const mrr = premiumCount * 14.99 + vipCount * 39.90;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-athletic text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
            Dashboard <span className="text-[#00FF87]">Financeiro & Operacional</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Acompanhamento em tempo real de assinaturas, receita recorrente e conversão do NutriSeven.
          </p>
        </div>

        {pendingPayments.length > 0 && (
          <button
            onClick={() => onSelectTab('payments')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all self-start sm:self-auto"
          >
            <Clock className="h-4 w-4 text-amber-400" />
            <span>{pendingPayments.length} PIX pendentes de aprovação (R$ {pendingAmount.toFixed(2)})</span>
          </button>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* MRR Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1119] p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">MRR Recorrente</span>
            <div className="p-2 rounded-lg bg-[#00FF87]/10 text-[#00FF87]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-3xl font-extrabold text-white block">
              R$ {mrr.toFixed(2).replace('.', ',')}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#00FF87] font-semibold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+24.6% vs mês anterior</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1119] p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Faturamento Total</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-3xl font-extrabold text-white block">
              R$ {totalRevenue.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              {transactions.filter((t) => t.status === 'approved').length} transações aprovadas
            </span>
          </div>
        </div>

        {/* Active Subscribers Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1119] p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Assinantes Pagantes</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-3xl font-extrabold text-[#00FF87] block">
              {activeSubscribers} <span className="text-sm font-normal text-slate-400">atletas</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              {premiumCount} Premium · {vipCount} VIP
            </span>
          </div>
        </div>

        {/* Conversion Rate Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1119] p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Taxa de Conversão</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-3xl font-extrabold text-white block">
              {users.length > 0 ? ((activeSubscribers / users.length) * 100).toFixed(1) : 0}%
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Calculadora → Assinatura paga
            </span>
          </div>
        </div>

      </div>

      {/* 2-Column Split: Plan Distribution & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Plan Distribution & Quick Stats */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0E1119] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-athletic text-xl uppercase tracking-wider text-white">
              Distribuição da Base de Usuários
            </h3>
            <span className="font-mono text-xs text-slate-400">{users.length} total</span>
          </div>

          {/* Distribution Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">NutriSeven Premium</span>
                <span className="font-mono text-[#00FF87] font-bold">
                  {premiumCount} ({users.length > 0 ? Math.round((premiumCount / users.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-[#00FF87]"
                  style={{ width: `${users.length > 0 ? (premiumCount / users.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">NutriSeven VIP + Consultoria</span>
                <span className="font-mono text-sky-400 font-bold">
                  {vipCount} ({users.length > 0 ? Math.round((vipCount / users.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-sky-400"
                  style={{ width: `${users.length > 0 ? (vipCount / users.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Calculadora Gratuita (Leads)</span>
                <span className="font-mono text-slate-400 font-bold">
                  {freeCount} ({users.length > 0 ? Math.round((freeCount / users.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-slate-600"
                  style={{ width: `${users.length > 0 ? (freeCount / users.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Atalhos de Gestão
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectTab('users')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 text-left transition-colors"
              >
                + Gerenciar Usuários
              </button>
              <button
                onClick={() => onSelectTab('payments')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 text-left transition-colors"
              >
                + Auditar Pagamentos
              </button>
              <button
                onClick={() => onSelectTab('coupons')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 text-left transition-colors"
              >
                + Criar Cupom
              </button>
              <button
                onClick={() => onSelectTab('plans')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 text-left transition-colors"
              >
                + Ajustar Preços
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Recent Transactions */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0E1119] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-athletic text-xl uppercase tracking-wider text-white">
                Transações Recentes
              </h3>
              <span className="text-xs text-slate-400">Últimos pagamentos registrados</span>
            </div>
            <button
              onClick={() => onSelectTab('payments')}
              className="text-xs font-bold text-[#00FF87] hover:underline"
            >
              Ver todas ({transactions.length}) →
            </button>
          </div>

          {/* List of recent transactions */}
          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${
                      t.method === 'pix' ? 'bg-[#00FF87]/15 text-[#00FF87]' : 'bg-sky-500/15 text-sky-400'
                    }`}
                  >
                    {t.method === 'pix' ? <QrCode className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{t.customerName}</span>
                    <span className="text-[11px] text-slate-400">{t.planName} · {t.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-sm font-extrabold text-white block">
                    R$ {t.amount.toFixed(2).replace('.', ',')}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      t.status === 'approved'
                        ? 'bg-[#00FF87]/20 text-[#00FF87]'
                        : t.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {t.status === 'approved' ? 'Aprovado' : t.status === 'pending' ? 'Pendente' : 'Estornado'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
