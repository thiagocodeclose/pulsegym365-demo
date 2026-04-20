# Website Integration Documentation

## 📚 Overview

Este diretório contém toda a documentação técnica e de negócios para a **Website Widget Integration** — o sistema de integração de widgets CodeGym em sites de academias.

A função principal deste repositório (pulsegym365-demo) é **demonstrar** como essa integração funciona de forma antes/depois, reduzindo fricção de venda.

---

## 📖 Documentos

### 1. [WEBSITE_INTEGRATION_EXECUTIVE_SUMMARY.md](./WEBSITE_INTEGRATION_EXECUTIVE_SUMMARY.md)
**Leia isto primeiro se:** Você quer entender o contexto comercial e de negócios.

**Contém:**
- Visão geral: o que é integração de widgets CodeGym
- Jornada do visitante (como widgets melhoram conversão)
- 3 opções de integração (Universal Script, Individual, Direct Links)
- Armazenamento visual (Storefront Layer)
- Função de Demo Comercial Before/After (o que este repo demonstra)
- 17 widgets disponíveis com descrições

**Público:** Product Managers, Sales, Business Stakeholders

---

### 2. [WEBSITE_INTEGRATION_TECHNICAL_DOC.md](./WEBSITE_INTEGRATION_TECHNICAL_DOC.md)
**Leia isto se:** Você está implementando a integração ou debugging.

**Contém:**
- Arquitetura da integração (componentes + fluxo)
- Sales Demo Controller Layer (DemoProvider, DemoController, WidgetZone, PortalHostedLinks)
- Per-route mapping (como cada página do site demo funciona)
- Runtime configuration (env vars necessárias)
- Database schema (tabelas de support)
- RLS policies (segurança)
- APIs e RPCs utilizadas
- Troubleshooting comum

**Público:** Developers, DevOps, QA

---

### 3. [WEBSITE_INTEGRATION_DEEP_ANALYSIS_V2.md](./WEBSITE_INTEGRATION_DEEP_ANALYSIS_V2.md)
**Leia isto se:** Você quer entender competitive landscape ou prioridades de roadmap.

**Contém:**
- Status de implementação (17 widgets + 4 sprints + Demo Controller)
- Análise competitiva (WellnessLiving, CAASI, Mindbody, etc.)
- Gaps críticos vs concorrência (priorização)
- Roadmap futuro (Sprint 5, 6, etc.)
- Impacto comercial do Sales Demo Controller

**Público:** Executives, Product Leadership, Strategy Team

---

## 🎯 Quick Start

### Para um novo desenvolvedor:

1. **Contexto:** Leia a seção de Executive Summary ("O que é Website Integration?")
2. **Arquitetura:** Estude o diagrama de componentes em Technical Doc
3. **Implementação:** Veja `components/DemoProvider.tsx`, `components/DemoController.tsx`, `components/WidgetZone.tsx`
4. **Config:** Configure env vars (veja `.env.example` na raiz do repo)

### Para testar o Before/After:

1. `npm run dev`
2. Navegue para qualquer página (/, /classes, /pricing, /trainers, /contact, /free-trial, /portal)
3. Clique no painel flutuante no canto inferior esquerdo (Demo Controller)
4. Toggle "Ativar Demo" para alternar entre modo estático e modo CodeGym widgets
5. Observe o código de integração exato que seria necessário

---

## 🔧 Key Components

| Componente | Arquivo | Responsabilidade |
|-----------|---------|-----------------|
| **DemoProvider** | `components/DemoProvider.tsx` | React Context global — gerencia estado de demo + metadata por rota |
| **DemoController** | `components/DemoController.tsx` | Painel flutuante — toggle, código exato, copy button |
| **WidgetZone** | `components/WidgetZone.tsx` | Renderer condicional — mostra conteúdo estático OU iframe com widget |
| **GlobalWidgets** | `components/GlobalWidgets.tsx` | Injeção global de AI Chat quando demo está ativa |
| **PortalHostedLinks** | `components/PortalHostedLinks.tsx` | Demo de Hosted Pages (modo ON) vs cards estáticos (modo OFF) |

---

## 📡 Environment Variables

```bash
NEXT_PUBLIC_CODEGYM_URL=https://staging.codegym.io
NEXT_PUBLIC_GYM_SLUG=pulsegym365
```

Se omitidos, os widgets não carregarão. Veja `.env.example`.

---

## 🚀 Integration Modes Demostrados

| Página | Modo | O que mostra | Use case |
|--------|------|------------|----------|
| **Home (/)** | Universal Script | `loader.js` único para todos os widgets | Implementação simples (1 linha) |
| **Classes (/classes)** | Individual Widget | Widget de schedule em iframe isolado | Fine-tuned per-page |
| **Pricing (/pricing)** | Individual + Checkout | Pricing widget com Stripe embedded | Checkout zero-redirect |
| **Trainers (/trainers)** | Individual Widget | Widget de instructors | Staff directory |
| **Contact (/contact)** | Individual Widget | Widget de info + contato | Location + hours |
| **Free Trial (/free-trial)** | Form Bridge | Trial signup com AI Chat context | Lead capture + AI context |
| **Portal (/portal)** | Hosted Pages | Links para páginas hospedadas em CodeGym | Sign-ups, member portal |

---

## 📞 Questions?

- **Business/Commercial:** Veja `WEBSITE_INTEGRATION_EXECUTIVE_SUMMARY.md`
- **Technical/Architecture:** Veja `WEBSITE_INTEGRATION_TECHNICAL_DOC.md` 
- **Competitive/Strategy:** Veja `WEBSITE_INTEGRATION_DEEP_ANALYSIS_V2.md`
- **Implementation Help:** Check `components/` folder — cada componente tem comentários inline

---

**Last Updated:** April 2026  
**Demo Site:** https://pulsegym365-demo.vercel.app  
**Latest Commit:** `27c1ac8` (Sales Demo Controller implementation)
