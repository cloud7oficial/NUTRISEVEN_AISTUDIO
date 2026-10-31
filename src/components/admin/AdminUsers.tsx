import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { exportToCsv } from '../../data/adminStore';
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Shield,
  Key,
  Ban,
  CheckCircle2,
  X,
  Mail,
  User,
  Check,
} from 'lucide-react';

interface AdminUsersProps {
  users: UserProfile[];
  onUpdateUserPlan: (userId: string, newPlan: 'free' | 'premium' | 'vip') => void;
  onToggleUserStatus: (userId: string) => void;
  onCreateUser: (newUser: UserProfile) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  users,
  onUpdateUserPlan,
  onToggleUserStatus,
  onCreateUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'premium' | 'vip'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  
  // Create User Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPlan, setNewPlan] = useState<'free' | 'premium' | 'vip'>('premium');

  // Password Reset Toast simulation
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || u.plan === planFilter;
    const matchesStatus = statusFilter === 'all' || (u.status || 'active') === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Nome', 'E-mail', 'Tipo/Papel', 'Plano', 'Status', 'Data Cadastro', 'Total Pago (R$)'];
    const rows = filteredUsers.map((u) => [
      u.id,
      u.name,
      u.email,
      u.role || 'user',
      u.plan.toUpperCase(),
      u.status || 'active',
      u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('pt-BR') : '',
      u.totalPaid ? u.totalPaid.toFixed(2) : '0.00',
    ]);
    exportToCsv('usuarios_nutriseven', headers, rows);
    showFeedback('Relatório de usuários exportado com sucesso em CSV!');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      role: 'user',
      plan: newPlan,
      status: 'active',
      registeredAt: new Date().toISOString(),
      totalPaid: newPlan === 'free' ? 0 : newPlan === 'premium' ? 14.99 : 39.90,
    };

    onCreateUser(user);
    setModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    showFeedback(`Usuário ${user.name} criado com sucesso com plano ${user.plan.toUpperCase()}!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Toast */}
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
            Gestão de <span className="text-[#00FF87]">Usuários & Clientes</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Controle de cadastros, alteração imediata de planos e suspensão de contas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="h-4 w-4 text-[#00FF87]" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#10B981] text-xs font-bold uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)]"
          >
            <UserPlus className="h-4 w-4 stroke-[2.5]" />
            <span>Novo Usuário</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#00FF87] focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value as any)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#00FF87] focus:outline-none"
          >
            <option value="all">Todos os Planos</option>
            <option value="free">Apenas Grátis</option>
            <option value="premium">Apenas Premium</option>
            <option value="vip">Apenas VIP</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#00FF87] focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Apenas Ativos</option>
            <option value="suspended">Apenas Suspensos</option>
          </select>
        </div>
      </div>

      {/* Users High-Density Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0E1119] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-black/40 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">Papel</th>
                <th className="py-3 px-4">Plano Atual</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Total Pago</th>
                <th className="py-3 px-4 text-center">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Nenhum usuário encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSuspended = u.status === 'suspended';
                  const isAdmin = u.role === 'admin';

                  return (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                              isAdmin
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{u.name}</span>
                            <span className="font-mono text-[11px] text-slate-400">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {isAdmin ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase">
                            Admin Master
                          </span>
                        ) : (
                          <span className="text-slate-400">Cliente</span>
                        )}
                      </td>

                      {/* Plan Change Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={u.plan}
                          onChange={(e) => {
                            onUpdateUserPlan(u.id, e.target.value as any);
                            showFeedback(`Plano de ${u.name} atualizado para ${e.target.value.toUpperCase()}!`);
                          }}
                          className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold uppercase border focus:outline-none ${
                            u.plan === 'vip'
                              ? 'bg-purple-950/40 text-purple-300 border-purple-500/30'
                              : u.plan === 'premium'
                              ? 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/30'
                              : 'bg-white/5 text-slate-400 border-white/10'
                          }`}
                        >
                          <option value="free" className="bg-[#0E1119] text-white">Grátis</option>
                          <option value="premium" className="bg-[#0E1119] text-white">Premium</option>
                          <option value="vip" className="bg-[#0E1119] text-white">VIP + Consultoria</option>
                        </select>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            isSuspended
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-[#00FF87]/15 text-[#00FF87]'
                          }`}
                        >
                          {isSuspended ? 'Suspenso' : 'Ativo'}
                        </span>
                      </td>

                      {/* Total Paid */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        R$ {(u.totalPaid || 0).toFixed(2).replace('.', ',')}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              showFeedback(`Link de redefinição de senha enviado para ${u.email}`);
                            }}
                            title="Redefinir Senha do Usuário"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Key className="h-3.5 w-3.5" />
                          </button>

                          {!isAdmin && (
                            <button
                              onClick={() => {
                                onToggleUserStatus(u.id);
                                showFeedback(
                                  isSuspended
                                    ? `Acesso de ${u.name} reativado.`
                                    : `Acesso de ${u.name} suspenso com sucesso.`
                                );
                              }}
                              title={isSuspended ? 'Reativar Acesso' : 'Suspender Acesso'}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isSuspended
                                  ? 'text-[#00FF87] hover:bg-[#00FF87]/20'
                                  : 'text-rose-400 hover:bg-rose-500/10'
                              }`}
                            >
                              <Ban className="h-3.5 w-3.5" />
                            </button>
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

        {/* Table Footer info */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Exibindo {filteredUsers.length} de {users.length} usuários cadastrados</span>
          <span className="font-mono text-[11px]">Base sincronizada via storage local</span>
        </div>
      </div>

      {/* Create User Modal */}
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
              Cadastrar Novo Usuário
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Adicione um novo cliente com plano já configurado.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do aluno / atleta"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@dominio.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Senha Provisória
                </label>
                <input
                  type="text"
                  placeholder="Defina uma senha ou deixe vazio para gerar"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Plano Inicial
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['free', 'premium', 'vip'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewPlan(p)}
                      className={`p-2.5 rounded-xl border text-xs font-bold uppercase transition-all ${
                        newPlan === p
                          ? 'border-[#00FF87] bg-[#00FF87] text-black'
                          : 'border-white/10 bg-white/5 text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#10B981] font-bold text-xs uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] mt-2"
              >
                Confirmar Cadastro
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
