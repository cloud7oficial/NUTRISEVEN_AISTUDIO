import { Activity, CalculationResult, FoodItem, Goal, Sex } from '../types';

export const activityFactors: Record<Activity, { factor: number; label: string; desc: string }> = {
  sedentary: { factor: 1.2, label: 'Sedentário', desc: 'Trabalho em escritório, pouco ou nenhum exercício' },
  light: { factor: 1.375, label: 'Levemente Ativo', desc: 'Exercício leve 1 a 3 dias por semana' },
  moderate: { factor: 1.55, label: 'Moderadamente Ativo', desc: 'Treinos de força ou cárdio 3 a 5 dias por semana' },
  active: { factor: 1.725, label: 'Muito Ativo', desc: 'Treinos intensos 6 a 7 dias por semana' },
  very: { factor: 1.9, label: 'Extremamente Ativo', desc: 'Atleta profissional, treinos pesados 2x ao dia' },
};

export const goalDetails: Record<Goal, { label: string; desc: string; calorieDelta: number; proteinMultiplier: number }> = {
  lose: {
    label: 'Definição / Emagrecimento',
    desc: 'Déficit calórico estratégico preservando massa muscular',
    calorieDelta: -500,
    proteinMultiplier: 2.0,
  },
  maintain: {
    label: 'Manutenção & Performance',
    desc: 'Equilíbrio exato entre ingestão e gasto para alta energia',
    calorieDelta: 0,
    proteinMultiplier: 1.6,
  },
  gain: {
    label: 'Hipertrofia / Ganho de Massa',
    desc: 'Superávit controlado para construção de tecido magro sem gordura',
    calorieDelta: 300,
    proteinMultiplier: 1.8,
  },
};

export function calculateNutrition(input: {
  sex: Sex;
  age: number;
  height: number;
  weight: number;
  goal: Goal;
  activity: Activity;
}): CalculationResult {
  // Mifflin-St Jeor Formula
  const bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age + (input.sex === 'male' ? 5 : -161);
  const factor = activityFactors[input.activity]?.factor || 1.2;
  const tdee = bmr * factor;
  
  const delta = goalDetails[input.goal]?.calorieDelta ?? 0;
  const calories = Math.max(1200, Math.round(tdee + delta));

  const proteinMultiplier = goalDetails[input.goal]?.proteinMultiplier ?? 1.8;
  const protein = Math.round(input.weight * proteinMultiplier);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.max(50, Math.round((calories - protein * 4 - fat * 9) / 4));

  const waterDailyMl = Math.round((input.weight * 38) / 50) * 50;
  const mealsCount = input.goal === 'gain' ? 5 : 4;

  const mealPlan = mealsCount === 5
    ? [
        { name: 'Café da Manhã Energético', pct: 25, calories: Math.round(calories * 0.25), suggestedFoods: ['Ovos mexidos', 'Pão integral ou tapioca', 'Fruta com aveia'] },
        { name: 'Lanche Matinal Anabólico', pct: 10, calories: Math.round(calories * 0.10), suggestedFoods: ['Iogurte natural', 'Frutas vermelhas', 'Castanhas'] },
        { name: 'Almoço de Alta Performance', pct: 30, calories: Math.round(calories * 0.30), suggestedFoods: ['Peito de frango ou carne magra', 'Arroz + feijão', 'Salada verde escura com azeite'] },
        { name: 'Lanche Pré-Treino / Tarde', pct: 10, calories: Math.round(calories * 0.10), suggestedFoods: ['Banana com pasta de amendoim', 'Whey Protein'] },
        { name: 'Jantar Reparador Noturno', pct: 25, calories: Math.round(calories * 0.25), suggestedFoods: ['Peixe grelhado ou ovos cozidos', 'Batata-doce ou abóbora', 'Legumes no vapor'] },
      ]
    : [
        { name: 'Café da Manhã Balanceado', pct: 25, calories: Math.round(calories * 0.25), suggestedFoods: ['Ovos mexidos', 'Pão integral', 'Mamão com aveia'] },
        { name: 'Almoço de Alta Performance', pct: 35, calories: Math.round(calories * 0.35), suggestedFoods: ['Filé de frango ou peixe', 'Arroz integral', 'Legumes salteados e salada'] },
        { name: 'Lanche da Tarde Estratégico', pct: 15, calories: Math.round(calories * 0.15), suggestedFoods: ['Iogurte com chia', 'Maçã ou banana', 'Mix de castanhas'] },
        { name: 'Jantar Leve & Saciedade', pct: 25, calories: Math.round(calories * 0.25), suggestedFoods: ['Carne magra ou ovos', 'Salada farta com azeite extra virgem', 'Batata cozida'] },
      ];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories,
    protein,
    fat,
    carbs,
    mealsCount,
    waterDailyMl,
    mealPlan,
  };
}

