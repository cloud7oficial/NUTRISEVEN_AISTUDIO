import React, { useState } from 'react';
import { FoodItem } from '../../types';
import { Utensils, Search, Plus, Trash2, CheckCircle2, X } from 'lucide-react';

interface AdminFoodCatalogProps {
  foods: FoodItem[];
  onAddFood: (newFood: FoodItem) => void;
  onDeleteFood: (foodId: string) => void;
}

export const AdminFoodCatalog: React.FC<AdminFoodCatalogProps> = ({
  foods,
  onAddFood,
  onDeleteFood,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'protein' | 'carb' | 'fat'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New food form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'protein' | 'carb' | 'fat'>('protein');
  const [portionGrams, setPortionGrams] = useState<number>(100);
  const [calories, setCalories] = useState<number>(150);
  const [protein, setProtein] = useState<number>(20);
  const [carbs, setCarbs] = useState<number>(5);
  const [fat, setFat] = useState<number>(3);
  const [measureDescription, setMeasureDescription] = useState('1 porção média');

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filtered = foods.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFood: FoodItem = {
      id: 'food_' + Date.now(),
      name: name.trim(),
      category,
      portionGrams,
      calories,
      protein,
      carbs,
      fat,
      measureDescription: measureDescription.trim() || '1 porção',
    };

    onAddFood(newFood);
    setModalOpen(false);
    setName('');
    showFeedback(`Alimento "${newFood.name}" adicionado à base de dados da calculadora!`);
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
            Catálogo de <span className="text-[#00FF87]">Alimentos & Porções</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Gerencie os alimentos da calculadora de calorias e do guia interativo de substituições.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#10B981] text-xs font-bold uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Adicionar Novo Alimento</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nome do alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#00FF87] focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="w-full rounded-xl border border-white/15 bg-[#0E1119] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#00FF87] focus:outline-none"
          >
            <option value="all">Todas as Categorias</option>
            <option value="protein">Apenas Proteínas</option>
            <option value="carb">Apenas Carboidratos</option>
            <option value="fat">Apenas Gorduras</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0E1119] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-black/40 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Alimento</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Porção Base</th>
                <th className="py-3 px-4 text-right">Calorias</th>
                <th className="py-3 px-4 text-right">Proteína</th>
                <th className="py-3 px-4 text-right">Carboidrato</th>
                <th className="py-3 px-4 text-right">Gordura</th>
                <th className="py-3 px-4 text-center">Excluir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((food) => (
                <tr key={food.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    {food.name}
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Medida: {food.measureDescription}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        food.category === 'protein'
                          ? 'bg-[#00FF87]/15 text-[#00FF87]'
                          : food.category === 'carb'
                          ? 'bg-sky-500/15 text-sky-400'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {food.category === 'protein'
                        ? 'Proteína'
                        : food.category === 'carb'
                        ? 'Carboidrato'
                        : 'Gordura'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{food.portionGrams}g</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-white">
                    {food.calories} kcal
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[#00FF87]">{food.protein}g</td>
                  <td className="py-3 px-4 text-right font-mono text-sky-400">{food.carbs}g</td>
                  <td className="py-3 px-4 text-right font-mono text-amber-400">{food.fat}g</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        onDeleteFood(food.id);
                        showFeedback(`Alimento "${food.name}" removido.`);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Excluir da Base"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Food Modal */}
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
              Adicionar Alimento à Base
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              O novo alimento ficará disponível no guia de substituições e na calculadora.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome do Alimento
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Iogurte Grego Desnatado"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                  >
                    <option value="protein">Proteína</option>
                    <option value="carb">Carboidrato</option>
                    <option value="fat">Gordura Boa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gramas da Porção Base
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={portionGrams}
                    onChange={(e) => setPortionGrams(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#00FF87] focus:outline-none"
                  />
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                    Calorias
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-2.5 py-2 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#00FF87] mb-1">
                    Prot (g)
                  </label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-2.5 py-2 text-xs font-mono text-[#00FF87]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-sky-400 mb-1">
                    Carbo (g)
                  </label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-2.5 py-2 text-xs font-mono text-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-amber-400 mb-1">
                    Gord (g)
                  </label>
                  <input
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-2.5 py-2 text-xs font-mono text-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Descrição de Medida Caseira
                </label>
                <input
                  type="text"
                  placeholder="Ex: 1 pote (150g) ou 2 colheres de sopa"
                  value={measureDescription}
                  onChange={(e) => setMeasureDescription(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#10B981] font-bold text-xs uppercase tracking-wider text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] mt-2"
              >
                Cadastrar Alimento
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
