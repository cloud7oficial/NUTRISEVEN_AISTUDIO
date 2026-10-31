/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FreeCalculator } from './components/FreeCalculator';
import { GoalProjectionCalculator } from './components/GoalProjectionCalculator';
import { FoodSwapper } from './components/FoodSwapper';
import { PricingComparison } from './components/PricingComparison';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState<'premium' | 'vip' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nutriseven_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nutriseven_user');
    }
  }, [user]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    showToast(`Bem-vindo, ${loggedInUser.name}! Você está conectado.`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Você saiu da sua conta.');
  };

  const handleOpenCheckout = (planId: 'premium' | 'vip') => {
    setCheckoutPlanId(planId);
  };

  const handleUpgradeSuccess = (planId: 'premium' | 'vip') => {
    if (user) {
      const updated: UserProfile = { ...user, plan: planId };
      setUser(updated);
    } else {
      const newUser: UserProfile = {
        id: 'usr_' + Date.now(),
        name: 'Membro ' + (planId === 'vip' ? 'VIP' : 'Premium'),
        email: 'assinante@nutriseven.app',
        plan: planId,
        registeredAt: new Date().toISOString(),
      };
      setUser(newUser);
    }
    showToast(`Parabéns! Sua assinatura ${planId.toUpperCase()} foi ativada com sucesso.`);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-slate-100 flex flex-col font-sans selection:bg-[#00FF87] selection:text-black">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#00FF87]/50 bg-[#0F141F] px-5 py-3 shadow-[0_0_25px_rgba(0,255,135,0.25)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#00FF87] animate-pulse" />
          <span className="text-xs font-semibold text-white">{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenCheckout={handleOpenCheckout}
          onScrollToCalculator={() => scrollTo('calculadora')}
        />

        {/* Free Macro & Calorie Calculator */}
        <FreeCalculator
          onOpenCheckout={handleOpenCheckout}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* Goal Timeline Projection Calculator */}
        <GoalProjectionCalculator
          onOpenCheckout={handleOpenCheckout}
        />

        {/* Food Swapper & Interactive Grocery List */}
        <FoodSwapper
          onOpenCheckout={handleOpenCheckout}
        />

        {/* Interactive Plans Comparison Free vs Premium */}
        <PricingComparison
          onOpenCheckout={handleOpenCheckout}
          onScrollToCalculator={() => scrollTo('calculadora')}
        />

        {/* Testimonials & Proof */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* High-Impact Footer */}
      <Footer
        onScrollTo={scrollTo}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <CheckoutModal
        planId={checkoutPlanId}
        onClose={() => setCheckoutPlanId(null)}
        onUpgradeSuccess={handleUpgradeSuccess}
        currentUser={user}
      />

    </div>
  );
}
