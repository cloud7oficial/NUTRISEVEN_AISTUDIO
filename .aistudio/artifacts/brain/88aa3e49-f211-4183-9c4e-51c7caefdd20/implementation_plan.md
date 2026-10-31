# NutriSeven — Painel Administrativo Interno (Admin Console)

Implementação de um painel de controle interno corporativo de alto padrão para gerenciar usuários, transações de pagamentos (PIX e cartão), cupons de desconto, catálogo de alimentos da calculadora e precificação dos planos. O acesso administrativo é protegido e configurado com o usuário padrão solicitado (`marketing@raphaelrobert.com.br` e senha `58911Kau@`).

### User Review & Critical Decisions

> [!IMPORTANT]
> - **Credenciais Padrão do Administrador**:
>   - E-mail: `marketing@raphaelrobert.com.br`
>   - Senha: `58911Kau@`
> - **Forma de Acesso**:
>   - Rota direta simulada `/admin` (via hash/path state no client-side router), link dedicado de "Painel Admin" no rodapé e detecção automática ao realizar login com a conta master no modal de autenticação.
>   - Opção de preenchimento com 1 clique de credenciais de admin no modal de login para agilidade em demonstrações.
> - **Módulos Integrados no Painel Interno**:
>   1. **Dashboard Financeiro & MRR**: Métricas executivas (Receita Mensal Recorrente, Faturamento Total, Assinantes Ativos, Ticket Médio, Métodos PIX vs Cartão).
>   2. **Gestão de Usuários**: Tabela de clientes com busca, filtros de plano e status, criação manual de usuários, alteração de plano (Grátis, Premium, VIP), bloqueio/suspensão e exportação em CSV.
>   3. **Gestão de Pagamentos**: Histórico de transações com controle de status (Aprovado, Pendente, Estornado), aprovação manual de PIX, estorno e download de extrato CSV.
>   4. **Gerenciador de Cupons**: Criação de códigos de desconto promocionais (% ou valor fixo), limite de uso e validade.
>   5. **Editor de Planos & Preços**: Edição dos valores dos planos (mensal e anual) com sincronização em tempo real na Landing Page pública.
>   6. **Catálogo de Alimentos & Porções**: Gerenciador da base de dados de alimentos da calculadora com adição e edição de itens.

---

### 1. Overview & Core Concept

- **What It Does**: Fornece aos administradores da marca NutriSeven uma suíte completa de controle operacional, financeiro e comercial em um ambiente privativo, sem comprometer a experiência de compra dos visitantes na Landing Page.
- **Target Audience / Persona**: Gestores da plataforma, administradores financeiros e equipes de marketing que precisam acompanhar receitas, conceder acessos a alunos/atletas e gerenciar campanhas.
- **Key Value**: Centraliza todas as operações comerciais do NutriSeven com persistência de dados em `localStorage` e sincronização bidirecional com a landing page.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Autenticação Administrativa**: O gestor faz login com `marketing@raphaelrobert.com.br` e senha `58911Kau@` ou acessa `/admin`. O sistema valida os privilégios e redireciona imediatamente para o console interno.
2. **Navegação no Console**: Sidebar dedicada à esquerda com abas:
   - *Visão Geral (Dashboard)*
   - *Usuários & Clientes*
   - *Pagamentos & Vendas*
   - *Cupons de Desconto*
   - *Configurar Planos & Preços*
   - *Catálogo de Alimentos*
3. **Gestão de Usuários**: Busca rápida por nome ou e-mail, alteração instantânea de plano via seletor dinâmico, suspensão de acesso com feedback visual imediato e botão de exportação CSV.
4. **Auditoria de Pagamentos**: Gestor visualiza transações PIX e Cartão, podendo aprovar pagamentos pendentes ou estornar transações contestadas.
5. **Retorno à Landing Page**: Botão proeminente "Ver Site Público" na barra superior para inspecionar as alterações feitas.

#### Visual Identity & Theme (SaaS Console)
- **Superfície**: Neutral Obsidian (`#090B10`) com superfícies de cartão em grafite polido (`#12151F`) e divisores sutis em hairline (`rgba(255,255,255,0.08)`).
- **Acentos**: Verde neon (`#00FF87`) para status positivos e ações primárias, azul elétrico (`#38BDF8`) para dados métricos e carmim (`#F43F5E`) para cancelamentos/estornos.
- **Tipografia**: Numerais e valores financeiros estritamente tabulares (`tabular-nums font-mono`).

---

### 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Sincronização em Tempo Real com a Landing Page**
  - *Abordagem Escolhida*: Os dados de planos, alimentos e usuários salvos no Admin são armazenados no `localStorage` compartilhado. Quando o gestor altera o preço do Premium de R$ 14,99 para outro valor, o site público reflete a alteração na mesma hora.
  - *Motivo*: Demonstra controle funcional real e integrado do negócio.

- **Decisão 2: Exportação Nativa em CSV**
  - *Abordagem Escolhida*: Gerar e disparar download instantâneo de arquivos `.csv` formatados para usuários e transações via Blob JavaScript no navegador, compatível com Excel e Google Sheets.
  - *Motivo*: Não requer dependências pesadas externas e atende ao requisito especificado.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────┐
│                      NutriSeven Application                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ View Router (Current Route: Landing Page <-> /admin Console│  │
│  └────────────────────────────────────────────────────────────┘  │
│                                │                                 │
│       ┌────────────────────────┴────────────────────────┐        │
│       ▼                                                 ▼        │
│ ┌───────────────────────────┐           ┌──────────────────────┐ │
│ │   Public Landing Page     │           │   Admin Console      │ │
│ │   - Hero & Calculator     │           │   - Sidebar Nav      │ │
│ │   - Pricing & Food Guide  │           │   - Metrics Overview │ │
│ │   - Auth & Checkout       │           │   - Users Table      │ │
│ └───────────────────────────┘           │   - Payments Ledger  │ │
│                                         │   - Coupons Manager  │ │
│                                         │   - Catalog & Prices │ │
│                                         └──────────────────────┘ │
│                                                     │            │
│  ┌──────────────────────────────────────────────────┴─────────┐  │
│  ▼                                                            ▼  │
│ ┌─────────────────────────────────────────────────────────────┐  │
│ │  Shared Admin Store (localStorage with pre-seeded records):  │  │
│ │  - Admin Auth (marketing@raphaelrobert.com.br / 58911Kau@)   │  │
│ │  - Users List & Roles                                       │  │
│ │  - Payments (PIX & Card transactions)                       │  │
│ │  - Coupons (active discounts)                               │  │
│ │  - Food Catalog & Plan Pricing Rates                        │  │
│ └─────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```
