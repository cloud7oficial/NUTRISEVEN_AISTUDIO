import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, LogIn, UserPlus, Lock, Mail, User, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor preencha todos os campos.');
      return;
    }
    if (tab === 'register' && !name) {
      setError('Por favor informe seu nome.');
      return;
    }

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: tab === 'register' ? name : (email.split('@')[0] || 'Atleta NutriSeven'),
      email,
      plan: 'free',
      registeredAt: new Date().toISOString(),
    };

    onLoginSuccess(newUser);
    onClose();
  };

  const handleDemoLogin = (planType: 'free' | 'premium') => {
    const demoUser: UserProfile = {
      id: 'demo_' + Date.now(),
      name: planType === 'premium' ? 'Carlos Atleta (Premium)' : 'Lucas Silva (Grátis)',
      email: planType === 'premium' ? 'carlos.atleta@nutriseven.app' : 'lucas.demo@nutriseven.app',
      plan: planType,
      registeredAt: new Date().toISOString(),
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0F121B] p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF87]/20 text-[#00FF87] mb-2">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-athletic text-2xl uppercase tracking-wider text-white">
            {tab === 'login' ? 'Acessar Sua Conta' : 'Criar Nova Conta'}
          </h3>
          <p className="text-xs text-slate-400">
            {tab === 'login'
              ? 'Entre para visualizar seu histórico, metas e planos salvos.'
              : 'Cadastre-se grátis para salvar seus cálculos de macros.'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex rounded-xl bg-black/40 p-1 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-[#00FF87] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              tab === 'register'
                ? 'bg-[#00FF87] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-3.5 py-2.5 text-xs font-medium text-white focus:border-[#00FF87] focus:outline-none"
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-3.5 py-2.5 text-xs font-medium text-white focus:border-[#00FF87] focus:outline-none"
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-3.5 py-2.5 text-xs font-medium text-white focus:border-[#00FF87] focus:outline-none"
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#10B981] font-bold text-xs uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] active:scale-95 mt-2"
          >
            {tab === 'login' ? 'Entrar no NutriSeven' : 'Concluir Cadastro Grátis'}
          </button>
        </form>

        {/* Fast Demo Login for instant review */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
          <span className="text-[11px] text-slate-400 block text-center uppercase tracking-wider font-semibold">
            Testar Rapidamente com 1 Clique (Demonstração)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('free')}
              className="py-2 px-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Entrar como Grátis
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('premium')}
              className="py-2 px-2.5 rounded-lg border border-[#00FF87]/30 bg-[#00FF87]/10 hover:bg-[#00FF87]/20 text-[11px] font-bold text-[#00FF87] transition-colors"
            >
              Entrar como Premium ★
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
