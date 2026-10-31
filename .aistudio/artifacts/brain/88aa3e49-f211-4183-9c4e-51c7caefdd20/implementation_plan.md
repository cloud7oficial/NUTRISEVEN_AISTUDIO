# NutriSeven — Landing Page de Alta Performance & Conversão

Uma landing page comercial de alto impacto para o NutriSeven voltada à apresentação, conversão e venda da assinatura Premium, com acesso à calculadora gratuita simplificada de calorias e macros, modal de autenticação integrado, simulador de tempo para atingir metas, comparador interativo Grátis vs Premium e guia inteligente de alimentos substitutos.

### User Review & Critical Decisions

> [!IMPORTANT]
> As preferências informadas na etapa anterior foram integradas como diretrizes centrais da aplicação:
> - **Objetivo Comercial & Oferta**: Foco em converter visitantes em clientes do plano Premium, ao mesmo tempo em que oferece uma calculadora gratuita sem recursos pagos para geração de valor imediato.
> - **Estilo Visual**: Alta performance atlética com contrastes marcantes, fundo grafite/obsidiana profundo (`#090A0F`), acentos neon em verde elétrico/esmeralda hiper-nítido (`#00FF87` e `#10B981`) e tipografia condensada e imponente.
> - **Autenticação**: Modal integrado de Login/Cadastro funcional com estados de transição suaves, validação de campos e perfil ativo.
> - **Módulos de Valor Inclusos**:
>   1. **Calculadora Grátis Simplificada**: Cálculo rápido de TMB, gasto energético diário (TDEE) e divisão básica de macronutrientes (proteínas, carboidratos, gorduras) com call-to-action para desbloquear planos e cardápios completos.
>   2. **Calculadora de Projeção de Metas**: Estimativa de semanas e datas realistas para atingir o peso desejado com base no déficit ou superávit calórico sustentável.
>   3. **Comparador Interativo Grátis vs Premium**: Tabela comparativa e seletor dinâmico detalhando o que é liberado gratuitamente versus os diferenciais do NutriSeven Pro/VIP (cardápios automáticos, lista de compras, suporte nutricional, alertas).
>   4. **Guia de Alimentos Substitutos & Lista Inteligente**: Ferramenta interativa permitindo trocar carboidratos, proteínas e gorduras mantendo a equivalência de macros com exportação para lista de mercado.

---

### 1. Overview & Core Concept

- **What It Does**: Transforma o repositório NutriSeven em uma vitrine de conversão de classe mundial para o ecossistema de nutrição esportiva. Permite que qualquer usuário calcule suas necessidades calóricas básicas gratuitamente, experimente a calculadora de projeção de tempo, explore o guia de substituição alimentar e visualize claramente o retorno de assinar o plano NutriSeven Premium.
- **Target Audience / Persona**: Atletas, praticantes de musculação e crossfit, pessoas em busca de emagrecimento definitivo ou hipertrofia que necessitam de precisão nutricional, praticidade no mercado e acompanhamento sem complicações.
- **Key Value**: Elimina a adivinhação na dieta combinando rigor matemático com usabilidade instantânea, criando um funil de vendas irresistível para a versão paga.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Hero & Proposta de Valor**: Título de alto impacto visual, métricas de resultado, chamada de ação primária para assinar ou testar a calculadora gratuita.
2. **Calculadora Gratuita no Fluxo**: Formulário esportivo com inputs diretos (sexo, idade, altura, peso, nível de atividade física e objetivo). Apresentação instantânea de calorias totais, gramatura de proteínas, gorduras e carboidratos, com indicação dos recursos exclusivos do Premium bloqueados para despertar desejo.
3. **Calculadora de Projeção de Tempo**: Usuário ajusta peso atual vs peso meta e taxa de intensidade; a ferramenta projeta graficamente a data estimada de conquista e o déficit seguro sugerido.
4. **Guia Interativo de Alimentos Substitutos**: Seleciona um alimento base (ex: frango, arroz branco, azeite) e obtém opções equivalentes em gramas e macros, com possibilidade de adicionar itens à lista de compras interativa da semana.
5. **Comparativo Interativo Grátis vs Premium**: Alternância entre planos mensal e anual com economia destacada, checklist interativo de benefícios e botão de checkout direto.
6. **Modal de Autenticação / Conta**: Acesso facilitado no cabeçalho com alternância entre "Entrar" e "Criar Conta", feedback em tempo real e simulação de sessão de usuário.
7. **Depoimentos e Prova Social**: Casos reais com métricas quantitativas (kg perdidos, semanas de adesão, massa muscular ganha).

#### Visual Identity & Theme
- **Direção Estética**: Alta performance atlética contemporânea, inspirada em marcas de ponta do fitness (Nike Training, Whoop, Gymshark).
- **Paleta de Cores (60-30-10)**:
  - *Canvas Neutro Dominante (60%)*: Preto obsidiana (`#07080C`) e cinza escuro esportivo (`#0F1118`).
  - *Superfícies Estruturais (30%)*: Cartões em grafite polido (`#161922`), bordas ultrafinas translúcidas (`rgba(255,255,255,0.08)`), textos em branco puro e ardósia suave (`#94A3B8`).
  - *Acentos Neon de Alta Energia (10%)*: Verde neon elétrico (`#00FF87` e `#10B981`) para CTAs e destaques, com toques de ciano elétrico para dados comparativos.
