import React, { useState } from 'react';
import { faqList } from '../data/nutritionData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-20 bg-[#07080C] border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5 text-[#00FF87]" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Perguntas <span className="text-[#00FF87]">Frequentes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tudo o que você precisa saber sobre o cálculo gratuito e os benefícios do NutriSeven Premium.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0E1119] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/5"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {item.q}
                  </span>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#00FF87]' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
