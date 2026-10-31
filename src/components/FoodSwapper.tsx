import React, { useState, useMemo } from 'react';
import { FoodItem, GroceryItem } from '../types';
import { foodDatabase } from '../data/nutritionData';
import { ShoppingCart, Check, Plus, Trash2, Copy, Sparkles, Scale, RefreshCw, ArrowRight, CheckCheck } from 'lucide-react';

interface FoodSwapperProps {
  onOpenCheckout: (planId: 'premium' | 'vip') => void;
  foods?: FoodItem[];
}

export const FoodSwapper: React.FC<FoodSwapperProps> = ({ onOpenCheckout, foods }) => {
  const activeFoods = foods || foodDatabase;
  const [category, setCategory] = useState<'protein' | 'carb' | 'fat'>('protein');
  const [selectedFoodId, setSelectedFoodId] = useState<string>('p1'); // Default: Peito de Frango
  const [portionGrams, setPortionGrams] = useState<number>(150);

  // Grocery List State
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([
    { id: '1', name: 'Peito de Frango Congelado (1 kg)', quantity: '1 pacote', category: 'Proteínas', checked: false },
    { id: '2', name: 'Ovos Caipiras (Cartela 30 un)', quantity: '1 cartela', category: 'Proteínas', checked: true },
    { id: '3', name: 'Arroz Integral (1 kg)', quantity: '1 pct', category: 'Carboidratos', checked: false },
    { id: '4', name: 'Batata-Doce Rosada', quantity: '2 kg', category: 'Carboidratos', checked: false },
    { id: '5', name: 'Azeite Extra Virgem (500 ml)', quantity: '1 garrafa', category: 'Gorduras', checked: false },
  ]);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemQty, setCustomItemQty] = useState('');
  const [copied, setCopied] = useState(false);

  // Available foods in category
  const categoryFoods = useMemo(() => {
    return activeFoods.filter((f) => f.category === category);
  }, [category, activeFoods]);

  // Selected food item
  const selectedFood = useMemo(() => {
    return activeFoods.find((f) => f.id === selectedFoodId) || categoryFoods[0];
  }, [selectedFoodId, categoryFoods, activeFoods]);

  // Calculate target key macro delivered by the source portion
  const targetMacroGrams = useMemo(() => {
    const ratio = portionGrams / selectedFood.portionGrams;
    if (category === 'protein') return Number((selectedFood.protein * ratio).toFixed(1));
    if (category === 'carb') return Number((selectedFood.carbs * ratio).toFixed(1));
    return Number((selectedFood.fat * ratio).toFixed(1));
  }, [selectedFood, portionGrams, category]);

  // Equivalencies for other items in the category
  const substitutions = useMemo(() => {
    return categoryFoods
      .filter((f) => f.id !== selectedFood.id)
      .map((item) => {
        // Find required grams of item to achieve targetMacroGrams
        const keyMacroPerGram =
          category === 'protein'
            ? item.protein / item.portionGrams
            : category === 'carb'
            ? item.carbs / item.portionGrams
            : item.fat / item.portionGrams;

        const neededGrams = Math.round(targetMacroGrams / keyMacroPerGram);
        const ratio = neededGrams / item.portionGrams;
        const totalCalories = Math.round(item.calories * ratio);
        const itemProtein = Math.round(item.protein * ratio);
        const itemCarbs = Math.round(item.carbs * ratio);
        const itemFat = Math.round(item.fat * ratio);

        return {
          item,
          neededGrams,
          totalCalories,
          itemProtein,
          itemCarbs,
          itemFat,
        };
      });
  }, [categoryFoods, selectedFood, targetMacroGrams, category]);

  // Add substitution to grocery list
  const handleAddToGrocery = (name: string, quantityText: string) => {
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name,
      quantity: quantityText,
      category: category === 'protein' ? 'Proteínas' : category === 'carb' ? 'Carboidratos' : 'Gorduras',
      checked: false,
    };
    setGroceryList((prev) => [newItem, ...prev]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim()) return;
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: customItemName.trim(),
      quantity: customItemQty.trim() || '1 un',
      category: 'Geral',
      checked: false,
    };
    setGroceryList((prev) => [...prev, newItem]);
    setCustomItemName('');
    setCustomItemQty('');
  };

  const toggleCheck = (id: string) => {
    setGroceryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeItem = (id: string) => {
    setGroceryList((prev) => prev.filter((item) => item.id !== id));
  };

  const copyToClipboard = () => {
    const text = groceryList
      .map((i) => `[${i.checked ? 'X' : ' '}] ${i.name} - ${i.quantity}`)
      .join('\n');
    navigator.clipboard.writeText(`*LISTA DE COMPRAS NUTRISEVEN*\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="substitutos" className="relative py-20 bg-[#0B0D14] border-t border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF87]/30 bg-[#00FF87]/10 px-3.5 py-1 text-xs font-bold text-[#00FF87] uppercase tracking-wider">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Flexibilidade Alimentar Sem Erro</span>
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Guia de Alimentos Substitutos & <span className="text-[#00FF87]">Lista Inteligente</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Acabou o frango ou o arroz? Descubra a porção exata de outros alimentos para manter seus macros intactos e monte sua lista de feira.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-black/50 border border-white/10 gap-1 sm:gap-2">
            {[
              { id: 'protein', label: 'Proteínas' },
              { id: 'carb', label: 'Carboidratos' },
              { id: 'fat', label: 'Gorduras Boas' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setCategory(tab.id as any);
                  const first = foodDatabase.find((f) => f.category === tab.id);
                  if (first) {
                    setSelectedFoodId(first.id);
                    setPortionGrams(first.portionGrams);
                  }
                }}
                className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  category === tab.id
                    ? 'bg-[#00FF87] text-black shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Swapper on Left, Grocery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Food Swapper Engine */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121520] p-6 sm:p-8 space-y-6">
            
            {/* Base Food Selector */}
            <div className="border-b border-white/10 pb-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Alimento Base no seu Prato
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Escolha o Alimento
                  </label>
                  <select
                    value={selectedFood.id}
                    onChange={(e) => {
                      setSelectedFoodId(e.target.value);
                      const f = foodDatabase.find((item) => item.id === e.target.value);
                      if (f) setPortionGrams(f.portionGrams);
                    }}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-3 text-sm font-bold text-white focus:border-[#00FF87] focus:outline-none"
                  >
                    {categoryFoods.map((f) => (
                      <option key={f.id} value={f.id} className="bg-[#121520] text-white">
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Quantidade no Prato (gramas)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="10"
                      min="10"
                      max="1000"
                      value={portionGrams}
                      onChange={(e) => setPortionGrams(Math.max(10, Number(e.target.value)))}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-3 text-sm font-mono font-bold text-white focus:border-[#00FF87] focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-3.5 font-mono text-xs text-slate-500">g</span>
                  </div>
                </div>
              </div>

              {/* Active Base Food Metrics Badge */}
              <div className="rounded-xl border border-[#00FF87]/30 bg-[#00FF87]/5 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Alvo a Ser Substituído</span>
                  <span className="text-sm font-bold text-white">
                    {portionGrams}g de {selectedFood.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-extrabold text-[#00FF87]">
                    {targetMacroGrams}g
                  </span>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">
                    de {category === 'protein' ? 'Proteína' : category === 'carb' ? 'Carboidrato' : 'Gordura'}
                  </span>
                </div>
              </div>
            </div>

            {/* Substitution Cards List */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Opções Equivalentes com o Mesmo Aporte
              </span>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {substitutions.map((sub) => (
                  <div
                    key={sub.item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5 hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{sub.item.name}</span>
                        <span className="font-mono text-xs font-bold text-[#00FF87] bg-[#00FF87]/10 px-2 py-0.5 rounded">
                          {sub.neededGrams}g
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {sub.totalCalories} kcal · P: {sub.itemProtein}g | C: {sub.itemCarbs}g | G: {sub.itemFat}g
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToGrocery(sub.item.name, `${sub.neededGrams}g`)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-black hover:bg-[#00FF87] hover:border-[#00FF87] transition-all whitespace-nowrap self-start sm:self-auto"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Adicionar à Lista</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Grocery List */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0E1119] p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00FF87]/20 text-[#00FF87]">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-athletic text-xl uppercase tracking-wider text-white">
                    Lista de Compras
                  </h3>
                  <span className="text-xs text-slate-400">
                    {groceryList.filter((i) => i.checked).length} de {groceryList.length} itens marcados
                  </span>
                </div>
              </div>

              {groceryList.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-[#00FF87] hover:bg-[#10B981] rounded-lg transition-all"
                  title="Copiar lista de compras"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Add Custom Item Input */}
            <form onSubmit={handleAddCustom} className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: Creatina 300g..."
                value={customItemName}
                onChange={(e) => setCustomItemName(e.target.value)}
                className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs font-medium text-white placeholder-slate-500 focus:border-[#00FF87] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Qtd (ex: 2 un)"
                value={customItemQty}
                onChange={(e) => setCustomItemQty(e.target.value)}
                className="w-24 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs font-medium text-white placeholder-slate-500 focus:border-[#00FF87] focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-white/10 hover:bg-[#00FF87] hover:text-black text-white transition-colors"
                title="Adicionar item"
              >
                <Plus className="h-4 w-4" />
              </button>
            </form>

            {/* Checklist Box */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {groceryList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  Sua lista está vazia. Adicione itens acima ou a partir dos substitutos.
                </div>
              ) : (
                groceryList.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      item.checked
                        ? 'border-white/5 bg-black/30 opacity-60'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                          item.checked
                            ? 'border-[#00FF87] bg-[#00FF87] text-black'
                            : 'border-slate-500'
                        }`}
                      >
                        {item.checked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          item.checked ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400 bg-black/40 px-2 py-0.5 rounded">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Remover"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Premium Sync Feature Callout */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 flex items-center justify-between text-xs text-slate-400">
              <span>Sincronize sua lista no celular com o plano Premium.</span>
              <button
                onClick={() => onOpenCheckout('premium')}
                className="font-bold text-[#00FF87] hover:underline"
              >
                Ativar →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
