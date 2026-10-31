import React from 'react';
import {
  Zap,
  LayoutDashboard,
  Users,
  CreditCard,
  Ticket,
  Sliders,
  Utensils,
  ExternalLink,
  LogOut,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { UserProfile } from '../../types';

export type AdminTab = 'dashboard' | 'users' | 'payments' | 'coupons' | 'plans' | 'catalog';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onGoToSite: () => void;
  onLogout: () => void;
  currentUser: UserProfile | null;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onGoToSite,
  onLogout,
  currentUser,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Visão Geral & Métricas', icon: LayoutDashboard },
    { id: 'users', label: 'Usuários & Clientes', icon: Users },
    { id: 'payments', label: 'Pagamentos & Transações', icon: CreditCard },
    { id: 'coupons', label: 'Cupons de Desconto', icon: Ticket },
    { id: 'plans', label: 'Planos & Precificação', icon: Sliders },
    { id: 'catalog', label: 'Catálogo de Alimentos', icon: Utensils },
  ];

  const currentTabLabel = navItems.find((i) => i.id === currentTab)?.label || 'Painel';

  return (
    <div className="min-h-screen bg-[#07080C] text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0A0D14]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-athletic text-lg uppercase tracking-wider text-white">
            NUTRI<span className="text-[#00FF87]">ADMIN</span>
          </span>
        </div>

        <button
          onClick={onGoToSite}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white"
        >
          <span>Ver Site</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-[#0B0D14] p-5 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Lockup */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00FF87] text-black">
                <Shield className="h-4 w-4 fill-black stroke-black" />
              </span>
              <div>
                <span className="font-athletic text-xl tracking-wide uppercase text-white block leading-none">
                  NUTRI<span className="text-[#00FF87]">SEVEN</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                  Painel Administrativo
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Admin User Mini Card */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FF87]/20 text-[#00FF87] font-bold text-xs shrink-0">
              RR
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-bold text-white truncate">
                {currentUser?.name || 'Raphael Robert'}
              </span>
              <span className="block font-mono text-[10px] text-[#00FF87] truncate">
                {currentUser?.email || 'marketing@raphaelrobert.com.br'}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00FF87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-white/10">
          <button
            onClick={onGoToSite}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#00FF87]" />
              <span>Ver Site Público</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">/home</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar Desktop Contract */}
        <header className="hidden md:flex items-center justify-between border-b border-white/10 bg-[#0A0D14]/80 backdrop-blur-md px-8 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>NutriSeven Admin</span>
            <span>/</span>
            <span className="text-white font-bold">{currentTabLabel}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#00FF87] animate-pulse" />
              <span className="font-mono text-slate-400 text-[11px]">Sistema Operacional Online</span>
            </div>

            <button
              onClick={onGoToSite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-[#00FF87] hover:text-black hover:border-[#00FF87] text-xs font-bold text-white transition-all whitespace-nowrap"
            >
              <span>Ver Site Público</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
