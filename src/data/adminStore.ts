import { Coupon, FoodItem, PlanPricingConfig, Transaction, UserProfile } from '../types';
import { foodDatabase } from './nutritionData';

export const ADMIN_CREDENTIALS = {
  email: 'marketing@raphaelrobert.com.br',
  password: '58911Kau@',
  name: 'Raphael Robert (Administrador Master)',
};

export const INITIAL_ADMIN_USERS: UserProfile[] = [
  {
    id: 'usr_admin',
    name: 'Raphael Robert',
    email: 'marketing@raphaelrobert.com.br',
    role: 'admin',
    plan: 'vip',
    status: 'active',
    registeredAt: '2026-01-15T09:00:00Z',
    totalPaid: 0,
  },
  {
    id: 'usr_1',
    name: 'Matheus Brandão',
    email: 'matheus.brandao@gmail.com',
    role: 'user',
    plan: 'premium',
    status: 'active',
    registeredAt: '2026-08-10T14:22:00Z',
    totalPaid: 118.80,
  },
  {
    id: 'usr_2',
    name: 'Camila Duarte',
    email: 'camila.crossfit@outlook.com',
    role: 'user',
    plan: 'vip',
    status: 'active',
    registeredAt: '2026-09-02T11:45:00Z',
    totalPaid: 358.80,
  },
  {
    id: 'usr_3',
    name: 'Rodrigo Silveira',
    email: 'rodrigo.eng@techcorp.com.br',
    role: 'user',
    plan: 'premium',
    status: 'active',
    registeredAt: '2026-09-18T19:30:00Z',
    totalPaid: 89.94,
  },
  {
    id: 'usr_4',
    name: 'Juliana Paes Marcondes',
    email: 'ju.marcondes@uol.com.br',
    role: 'user',
    plan: 'free',
    status: 'active',
    registeredAt: '2026-10-12T16:10:00Z',
    totalPaid: 0,
  },
  {
    id: 'usr_5',
    name: 'Felipe Santana Lima',
    email: 'felipe.santana@globo.com',
    role: 'user',
    plan: 'premium',
    status: 'active',
    registeredAt: '2026-10-22T08:15:00Z',
    totalPaid: 14.99,
  },
  {
    id: 'usr_6',
    name: 'Bruno Fagundes',
    email: 'bruno.fagundes@live.com',
    role: 'user',
    plan: 'free',
    status: 'suspended',
    registeredAt: '2026-07-20T10:05:00Z',
    totalPaid: 0,
  },
  {
    id: 'usr_7',
    name: 'Mariana Nogueira',
    email: 'mariana.fit@gmail.com',
    role: 'user',
    plan: 'vip',
    status: 'active',
    registeredAt: '2026-10-28T13:40:00Z',
    totalPaid: 39.90,
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-98421',
    customerName: 'Mariana Nogueira',
    customerEmail: 'mariana.fit@gmail.com',
    planId: 'vip',
    planName: 'NutriSeven VIP + Consultoria',
    amount: 39.90,
    method: 'pix',
    status: 'approved',
    date: '2026-10-28 13:40',
  },
  {
    id: 'TXN-98402',
    customerName: 'Felipe Santana Lima',
    customerEmail: 'felipe.santana@globo.com',
    planId: 'premium',
    planName: 'NutriSeven Premium (Mensal)',
    amount: 14.99,
    method: 'credit_card',
    status: 'approved',
    date: '2026-10-22 08:15',
  },
  {
    id: 'TXN-98380',
    customerName: 'Rodrigo Silveira',
    customerEmail: 'rodrigo.eng@techcorp.com.br',
    planId: 'premium',
    planName: 'NutriSeven Premium (Anual)',
    amount: 118.80,
    method: 'pix',
    status: 'approved',
    date: '2026-10-18 19:30',
  },
  {
    id: 'TXN-98350',
    customerName: 'Gustavo Mendonça',
    customerEmail: 'gustavo.mendonca@gmail.com',
    planId: 'premium',
    planName: 'NutriSeven Premium',
    amount: 14.99,
    method: 'pix',
    status: 'pending',
    date: '2026-10-31 11:20',
  },
  {
    id: 'TXN-98310',
    customerName: 'Carla Beatriz Alencar',
    customerEmail: 'carla.alencar@hotmail.com',
    planId: 'vip',
    planName: 'NutriSeven VIP',
    amount: 39.90,
    method: 'pix',
    status: 'pending',
    date: '2026-10-31 12:45',
  },
  {
    id: 'TXN-98270',
    customerName: 'Renato Siqueira',
    customerEmail: 'renato.siq@yahoo.com.br',
    planId: 'premium',
    planName: 'NutriSeven Premium',
    amount: 14.99,
    method: 'credit_card',
    status: 'refunded',
    date: '2026-10-15 15:10',
  },
  {
    id: 'TXN-98210',
    customerName: 'Camila Duarte',
    customerEmail: 'camila.crossfit@outlook.com',
    planId: 'vip',
    planName: 'NutriSeven VIP (Anual)',
    amount: 358.80,
    method: 'credit_card',
    status: 'approved',
    date: '2026-09-02 11:45',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup_1',
    code: 'NUTRI20',
    discountPercent: 20,
    validUntil: '2026-12-31',
    usageCount: 84,
    maxUses: 200,
    active: true,
  },
  {
    id: 'coup_2',
    code: 'ATLETA30',
    discountPercent: 30,
    validUntil: '2026-11-30',
    usageCount: 142,
    maxUses: 150,
    active: true,
  },
  {
    id: 'coup_3',
    code: 'BLACKVIP',
    discountPercent: 40,
    validUntil: '2026-11-29',
    usageCount: 0,
    maxUses: 50,
    active: true,
  },
  {
    id: 'coup_4',
    code: 'VERAO50',
    discountPercent: 50,
    validUntil: '2026-08-31',
    usageCount: 100,
    maxUses: 100,
    active: false,
  },
];

export const INITIAL_PLANS_CONFIG: PlanPricingConfig[] = [
  {
    id: 'free',
    name: 'NutriSeven Grátis',
    monthlyPrice: 0,
    annualPrice: 0,
    badge: 'Acesso Livre',
  },
  {
    id: 'premium',
    name: 'NutriSeven Premium',
    monthlyPrice: 14.99,
    annualPrice: 9.90,
    badge: 'Mais Escolhido',
  },
  {
    id: 'vip',
    name: 'NutriSeven VIP + Consultoria',
    monthlyPrice: 39.90,
    annualPrice: 29.90,
    badge: 'Máxima Performance',
  },
];

// CSV Downloader Utility
export function exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const processRow = (row: (string | number)[]) => {
    return row
      .map((val) => {
        const str = String(val ?? '');
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(',');
  };

  const csvContent = [headers.join(','), ...rows.map(processRow)].join('\n');
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
