/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Coupon, FoodItem, PlanPricingConfig, Transaction, UserProfile } from './types';
import {
  INITIAL_ADMIN_USERS,
  INITIAL_COUPONS,
  INITIAL_PLANS_CONFIG,
  INITIAL_TRANSACTIONS,
} from './data/adminStore';
import { foodDatabase } from './data/nutritionData';

// Landing Page Components
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

// Admin Console Components
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminPayments } from './components/admin/AdminPayments';
import { AdminCoupons } from './components/admin/AdminCoupons';
import { AdminPlans } from './components/admin/AdminPlans';
import { AdminFoodCatalog } from './components/admin/AdminFoodCatalog';

export default function App() {
  // Current View: 'landing' or 'admin'
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || path === '/admin') return 'admin';
    }
    return 'landing';
  });

  // Current Admin Tab
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Logged-in User State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin Data Stores (persistent in localStorage)
  const [adminUsers, setAdminUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
    } catch {
      return INITIAL_ADMIN_USERS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [plansConfig, setPlansConfig] = useState<PlanPricingConfig[]>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_plans_config');
      return saved ? JSON.parse(saved) : INITIAL_PLANS_CONFIG;
    } catch {
      return INITIAL_PLANS_CONFIG;
    }
  });

  const [foodCatalog, setFoodCatalog] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem('nutriseven_foods');
      return saved ? JSON.parse(saved) : foodDatabase;
    } catch {
      return foodDatabase;
    }
  });

  // Modals & Notifications
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState<'premium' | 'vip' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('nutriseven_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nutriseven_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nutriseven_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem('nutriseven_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nutriseven_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('nutriseven_plans_config', JSON.stringify(plansConfig));
  }, [plansConfig]);

  useEffect(() => {
    localStorage.setItem('nutriseven_foods', JSON.stringify(foodCatalog));
  }, [foodCatalog]);

  // Window hash listener for /#admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#home' || hash === '') {
        setCurrentView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    showToast(`Bem-vindo, ${loggedInUser.name}!`);

    // If master admin logged in, redirect directly to admin console
    if (loggedInUser.role === 'admin') {
      window.location.hash = 'admin';
      setCurrentView('admin');
      showToast('Acesso de Administrador Master liberado.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.location.hash = '';
    setCurrentView('landing');
    showToast('Você saiu da sua conta.');
  };

  const handleOpenCheckout = (planId: 'premium' | 'vip') => {
    setCheckoutPlanId(planId);
  };

  const handleUpgradeSuccess = (planId: 'premium' | 'vip') => {
    if (user) {
      const updated: UserProfile = { ...user, plan: planId };
      setUser(updated);
      setAdminUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, plan: planId } : u))
      );
    } else {
      const newUser: UserProfile = {
        id: 'usr_' + Date.now(),
        name: 'Membro ' + (planId === 'vip' ? 'VIP' : 'Premium'),
        email: 'assinante@nutriseven.app',
        role: 'user',
        plan: planId,
        status: 'active',
        registeredAt: new Date().toISOString(),
      };
      setUser(newUser);
      setAdminUsers((prev) => [newUser, ...prev]);
    }
    showToast(`Parabéns! Sua assinatura ${planId.toUpperCase()} foi ativada com sucesso.`);
  };

  const handleNewTransaction = (newTxn: Transaction) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // Admin Actions
  const handleUpdateUserPlan = (userId: string, newPlan: 'free' | 'premium' | 'vip') => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, plan: newPlan } : u))
    );
    if (user && user.id === userId) {
      setUser({ ...user, plan: newPlan });
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newStatus = u.status === 'suspended' ? 'active' : 'suspended';
        return { ...u, status: newStatus };
      })
    );
  };

  const handleCreateUser = (newUser: UserProfile) => {
    setAdminUsers((prev) => [newUser, ...prev]);
  };

  const handleApproveTransaction = (txnId: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== txnId) return t;
        // Also upgrade customer in user base if found
        setAdminUsers((uList) =>
          uList.map((u) =>
            u.email.toLowerCase() === t.customerEmail.toLowerCase()
              ? { ...u, plan: t.planId }
              : u
          )
        );
        return { ...t, status: 'approved' };
      })
    );
  };

  const handleRefundTransaction = (txnId: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== txnId) return t;
        // Downgrade user back to free
        setAdminUsers((uList) =>
          uList.map((u) =>
            u.email.toLowerCase() === t.customerEmail.toLowerCase()
              ? { ...u, plan: 'free' }
              : u
          )
        );
        return { ...t, status: 'refunded' };
      })
    );
  };

  const handleToggleCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, active: !c.active } : c))
    );
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
  };

  const handleCreateCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const handleSavePlansConfig = (newConfigs: PlanPricingConfig[]) => {
    setPlansConfig(newConfigs);
    showToast('Novos preços sincronizados em tempo real com a Landing Page.');
  };

  const handleAddFood = (newFood: FoodItem) => {
    setFoodCatalog((prev) => [newFood, ...prev]);
  };

  const handleDeleteFood = (foodId: string) => {
    setFoodCatalog((prev) => prev.filter((f) => f.id !== foodId));
  };

  const scrollTo = (id: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // View Routing: Admin Console
  if (currentView === 'admin') {
    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onGoToSite={() => {
          window.location.hash = '';
          setCurrentView('landing');
        }}
        onLogout={handleLogout}
        currentUser={user}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            users={adminUsers}
            transactions={transactions}
            onSelectTab={setAdminTab}
          />
        )}
        {adminTab === 'users' && (
          <AdminUsers
            users={adminUsers}
            onUpdateUserPlan={handleUpdateUserPlan}
            onToggleUserStatus={handleToggleUserStatus}
            onCreateUser={handleCreateUser}
          />
        )}
        {adminTab === 'payments' && (
          <AdminPayments
            transactions={transactions}
            onApproveTransaction={handleApproveTransaction}
            onRefundTransaction={handleRefundTransaction}
          />
        )}
        {adminTab === 'coupons' && (
          <AdminCoupons
            coupons={coupons}
            onToggleCoupon={handleToggleCoupon}
            onDeleteCoupon={handleDeleteCoupon}
            onCreateCoupon={handleCreateCoupon}
          />
        )}
        {adminTab === 'plans' && (
          <AdminPlans
            plansConfig={plansConfig}
            onSavePlansConfig={handleSavePlansConfig}
          />
        )}
        {adminTab === 'catalog' && (
          <AdminFoodCatalog
            foods={foodCatalog}
            onAddFood={handleAddFood}
            onDeleteFood={handleDeleteFood}
          />
        )}
      </AdminLayout>
    );
  }

  // View Routing: Public Landing Page
  return (
    <div className="min-h-screen bg-[#07080C] text-slate-100 flex flex-col font-sans selection:bg-[#00FF87] selection:text-black">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#00FF87]/50 bg-[#0F141F] px-5 py-3 shadow-[0_0_25px_rgba(0,255,135,0.25)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#00FF87] animate-pulse" />
          <span className="text-xs font-semibold text-white">{notification}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenCheckout={handleOpenCheckout}
        onGoToAdmin={() => {
          window.location.hash = 'admin';
          setCurrentView('admin');
        }}
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
          foods={foodCatalog}
        />

        {/* Interactive Plans Comparison Free vs Premium with Dynamic Pricing */}
        <PricingComparison
          onOpenCheckout={handleOpenCheckout}
          onScrollToCalculator={() => scrollTo('calculadora')}
          plansConfig={plansConfig}
        />

        {/* Testimonials & Proof */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* High-Impact Footer with Admin Link */}
      <Footer
        onScrollTo={scrollTo}
        onOpenCheckout={handleOpenCheckout}
        onOpenAdmin={() => {
          if (user?.role === 'admin') {
            window.location.hash = 'admin';
            setCurrentView('admin');
          } else {
            setAuthModalOpen(true);
          }
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        planId={checkoutPlanId}
        onClose={() => setCheckoutPlanId(null)}
        onUpgradeSuccess={handleUpgradeSuccess}
        currentUser={user}
        plansConfig={plansConfig}
        onNewTransaction={handleNewTransaction}
      />

    </div>
  );
}