- **Tipografia & Hierarquia**:
  - Títulos: Fonte de impacto com `tracking-tight` e pesos bold/extrabold (`Plus Jakarta Sans` ou display athletic).
  - Corpo: Sans-serif nítida e confortável (`Plus Jakarta Sans` / `DM Sans`), com algarismos tabulares (`tabular-nums`) em todos os números e métricas.
  - Regra anti-slop: Sem pílulas genéricas empilhadas, sem emojis espalhados, sem comentários falsos de código (`//`).
- **Top Bar Contract**:
  - Marca: `NutriSeven` em tipografia marcante com acento elétrico.
  - Navegação: 4 links essenciais de uma linha: `Calculadora`, `Projeção`, `Substitutos`, `Planos`.
  - Ação Primária: Botão `Assinar Premium` e atalho de `Entrar`.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Calculadora Grátis Direta na Landing Page vs Página Externa**
  - *Abordagem Escolhida*: Seção interativa com scroll suave e modal rápido para cálculo completo, sem recarregar a página e sem pedir cartão ou cadastro obrigatório.
  - *Motivo*: Reduz o atrito de conversão a zero. O usuário experimenta o valor da ferramenta em menos de 30 segundos e se depara com os diferenciais Premium (cardápio detalhado, cronograma de refeições) como próximo passo natural.
  - *Alternativas*: Redirecionar para tela externa de cálculo (descartado por interromper a jornada de vendas).

- **Decisão 2: Modal de Login e Gestão de Sessão do Usuário**
  - *Abordagem Escolhida*: Modal acessível em overlay leve integrado à navegação com persistência em `localStorage`, permitindo salvar cálculos anteriores e alternar entre visitante e usuário cadastrado.
  - *Motivo*: Dá autonomia imediata ao visitante sem requerer configurações complexas de backend para navegar pela landing page, mantendo a experiência fluida.

- **Decisão 3: Ferramentas Interativas Complementares (Substitutos + Projeção de Tempo)**
  - *Abordagem Escolhida*: Implementar como componentes funcionais em tempo real com cálculos baseados na fórmula Harris-Benedict / Mifflin-St Jeor e equivalência calórica/macronutricional (4 kcal/g proteína, 4 kcal/g carboidrato, 9 kcal/g gordura).
  - *Motivo*: Enriquece a landing page com utilidade prática comprovada, aumentando o tempo de permanência e a autoridade da marca.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────┐
│                          NutriSeven App                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │   Top Navigation Bar (Brand · 4 Nav Anchors · Login / CTA)  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                │                                 │
│  ┌─────────────────────────────┼──────────────────────────────┐  │
│  ▼                             ▼                              ▼  │
│ ┌───────────────┐     ┌──────────────────┐     ┌──────────────┐  │
│ │  Hero Section │     │ Free Calculator  │     │ Goal Timeline│  │
│ │  - Value Prop │     │ - TDEE & Macros  │     │ - Projected  │  │
│ │  - CTAs       │     │ - Locked Teaser  │     │   Weeks & Date│ │
│ └───────────────┘     └──────────────────┘     └──────────────┘  │
│                                │                                 │
│  ┌─────────────────────────────┼──────────────────────────────┐  │
│  ▼                             ▼                              ▼  │
│ ┌───────────────┐     ┌──────────────────┐     ┌──────────────┐  │
│ │ Food Swapper  │     │ Pricing Plans    │     │ Auth Modal   │  │
│ │ & Smart List  │     │ - Free vs Pro    │     │ - Login /    │  │
│ │ - Equivalents │     │ - Billing Toggle │     │   Register   │  │
│ └───────────────┘     └──────────────────┘     └──────────────┘  │
│                                │                                 │
│  ┌─────────────────────────────┴──────────────────────────────┐  │
│  ▼                                                               │
│ ┌─────────────────────────────────────────────────────────────┐  │
│ │   Social Proof & Testimonials · FAQ · High-Impact Footer    │  │
│ └─────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

#### Estrutura de Estado e Dados
- **UserState**: Autenticação (usuário logado, nome, e-mail, plano ativo: `free` ou `premium`).
- **CalculatorState**: Dados antropométricos (sexo, idade, peso, altura, nível de atividade física, objetivo).
- **ProjectionState**: Meta de peso, ritmo semanal desejado (0.25kg a 1.0kg/semana) e data estimada.
- **SwapperState**: Categoria selecionada, alimento de origem, quantidade e opções geradas de substituição com macros equivalentes, além de itens adicionados ao carrinho/lista.
- **PricingState**: Ciclo de cobrança (Mensal vs Anual com desconto de até 40%).