export const foodDatabase: FoodItem[] = [
  // Proteínas (Base: ~30g de proteína de referência)
  { id: 'p1', name: 'Peito de Frango Grelhado', category: 'protein', portionGrams: 100, calories: 165, protein: 31, carbs: 0, fat: 3.6, measureDescription: '1 filé médio' },
  { id: 'p2', name: 'Carne Vermelha Magra (Patinho)', category: 'protein', portionGrams: 100, calories: 185, protein: 30, carbs: 0, fat: 6.5, measureDescription: '4 colheres de sopa moído' },
  { id: 'p3', name: 'Filé de Tilápia / Peixe Branco', category: 'protein', portionGrams: 120, calories: 130, protein: 26, carbs: 0, fat: 2.7, measureDescription: '1 filé grande' },
  { id: 'p4', name: 'Ovos de Galinha Inteiros', category: 'protein', portionGrams: 100, calories: 143, protein: 13, carbs: 0.7, fat: 9.5, measureDescription: '2 ovos médios' },
  { id: 'p5', name: 'Claras de Ovo Pasteurizadas', category: 'protein', portionGrams: 100, calories: 52, protein: 11, carbs: 0.7, fat: 0.2, measureDescription: '3 a 4 claras' },
  { id: 'p6', name: 'Whey Protein Isolado / Concentrado', category: 'protein', portionGrams: 30, calories: 120, protein: 24, carbs: 2, fat: 1.5, measureDescription: '1 dosador (scoop)' },
  { id: 'p7', name: 'Queijo Cottage 0% Gordura', category: 'protein', portionGrams: 100, calories: 72, protein: 12, carbs: 3.4, fat: 1, measureDescription: '3 colheres de sopa cheias' },
  { id: 'p8', name: 'Tofu Firme Orgânico', category: 'protein', portionGrams: 100, calories: 85, protein: 10, carbs: 2, fat: 5, measureDescription: '1 fatia grossa (100g)' },

  // Carboidratos (Base: ~30g de carboidratos de referência)
  { id: 'c1', name: 'Arroz Branco Cozido', category: 'carb', portionGrams: 100, calories: 130, protein: 2.5, carbs: 28.2, fat: 0.3, measureDescription: '3 colheres de sopa cheias' },
  { id: 'c2', name: 'Arroz Integral Cozido', category: 'carb', portionGrams: 100, calories: 124, protein: 2.6, carbs: 25.8, fat: 1.0, measureDescription: '3 colheres de sopa cheias' },
  { id: 'c3', name: 'Batata-Doce Cozida', category: 'carb', portionGrams: 100, calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, measureDescription: '1 unidade pequena' },
  { id: 'c4', name: 'Batata Inglesa Cozida', category: 'carb', portionGrams: 100, calories: 77, protein: 2.0, carbs: 17.5, fat: 0.1, measureDescription: '1 batata média' },
  { id: 'c5', name: 'Mandioca / Aipim Cozido', category: 'carb', portionGrams: 100, calories: 125, protein: 0.6, carbs: 30.1, fat: 0.3, measureDescription: '1 pedaço médio' },
  { id: 'c6', name: 'Aveia em Flocos Finos', category: 'carb', portionGrams: 40, calories: 156, protein: 5.6, carbs: 26.8, fat: 3.2, measureDescription: '2 colheres de sopa cheias' },
  { id: 'c7', name: 'Pão Integral 100%', category: 'carb', portionGrams: 50, calories: 120, protein: 5.0, carbs: 22.0, fat: 1.5, measureDescription: '2 fatias' },
  { id: 'c8', name: 'Macarrão de Sêmola Cozido', category: 'carb', portionGrams: 100, calories: 140, protein: 5.0, carbs: 28.0, fat: 0.6, measureDescription: '1 pegador generoso' },

  // Gorduras Boas (Base: ~12g a 15g de lipídios de referência)
  { id: 'f1', name: 'Azeite de Oliva Extra Virgem', category: 'fat', portionGrams: 15, calories: 132, protein: 0, carbs: 0, fat: 14.8, measureDescription: '1 colher de sopa' },
  { id: 'f2', name: 'Pasta de Amendoim Integral', category: 'fat', portionGrams: 20, calories: 118, protein: 5.2, carbs: 3.6, fat: 9.8, measureDescription: '1 colher de sopa cheia' },
  { id: 'f3', name: 'Abacate Maduro', category: 'fat', portionGrams: 80, calories: 128, protein: 1.6, carbs: 6.8, fat: 11.7, measureDescription: '2 colheres de sopa' },
  { id: 'f4', name: 'Castanha-do-Pará (Brasil)', category: 'fat', portionGrams: 15, calories: 98, protein: 2.1, carbs: 1.8, fat: 10.0, measureDescription: '3 a 4 unidades' },
  { id: 'f5', name: 'Nozes Chilenas', category: 'fat', portionGrams: 15, calories: 98, protein: 2.3, carbs: 2.1, fat: 9.8, measureDescription: '3 metades' },
  { id: 'f6', name: 'Sementes de Chia', category: 'fat', portionGrams: 15, calories: 73, protein: 2.5, carbs: 6.3, fat: 4.6, measureDescription: '1 colher de sopa' },
];

