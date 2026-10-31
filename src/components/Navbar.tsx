import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Zap, User, LogIn, LogOut, CheckCircle2, Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
  onGoToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenCheckout,
  onGoToAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07080C]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00FF87] text-black shadow-[0_0_15px_rgba(0,255,135,0.4)]">
            <Zap className="h-5 w-5 fill-black stroke-black" />
          </span>
          <span className="font-athletic text-2xl tracking-wide uppercase">
            NUTRI<span className="text-[#00FF87]">SEVEN</span>
          </span>
        </a>

        {/* Zone 2: Clean 4-5 Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
          <button
            onClick={() => scrollTo('calculadora')}
            className="hover:text-[#00FF87] transition-colors whitespace-nowrap shrink-0"
          >
            Calculadora Grátis
          </button>
          <button
            onClick={() => scrollTo('projecao')}
            className="hover:text-[#00FF87] transition-colors whitespace-nowrap shrink-0"
          >
            Projeção de Metas
          </button>
          <button
            onClick={() => scrollTo('substitutos')}
            className="hover:text-[#00FF87] transition-colors whitespace-nowrap shrink-0"
          >
            Substituição & Compras
          </button>
          <button
            onClick={() => scrollTo('planos')}
            className="hover:text-[#00FF87] transition-colors whitespace-nowrap shrink-0"
          >
            Planos & Preços
          </button>
        </nav>

        {/* Zone 3: Actions & Auth */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {isAdmin && onGoToAdmin && (
            <button
              onClick={onGoToAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 text-xs font-bold text-amber-300 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Painel Admin</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00FF87]/20 text-[#00FF87]">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div className="text-left text-xs">
                  <span className="block font-medium text-white leading-tight max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#00FF87] uppercase">
                    {user.role === 'admin' ? 'ADMIN' : `Plano ${user.plan}`}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sair da conta"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <LogIn className="h-3.5 w-3.5 text-[#00FF87]" />
              <span>Entrar</span>
            </button>
          )}

          {!isAdmin && (user?.plan === 'premium' || user?.plan === 'vip') ? (
            <div className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#00FF87] bg-[#00FF87]/10 rounded-lg border border-[#00FF87]/30 whitespace-nowrap shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Acesso Ativo</span>
            </div>
          ) : !isAdmin ? (
            <button
              onClick={() => onOpenCheckout('premium')}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#00FF87] hover:bg-[#10B981] hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] transition-all rounded-lg active:scale-95 whitespace-nowrap shrink-0"
            >
              Assinar Premium
            </button>
          ) : null}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {isAdmin && onGoToAdmin && (
            <button
              onClick={onGoToAdmin}
              className="px-2 py-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 rounded-md"
            >
              Admin
            </button>
          )}
          <button
            onClick={() => onOpenCheckout('premium')}
            className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black bg-[#00FF87] rounded-md"
          >
            Premium
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#0A0D14] px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => scrollTo('calculadora')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00FF87]"
          >
            Calculadora Grátis
          </button>
          <button
            onClick={() => scrollTo('projecao')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00FF87]"
          >
            Projeção de Metas
          </button>
          <button
            onClick={() => scrollTo('substitutos')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00FF87]"
          >
            Substituição & Compras
          </button>
          <button
            onClick={() => scrollTo('planos')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00FF87]"
          >
            Planos & Preços
          </button>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAdmin && onGoToAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToAdmin();
                }}
                className="w-full py-2.5 text-center text-xs font-bold rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 flex items-center justify-center gap-2"
              >
                <Shield className="h-4 w-4" />
                <span>Painel Administrativo Interno</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center justify-between py-1 text-sm text-slate-300">
                <span>Olá, <strong className="text-white">{user.name}</strong></span>
                <button
                  onClick={onLogout}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-lg border border-white/20 text-white hover:bg-white/5"
              >
                Entrar ou Criar Conta
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout('premium');
              }}
              className="w-full py-2.5 text-center text-sm font-bold uppercase tracking-wider text-black bg-[#00FF87] rounded-lg"
            >
              Assinar NutriSeven Premium
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
