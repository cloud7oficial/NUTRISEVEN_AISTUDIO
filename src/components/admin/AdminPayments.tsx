import React, { useState } from 'react';
import { Transaction } from '../../types';
import { exportToCsv } from '../../data/adminStore';
import {
  CreditCard,
  QrCode,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface AdminPaymentsProps {
  transactions: Transaction[];
  onApproveTransaction: (txnId: string) => void;
  onRefundTransaction: (txnId: string) => void;
}

export const AdminPayments: React.FC<AdminPaymentsProps> = ({
  transactions,
  onApproveTransaction,
  onRefundTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'refunded'>('all');
  const [methodFilter, setMethodFilter] = useState<'all' | 'pix' | 'credit_card'>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || t.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleExportCsv = () => {
    const headers = ['ID Transação', 'Cliente', 'E-mail', 'Plano', 'Valor (R$)', 'Método', 'Status', 'Data/Hora'];
    const rows = filtered.map((t) => [
      t.id,
      t.customerName,
      t.customerEmail,
      t.planName,
      t.amount.toFixed(2),
      t.method === 'pix' ? 'PIX' : 'Cartão de Crédito',
      t.status.toUpperCase(),
      t.date,
    ]);
    exportToCsv('transacoes_nutriseven', headers, rows);
    showFeedback('Extrato financeiro exportado com sucesso em CSV!');
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
            Gestão de <span className="text-[#00FF87]">Pagamentos & Vendas</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Aprovação manual de PIX, conciliação de cartões e estorno de transações.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors self-start sm:self-auto"
        >
          <Download className="h-4 w-4 text-[#00FF87]" />
          <span>Exportar Relatório CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por cliente, e-mail ou código TXN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#00FF87] focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#00FF87] focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="approved">Apenas Aprovados</option>
            <option value="pending">Apenas Pendentes (PIX)</option>
            <option value="refunded">Apenas Estornados</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as any)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#00FF87] focus:outline-none"
          >
            <option value="all">Todos os Métodos</option>
            <option value="pix">PIX Instantâneo</option>
            <option value="credit_card">Cartão de Crédito</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0E1119] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-black/40 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Código TXN</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Plano Adquirido</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4 text-right">Valor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Nenhuma transação encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => {
                  const isPending = t.status === 'pending';
                  const isApproved = t.status === 'approved';
                  const isRefunded = t.status === 'refunded';

                  return (
                    <tr key={t.id} className="hover:bg-white/5 transition-colors">
                      {/* TXN ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-300">
                        {t.id}
                        <span className="block text-[10px] text-slate-500 font-normal">{t.date}</span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{t.customerName}</span>
                        <span className="font-mono text-[11px] text-slate-400">{t.customerEmail}</span>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-200 block">{t.planName}</span>
                        <span className="text-[10px] font-mono uppercase text-[#00FF87]">{t.planId}</span>
                      </td>

                      {/* Method */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-semibold text-white">
                          {t.method === 'pix' ? (
                            <>
                              <QrCode className="h-3.5 w-3.5 text-[#00FF87]" />
                              <span>PIX</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-3.5 w-3.5 text-sky-400" />
                              <span>Cartão</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-white text-sm">
                        R$ {t.amount.toFixed(2).replace('.', ',')}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded inline-flex items-center gap-1 ${
                            isApproved
                              ? 'bg-[#00FF87]/20 text-[#00FF87]'
                              : isPending
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {isApproved && <CheckCircle2 className="h-3 w-3" />}
                          {isPending && <Clock className="h-3 w-3" />}
                          {isRefunded && <RotateCcw className="h-3 w-3" />}
                          <span>
                            {isApproved ? 'Aprovado' : isPending ? 'Pendente' : 'Estornado'}
                          </span>
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {isPending && (
                            <button
                              onClick={() => {
                                onApproveTransaction(t.id);
                                showFeedback(`Transação ${t.id} aprovada com sucesso!`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#00FF87] hover:bg-[#10B981] text-black font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-all"
                            >
                              <Check className="h-3 w-3 stroke-[3]" />
                              <span>Aprovar PIX</span>
                            </button>
                          )}

                          {isApproved && (
                            <button
                              onClick={() => {
                                onRefundTransaction(t.id);
                                showFeedback(`Transação ${t.id} estornada.`);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-[11px] flex items-center gap-1 transition-all"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>Estornar</span>
                            </button>
                          )}

                          {isRefunded && (
                            <span className="text-slate-500 text-[11px] italic">Finalizado</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>{filtered.length} transações listadas</span>
          <span className="font-mono text-[11px]">
            Volume aprovado:{' '}
            <strong className="text-[#00FF87]">
              R${' '}
              {filtered
                .filter((t) => t.status === 'approved')
                .reduce((s, t) => s + t.amount, 0)
                .toFixed(2)
                .replace('.', ',')}
            </strong>
          </span>
        </div>
      </div>

    </div>
  );
};