export const pricingPlans = [
  {
    id: 'free',
    name: 'NutriSeven Grátis',
    badge: 'Acesso Livre',
    description: 'Calculadora essencial para saber seus macros e calorias diárias sem cadastro e sem pagar nada.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { text: 'Cálculo de TMB e Gasto Calórico Total (TDEE)', included: true },
      { text: 'Distribuição diária de Proteínas, Gorduras e Carboidratos', included: true },
      { text: 'Meta de ingestão hídrica personalizada', included: true },
      { text: 'Sugestão básica de divisão de refeições', included: true },
      { text: 'Histórico salvo de cálculos e progresso', included: false },
      { text: 'Cardápio interativo com substituição de alimentos', included: false },
      { text: 'Lista inteligente de compras semanal exportável', included: false },
      { text: 'Acompanhamento de peso, medidas e fotos de evolução', included: false },
      { text: 'Lembretes de hidratação e refeições no celular', included: false },
      { text: 'Suporte de nutricionista esportivo parceiro', included: false },
    ],
    ctaText: 'Usar Calculadora Grátis',
    action: 'calculator',
    popular: false,
  },
  {
    id: 'premium',
    name: 'NutriSeven Premium',
    badge: 'Mais Escolhido',
    description: 'A experiência completa e definitiva para transformar seu corpo com precisão, cardápios e lista de compras.',
    monthlyPrice: 14.99,
    annualPrice: 9.90, // cobrado anualmente (R$ 118,80)
    features: [
      { text: 'Cálculo de TMB e Gasto Calórico Total (TDEE)', included: true },
      { text: 'Distribuição diária de Proteínas, Gorduras e Carboidratos', included: true },
      { text: 'Meta de ingestão hídrica personalizada', included: true },
      { text: 'Sugestão básica de divisão de refeições', included: true },
      { text: 'Histórico salvo de cálculos e progresso', included: true },
      { text: 'Cardápio interativo com substituição de alimentos', included: true },
      { text: 'Lista inteligente de compras semanal exportável', included: true },
      { text: 'Acompanhamento de peso, medidas e fotos de evolução', included: true },
      { text: 'Lembretes de hidratação e refeições no celular', included: true },
      { text: 'Suporte de nutricionista esportivo parceiro', included: false },
    ],
    ctaText: 'Assinar NutriSeven Premium',
    action: 'checkout_premium',
    popular: true,
  },
  {
    id: 'vip',
    name: 'NutriSeven VIP + Consultoria',
    badge: 'Máxima Performance',
    description: 'Tudo do Premium somado a suporte personalizado via WhatsApp com análise profissional de metas.',
    monthlyPrice: 39.90,
    annualPrice: 29.90,
    features: [
      { text: 'Cálculo de TMB e Gasto Calórico Total (TDEE)', included: true },
      { text: 'Distribuição diária de Proteínas, Gorduras e Carboidratos', included: true },
      { text: 'Meta de ingestão hídrica personalizada', included: true },
      { text: 'Sugestão básica de divisão de refeições', included: true },
      { text: 'Histórico salvo de cálculos e progresso', included: true },
      { text: 'Cardápio interativo com substituição de alimentos', included: true },
      { text: 'Lista inteligente de compras semanal exportável', included: true },
      { text: 'Acompanhamento de peso, medidas e fotos de evolução', included: true },
      { text: 'Lembretes de hidratação e refeições no celular', included: true },
      { text: 'Suporte individual no WhatsApp com Nutricionista Esportivo', included: true },
    ],
    ctaText: 'Garantir Acesso VIP',
    action: 'checkout_vip',
    popular: false,
  },
];

export const testimonials = [
  {
    name: 'Matheus Brandão',
    role: 'Praticante de Musculação · 29 anos',
    result: '-8.4 kg de gordura em 10 semanas',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    content: 'O NutriSeven tirou todas as dúvidas que eu tinha sobre como montar o prato. A calculadora de substituições é genial: quando não tenho frango, sei exatamente quantos ovos ou tilápia comer sem sair do déficit.',
    verified: true,
  },
  {
    name: 'Camila Duarte',
    role: 'Corredora & Crossfit · 33 anos',
    result: '+3.2 kg de massa magra e 100% de energia nos treinos',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    content: 'Nunca gostei de dietas restritivas malucas. Com o NutriSeven Premium eu finalmente aprendi a ajustar os carboidratos nos dias de treino pesado. Minha performance disparou e economizo muito na feira com a lista pronta.',
    verified: true,
  },
  {
    name: 'Rodrigo Silveira',
    role: 'Engenheiro de Software · 41 anos',
    result: 'Perdeu 12 kg sem passar fome',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    content: 'Minha rotina é corrida e vivia pedindo delivery. A simplicidade da calculadora me deu um plano claro de 4 refeições. Assinei o plano anual porque custa menos que um almoço fora.',
    verified: true,
  },
];

export const faqList = [
  {
    q: 'A calculadora gratuita é realmente grátis?',
    a: 'Sim! Você pode calcular suas calorias diárias, TMB, TDEE e divisão exata de macronutrientes (proteína, carboidrato e gordura) de forma 100% gratuita, sem necessidade de cadastrar cartão de crédito.',
  },
  {
    q: 'Qual a diferença entre a calculadora grátis e o NutriSeven Premium?',
    a: 'A versão gratuita entrega os números matemáticos do seu gasto diário. O plano Premium entrega o ecossistema prático: cardápio horário a horário, ferramenta de substituição de alimentos para não enjoar, lista de compras semanal inteligente, registro de evolução de peso e medidas e lembretes no celular.',
  },
  {
    q: 'Como funciona a garantia de 7 dias?',
    a: 'Se você assinar o NutriSeven Premium ou VIP e achar que ele não agregou valor aos seus treinos e rotina alimentar, basta solicitar o reembolso em até 7 dias corridos. Devolvemos 100% do seu dinheiro sem perguntas.',
  },
  {
    q: 'Sou vegetariano ou vegano. A ferramenta funciona para mim?',
    a: 'Sim! Nosso guia de alimentos substitutos conta com fontes proteicas e lipídicas vegetais completas (tofu, chia, sementes, castanhas e feijões) com cálculo de porções equivalente.',
  },
  {
    q: 'O que acontece após eu assinar o NutriSeven Premium?',
    a: 'Seu acesso aos recursos exclusivos é liberado imediatamente na sua conta. Você recebe seu login e pode acessar em qualquer dispositivo, computador ou celular.',
  },
];
