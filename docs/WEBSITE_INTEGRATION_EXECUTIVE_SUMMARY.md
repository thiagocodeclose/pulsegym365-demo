# Website Widget Integration System — Executive Summary

**Data:** 20 de Abril de 2026  
**Status:** ✅ Completo — Fases 0-3 + Sprints 1-4 + Função de Demo Comercial (Before/After)  
**Plataforma:** CodeGym — AI-Powered Gym Management SaaS

---

## 1. O Que É?

O **Website Widget Integration System** transforma o site de qualquer academia em um canal ativo de conversão. Com **UMA linha de código**, o dono da academia ativa um ecossistema de widgets interativos, alimentados por IA e dados em tempo real — uma combinação que, até onde mapeamos, **nenhum concorrente direto oferece hoje**.

O visitante do site da academia vê horários interativos, planos com preços, mapa visual de spots, chat com IA que acompanha o contexto de navegação, prova social baseada em dados reais (“5 pessoas acabaram de reservar essa aula”), e captura progressiva de leads — tudo com a identidade visual da academia aplicada automaticamente.

---

## 2. A Jornada do Visitante

```
 ┌─ VISITANTE NO SITE DA ACADEMIA ──────────────────────────────────┐
 │                                                                   │
 │  Visita o site → vê widgets CodeGym integrados                   │
 │       │                                                           │
 │       ▼                                                           │
 │  Navega pelo cronograma interativo de aulas                      │
 │  Vê spots disponíveis em tempo real                              │
 │  Confere planos e preços                                         │
 │  Lê avaliações de membros reais                                  │
 │       │                                                           │
 │       ▼                                                           │
 │  🤖 Chat IA aparece: "Vi que você está olhando a aula de        │
 │     Yoga das 7h. Quer reservar uma aula experimental?"           │
 │       │                                                           │
 │       ▼                                                           │
 │  Visitante interage → Lead capturado automaticamente             │
 │  (nome, email, interesse, fonte = widget + página)               │
 └───────────────────────────────────────────────────────────────────┘
                          │
                          ▼
 ┌─ AUTOMÁTICO (PIPELINE IA) ──────────────────────────────────────┐
 │                                                                  │
 │  ✅ Lead criado com atribuição de fonte (qual widget, qual      │
 │     página do site, qual aula interessou)                        │
 │  ✅ Scoring + temperatura atribuídos pela IA                    │
 │  ✅ Email de boas-vindas personalizado enviado                  │
 │  ✅ Acesso ao portal gerado (se trial habilitado)               │
 │  ✅ Notificação enviada para equipe da academia                 │
 │  ✅ Follow-up automático via workflow builder                   │
 │                                                                  │
 │  Tudo em ~5 minutos da primeira interação                       │
 └──────────────────────────────────────────────────────────────────┘
```

---

## 3. 3 Opções de Integração (Coexistem)

| Opção | Complexidade | Para Quem | Código |
|-------|-------------|-----------|--------|
| **🚀 Script Universal** | 1 linha de HTML | Dono que quer "instalar e esquecer" | `<script src="https://app.codegyms.com/widgets/loader.js" data-gym="slug" data-key="UUID"></script>` |
| **🎯 Widgets Individuais** | DIVs posicionadas | Dono que quer controle de layout | `<div data-codegym="schedule" data-gym="slug"></div>` |
| **🔗 Links Diretos** | Zero código | Instagram, email, QR code | `codegym.com/schedule/slug` |
| **🔌 Form Bridge Nativo** | 1 atributo no `<form>` | Academia que já tem formulário próprio | `<form data-codegym-form data-gym="slug">` |

### Opção 1 — Script Universal (Recomendada)

```html
<!-- Cola no <head> do site — PRONTO! -->
<script src="https://app.codegyms.com/widgets/loader.js"
  data-gym="minha-academia"
  data-key="SEU_WIDGET_PUBLIC_KEY">
</script>
```

- Loader busca configuração da academia → injeta widgets habilitados automaticamente
- Mudanças no admin refletem no site instantaneamente
- Zero manutenção para o dono da academia

### Opção 2 — Widgets Individuais

```html
<script src="https://app.codegyms.com/widgets/loader.js"></script>

<!-- Na página "Aulas" -->
<div data-codegym="schedule" data-gym="minha-academia"></div>

<!-- Na página "Planos" -->
<div data-codegym="pricing" data-gym="minha-academia"></div>

<!-- Chat IA em todas as páginas -->
<div data-codegym="chat" data-gym="minha-academia"></div>
```

- Widgets onde o dono quiser no layout
- Mesmo loader, mesma configuração, mesmo admin

### Opção 3 — Links Diretos

```
📱 Instagram Bio:  codegym.com/schedule/minha-academia
📧 Email MKT:     codegym.com/pricing/minha-academia
📸 QR Code:       codegym.com/guest-pass/minha-academia
```

- Mesmas páginas, abertas direto no navegador (não em iframe)
- Branding completo da academia
- Para academias que não podem editar o código do site

### Opção 4 — Form Bridge Nativo (NOVO)

```html
<!-- Carrega o snippet leve (3KB) -->
<script src="https://app.codegym.com/widgets/form-bridge.js"></script>

<!-- Adiciona atributos no formulário EXISTENTE — sem trocar nada! -->
<form data-codegym-form data-gym="minha-academia" data-form-type="trial_pass"
      data-success-url="/obrigado">
  <input name="name" required>
  <input name="email" type="email" required>
  <input name="phone" type="tel">
  <label><input name="sms_consent" type="checkbox"> Aceito receber SMS</label>
  <button type="submit">Quero Experimentar</button>
</form>
```

- **Para academias que JÁ TÊM formulários** no site e não querem trocar por widgets
- O snippet detecta automaticamente `data-codegym-form`, intercepta o submit, e envia para o CodeGym
- Lead entra no pipeline com atribuição de fonte, UTM, consentimento SMS, e scoring por IA
- Zero mudança visual — o formulário continua com o design da academia
- Também disponível via `CodeGym.submitForm()` (loader.js) ou REST API (`POST /api/public/form-bridge`)

**Todas as 4 opções compartilham:** mesmas páginas, mesmos RPCs, mesma configuração admin. Zero duplicação de código.

### 3.2. Nova Função de Demonstração Comercial (Before/After)

Para facilitar venda e onboarding, criamos uma função de demonstração no site `pulsegym365-demo` que mostra, em tempo real, a diferença entre:

- **Site estático tradicional** (modo OFF)
- **Site com CodeGym ativo** (modo ON)

Com um único toggle, o dono da academia visualiza na prática como a integração funciona sem reconstruir o site.

**Como a demo foi estruturada:**

| Página | Modo Demonstrado | Transformação ao ativar |
|---|---|---|
| Home | Script Universal | Chat IA global + camadas dinâmicas ativadas |
| Classes | Widget Individual | Grid estático → schedule live |
| Pricing | Widget Individual | Cards estáticos → pricing live com checkout |
| Trainers | Widget Individual | Bios estáticas → instrutores dinâmicos |
| Contact | Widget Individual | Info estática → studio info live |
| Free Trial | Form Bridge Nativo | Mesmo formulário + envio para pipeline CodeGym |
| Portal | Hosted Pages | Links locais → links diretos CodeGym |

**Impacto comercial direto:**

- Remove objeção de implantação (“vou ter que refazer meu site?”)
- Prova visual de que o setup é simples (snippet e atributos mínimos)
- Acelera demonstrações de venda com narrativa antes/depois clara
- Reforça a proposta central: **preservar o website atual e turbinar conversão com CodeGym**

---

## 3.1. Public Storefront Layer — Separação Inteligente de Dados

### O Problema

Os RPCs originais (`get_public_pricing`, `get_public_schedule`) simplesmente expõem **todos** os registros `is_active = true` para o site. Isso vaza:
- Planos **draft/legados** que a academia não quer mostrar
- Aulas **internas/teste** usadas para testes operacionais
- Instrutores **inativos visuais** (ativos no sistema mas sem foto/bio)

### A Solução: Storefront Layer

**Filosofia:** O website consome "blocos vivos opcionais" — não sequestra toda a base interna.

```
┌─ Admin Dashboard (dados completos) ──────────────────────────┐
│  plans          │  classes        │  instructors              │
│  is_active      │  is_active      │  is_active                │
│  (tudo)         │  (tudo)         │  (tudo)                   │
├─────────────────┼─────────────────┼───────────────────────────┤
│         ▼ STOREFRONT FILTER ▼                                │
│  show_on_website = true                                       │
│  website_name (override do nome interno)                     │
│  website_description (override da descrição)                 │
│  website_display_order (controle de ordem)                   │
│  is_featured + featured_label (destaque)                     │
└──────────────────────────────────────────────────────────────┘
         ▼
┌─ Website / Widgets (dados públicos filtrados) ───────────────┐
│  Apenas o que o dono QUIS mostrar                            │
│  Nomes e descrições otimizadas para marketing                │
│  Ordem personalizada por relevância                          │
└──────────────────────────────────────────────────────────────┘
```

### Campos Adicionados

| Tabela | Novos Campos | Propósito |
|--------|-------------|-----------|
| `plans` | `show_on_website`, `website_display_order`, `website_name`, `website_description`, `is_featured`, `featured_label` | Controle total de quais planos aparecem e como |
| `classes` | `show_on_website`, `website_display_order`, `website_name`, `website_description` | Controle de aulas visíveis (definição, não agenda) |
| `instructors` | `show_on_website`, `website_display_order`, `website_bio`, `website_title` | Bio e título otimizados para público |

### Comportamento Zero-Config (Retrocompatível)

- **Sem configuração:** todos os registros ativos aparecem (mesmo comportamento anterior)
- **Com configuração:** apenas `show_on_website = true` aparece
- **Nomes:** `website_name` usa fallback para nome interno se não preenchido
- **Ordenação:** `website_display_order` controla a ordem nos widgets

> **Nota arquitetural:** `class_schedules` é uma tabela de ocorrências (data/hora específicas), não de definição. O filtro de storefront opera na tabela `classes` (definição da aula), e o schedule JOIN filtra automaticamente. Isso é correto: o dono decide quais **aulas** mostrar, não quais **horários individuais**.

---

## 4. 17 Widgets Disponíveis

### Fase 1 — Core (Widgets Essenciais)

| Widget | O Que Faz | Dados |
|--------|----------|-------|
| **📅 Cronograma** | Calendário semanal interativo com spots em tempo real | ✅ Pronto |
| **💰 Planos/Preços** | Cards comparativos com CTA inteligente + Stripe Checkout | ✅ Pronto |
| **ℹ️ Info do Estúdio** | Horários, endereço, mapa, contato, amenidades | ✅ Pronto |
| **🤖 Chat IA** | Assistente GPT-4o-mini com cross-widget context + proactive triggers | ✅ **Implementado** |
| **📝 Captura de Leads** | Formulário progressivo multi-step | ✅ Pronto |

### Fase 2 — Engagement

| Widget | O Que Faz | Dados |
|--------|----------|-------|
| **👨‍🏫 Instrutores** | Cards com foto, bio, certificações, agenda | ✅ Pronto |
| **⭐ Avaliações** | Rating médio, depoimentos de membros verificados | ✅ Pronto |
| **🎫 Guest Pass** | "Experimente Grátis" com CTA direto | ✅ Pronto |
| **📆 Eventos** | Workshops, eventos especiais com contagem regressiva | ✅ Pronto |
| **📅 Appointment/PT** | Booking de personal training com perfil do instrutor | ✅ Pronto |

### Fase 3 — WOW Factor

| Widget | O Que Faz | Exclusivo? |
|--------|----------|-----------|
| **🗺️ Mapa de Spots** | Pick-a-spot visual interativo no site | ✅ **EXCLUSIVO** |
| **🔥 Social Proof** | Banner flutuante com dados reais de membership | ✅ **EXCLUSIVO** |
| **📡 Aula ao Vivo** | "Acontecendo Agora" + "Próxima Aula" com timer | ✅ **EXCLUSIVO** |
| **🏆 Comunidade** | Leaderboards REAIS, conquistas REAIS, milestones | ✅ **EXCLUSIVO** |
| **🏋️ WOD/Treino** | Treino do dia para CrossFit/Functional | ✅ **EXCLUSIVO** |

### Sprint 4 — Monetização & Engajamento

| Widget | O Que Faz | Exclusivo? |
|--------|----------|------------|
| **🎁 Gift Card** | Compra de gift cards com valor customizado + Stripe Checkout | ✅ **EXCLUSIVO** |
| **⏳ Waitlist** | Lista de espera inteligente para aulas lotadas com notificação | ✅ **EXCLUSIVO** |

---

## 5. Análise Competitiva Completa

### Visão Geral do Mercado

| Plataforma | Widgets | IA | Tempo Real | Customização | Nota |
|-----------|---------|-----|-----------|-------------|------|
| **WellnessLiving** | 8 widgets | ❌ | ❌ | ✅ Cores/fontes | ⭐⭐⭐⭐ |
| **Mindbody** | 7 branded tools | ❌ | ❌ | ✅ Cores/fontes | ⭐⭐⭐⭐ |
| **Gymdesk** | 5 embeds + builder | ❌ | ❌ | ⚠️ Básico | ⭐⭐⭐ |
| **Wodify** | 2 embeds + Sites | ❌ | ❌ | ⚠️ Limitado | ⭐⭐ |
| **Mariana Tek** | ❌ Nenhum (partner) | ❌ | 🟡 App only | N/A | ⭐ |
| **Glofox** | 3 básicos | ❌ | ❌ | ⚠️ Básico | ⭐⭐ |
| **PushPress** | 2 mínimos | ❌ | ❌ | ❌ | ⭐ |
| **CodeGym** | **17 widgets** | **✅ IA** | **✅ Real-time** | **✅ 4 camadas** | ⭐⭐⭐⭐⭐ |

### Matriz Funcional Detalhada

| Funcionalidade | WL | MB | GD | WO | MT | GF | PP | **CodeGym** |
|---|---|---|---|---|---|---|---|---|
| Widget de Cronograma | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Captura de Leads | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Planos/Preços | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Perfil de Instrutores | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Avaliações | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Loja/Produtos | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | 🔨 |
| Eventos | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Guest Pass/Trial | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **🎁 Gift Card** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| **⏳ Waitlist** | ❌ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| **🤖 Chat IA no Site** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| **🧠 IA Cross-Widget** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| **🔥 Social Proof Real** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| **🗺️ Spot Map no Site** | ❌ | ❌ | ❌ | ❌ | 🟡 App | ❌ | ❌ | **✅ EXCLUSIVO** |
| **⚡ JS Loader Universal** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| **🎨 4 Camadas Config** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |

---

## 6. As 5 Vantagens EXCLUSIVAS do CodeGym

### 🤖 1. Chat IA no Site da Academia (Já Construído!)

> Entre os concorrentes mapeados, nenhum oferece IA conversacional embarcada como widget de website.

O visitante está navegando o site → o chat IA abre proativamente → "Vi que você está olhando a aula de CrossFit das 18h. Posso te ajudar a agendar uma aula experimental?" → Coleta email → Lead criado automaticamente → Pipeline de vendas ativado.

**WellnessLiving, Mindbody, Glofox** → usam chat humano (Intercom/Drift) ou nenhum.  
**CodeGym** → IA com contexto real da academia (aulas, preços, instrutores, disponibilidade).

### 🧠 2. Inteligência Cross-Widget + Proactive Triggers

> O chat IA acompanha o que o visitante viu em outros widgets e pode iniciar a conversa sozinho.

Visitante olha cronógrama → clica em "Yoga 7h" → navega para preços → Chat IA: "O plano Gold inclui aulas ilimitadas de Yoga, que é o que você estava pesquisando. Quer começar com uma aula experimental na terça?"

Visitante move o mouse para sair da página → **Exit Intent Trigger** → Chat abre automaticamente: "Antes de ir — que tal uma aula experimental grátis?"

Visitante retorna ao site dias depois → **Return Visitor Trigger** → Chat: "Bem-vindo de volta! Pronto para dar o próximo passo?"

**5 tipos de trigger:** Exit intent (desktop + mobile), Time-on-page, Return visitor, Scroll depth, Inactivity — tudo configurável por gym.

### 🔥 3. Social Proof com Dados Reais em Tempo Real

> Dados vindos diretamente do banco — não são números estáticos ou inventados.

"12 pessoas se inscreveram no CrossFit esta semana" — dado real.  
"Apenas 3 spots restantes na aula de HIIT de amanhã" — dado real.  
"Coach Maria recebeu 4.9⭐ de 127 avaliações" — dado real.

Não encontramos funcionalidade equivalente nos concorrentes mapeados.

### 🗺️ 4. Mapa Visual de Spots no Site

> Mariana Tek tem pick-a-spot no app nativo. CodeGym oferece como widget embeddable no site.

O visitante vê o layout real da sala → spots disponíveis em verde → clica para reservar → tudo no widget, sem sair do site.

### ⚡ 5. JS Loader Universal — 1 Linha, Tudo Funciona

> Não encontramos mecanismo equivalente em nenhum concorrente direto.

```html
<script src="https://app.codegyms.com/widgets/loader.js"
  data-gym="minha-academia"
  data-key="SEU_WIDGET_PUBLIC_KEY">
</script>
```

Uma linha. O loader busca a configuração → injeta apenas os widgets habilitados → aplica as cores da academia → ativa comunicação entre widgets → pronto.

WellnessLiving: copiar/colar snippet separado para CADA widget.  
Mindbody: copiar/colar snippet + configurar no portal.  
**CodeGym**: 1 linha. Ponto final.

---

## 7. Sistema de Personalização em 4 Camadas

### Camada 1 — Modo de Conversão (Global)

| Modo | Comportamento dos CTAs | Ideal Para |
|------|----------------------|-----------|
| **Lead Only** | Todos os CTAs → captura de lead | Academias que querem contato primeiro |
| **Trial Enabled** | CTAs → agendar aula experimental | Academias que oferecem trial grátis |
| **Full Signup** | CTAs → cadastro + pagamento online | Academias com checkout digital |

### Camada 2 — Toggles por Widget (On/Off)

Cada widget liga/desliga independentemente. Sem instrutores cadastrados? Widget de instrutores OFF automático. Sem eventos? Widget de eventos OFF.

### Camada 3 — Tema & Branding (Visual Global)

| Elemento | Opções | Método |
|----------|--------|--------|
| **Cores** | Primary, secondary, accent, bg, text, CTA | Color picker + hex |
| **Tipografia** | Família + escala (compacta/normal/espaçosa) | Seletor de fontes |
| **Formato** | Border radius: sharp/soft/rounded/pill | Slider |
| **Modo** | Light / Dark / Auto-detect do site pai | Toggle |
| **Estilo** | Floating / Inline / Minimal / Card | Seletor visual |
| **Animação** | Slide-in, fade-in, ou desabilitado | Toggle |

**3 Níveis de Esforço:**
1. **Zero esforço** — Sistema auto-extrai cores do `studio_settings` (logo, cor accent)
2. **1 clique** — 6 presets: "Light Clean", "Dark Premium", "Vibrant Bold", "Soft Pastel", "Match My Website", "Custom"
3. **Customização total** — Editor lado a lado: controles na esquerda, preview ao vivo na direita

### Camada 4 — Overrides por Widget (Granular)

Cada widget pode ter configurações específicas:
- Schedule: mostrar spots? Filtrar programas? Layout compacto/expandido?
- Pricing: mostrar preços? Quais planos? Layout horizontal/vertical?
- AI Chat: pode sugerir trial? Coletar email obrigatório? Cor do bubble? Posição?
- Lead Capture: quais campos? Trigger de timing? Popup vs inline?
- Cada widget pode sobrescrever cores do tema global

---

## 8. Experiência do Admin (Dashboard)

```
┌─────────────────────────────────────────────────────────────────┐
│  Website Widgets                                    🟢 LIVE     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Conversion Mode: [Lead Only ▼] [Trial ▼] [Full Signup ▼]     │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Schedule │ │ Pricing  │ │ AI Chat  │ │ Info     │          │
│  │ ✅ ON    │ │ ✅ ON    │ │ ✅ ON    │ │ ✅ ON    │          │
│  │ ⚙️ Edit  │ │ ⚙️ Edit  │ │ ⚙️ Edit  │ │ ⚙️ Edit  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │Instructors│ │ Reviews │ │Guest Pass│ │ Events   │          │
│  │ ✅ ON    │ │ ❌ OFF   │ │ ✅ ON    │ │ ❌ OFF   │          │
│  │ ⚙️ Edit  │ │          │ │ ⚙️ Edit  │ │          │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  ┌─── TEMA & BRANDING ──────────────────────────────────────┐  │
│  │ Preset: [Light Clean] [Dark Premium] [Vibrant] [Custom]  │  │
│  │                                                           │  │
│  │  Primary: [#FF5722]  Background: [#FFFFFF]               │  │
│  │  Accent:  [#2196F3]  Text:       [#333333]               │  │
│  │  Radius:  [====●====]  Font: [Inter ▼]                   │  │
│  │                                                           │  │
│  │  [Preview ao Vivo] ──→ widgets atualizando em real-time  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─── CÓDIGO DE INSTALAÇÃO ─────────────────────────────────┐  │
│  │ Tab: [Script Universal] [Widgets Individuais] [Links]     │  │
│  │                                                           │  │
│  │  <script src="https://app.codegyms.com/widgets/loader.js" │  │
│  │    data-gym="slug" data-key="UUID">               │  │
│  │  </script>                                    [📋 Copiar] │  │
│  │                                                           │  │
│  │  [📧 Enviar instruções por email]                        │  │
│  │  [📖 Como instalar no WordPress/Wix/Squarespace...]      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Segurança

| Preocupação | Solução |
|-------------|---------|
| CSS do site conflitar com widget | ✅ Isolação via iframe — CSS nunca vaza |
| Dados sensíveis expostos | ✅ RPCs read-only, apenas dados públicos |
| Abuso de API | ✅ Rate limiting por IP (10 req/min) |
| Cross-origin attacks | ✅ CORS restrito + validação de origin no postMessage |
| API keys no client | ✅ Zero credenciais no browser — BFF gateway com service role server-side |
| Script injection via widget | ✅ iframe sandbox + Content Security Policy |
| Spam de leads | ✅ Rate limiting + honeypot fields + reCAPTCHA opcional |

---

## 10. Impacto no Negócio

### Geração de Leads

- Widgets convertem visitantes passivos do site em leads qualificados
- Leads entram no MESMO pipeline de IA das outras fontes (walk-in, QR, etc.)
- Atribuição de fonte precisa: qual widget, qual página, qual aula interessou
- Zero trabalho manual para a equipe — tudo automático

### Diferenciação de Mercado

- **17 widgets** vs. máximo 8 do concorrente mais completo (WellnessLiving)
- **8+ funcionalidades diferenciadas** não encontradas em concorrentes diretos
- **IA embarcada + proactive triggers** vs. zero IA nativa nos concorrentes mapeados
- **1 linha de código** vs. snippet separado por widget nos concorrentes
- **Appointment/PT widget** — equiparado com WL e MB

### Métricas Projetadas (Hipóteses — a validar com dados de produção)

| Métrica | Hipótese | Base da Estimativa |
|---------|---------|--------------------|
| **Conversão de visitantes → leads** | +40-60% vs. site sem widgets | Benchmarks de chat + CTA inline (Drift, Intercom) |
| **Tempo no site** | +2-4 minutos com widgets interativos | Média de engage em embeds interativos (Hubspot) |
| **Taxa de agendamento de trial** | +20-35% com CTA contextual | Precisa de A/B test em produção |
| **Leads com fonte atribuída** | 100% (rastreamento automático) | Arquitetura garante — não depende de adoção |
| **Setup time para o dono** | < 5 minutos (1 linha de código) | Testado internamente |

### ROI Estimado para o Dono da Academia (cenário ilustrativo)

```
CENÁRIO ILUSTRATIVO: Academia com 200 visitantes/mês no site
─────────────────────────────────────────────────
Sem widgets (baseline típico de site estático):
  200 visitantes × ~2% conversão = ~4 leads/mês

Com CodeGym Widgets (hipótese):
  200 visitantes × ~6-8% conversão = ~12-16 leads/mês
  
  + Chat IA proativo pode capturar leads adicionais
  + Social proof aumenta senso de urgência
  
  Estimativa conservadora: ~15 leads/mês
  
  Se ~25% dos leads convertem em membros (varia por região e tipo de gym):
  15 × 25% = ~3-4 novos membros/mês
  × $100 mensalidade média
  = ~$300-400/mês de receita adicional estimada

⚠️ Esses números são hipóteses baseadas em benchmarks de mercado.
   O impacto real depende de tráfego do site, vertical da academia,
   qualidade do conteúdo e maturidade digital do dono.
   Validar com dados reais de produção nas primeiras 10 academias.
```

---

## 11. Roadmap de Implementação

### Fase 0 — Fundação ⏳

| Step | Entrega | Dependência |
|------|---------|-------------|
| 0.1 | SQL: tabelas + RPCs + RLS | — |
| 0.2 | Public RPCs para dados dos widgets | 0.1 |
| 0.3 | JS Loader universal | 0.1 |
| 0.4 | Admin Widget Dashboard + Theme Editor | 0.1 |
| 0.5 | Widget page shell (iframe + standalone) | 0.1 |

### Fase 1 — Core Widgets (Paralelo)

| Step | Widget | Status Dados |
|------|--------|-------------|
| 1.1 | 📅 Cronograma interativo | ✅ Dados prontos |
| 1.2 | 💰 Planos e preços | ✅ Dados prontos |
| 1.3 | ℹ️ Info do estúdio | ✅ Dados prontos |
| 1.4 | 🤖 Chat IA (enhancement) | ✅ Já funciona |
| 1.5 | 📝 Lead capture (enhancement) | ✅ Já funciona |

### Fase 2 — Engagement Widgets (Paralelo)

| Step | Widget | Status Dados |
|------|--------|-------------|
| 2.1 | 👨‍🏫 Perfil de instrutores | ✅ Dados prontos |
| 2.2 | ⭐ Avaliações e depoimentos | ✅ Dados prontos |
| 2.3 | 🎟️ Guest pass widget | ✅ Já funciona |
| 2.4 | 📆 Eventos e workshops | ⚠️ Parcial |

### Fase 3 — WOW Factor (Paralelo)

| Step | Widget | Exclusivo |
|------|--------|----------|
| 3.1 | 🗺️ Mapa visual de spots | ✅ Nenhum concorrente |
| 3.2 | 🔥 Social proof em tempo real | ✅ Nenhum concorrente |
| 3.3 | 📡 Feed de aulas ao vivo | ✅ Nenhum concorrente |
| 3.4 | 🏆 Showcase da comunidade | ✅ Nenhum concorrente |

### Sprint 4 — Monetização & Engajamento

| Step | Widget | Status |
|------|--------|--------|
| 4.1 | 🎁 Gift Card — compra com Stripe Checkout | ✅ Implementado |
| 4.2 | ⏳ Waitlist — lista de espera inteligente | ✅ Implementado |
| 4.3 | 🤖 Chat IA — widget page com cross-widget context | ✅ Implementado |
| 4.4 | 🏪 Storefront Admin — controle de visibilidade por widget | ✅ Implementado |
| 4.5 | 🐛 Fix loader.js — remoção de funções duplicadas | ✅ Corrigido |

---

## 12. Para Investidores / Decisores

### Impacto TAM

- O mercado global de software de gestão fitness é estimado em **~$6B+** e não identificamos players com widgets de IA embarcada no site
- Widgets de website são tipicamente vendidos como upsell ($50-$200/mês extra) ou limitados a planos premium
- CodeGym inclui tudo na plataforma — diferenciador relevante de valor percebido

### Moat Tecnológico

- **IA Chat** já construído e funcionando (GPT-4o-mini com contexto da academia)
- **17 tipos de widget** vs. máximo 8 do concorrente mais completo
- **8+ diferenciais** difíceis de replicar a curto prazo (cross-widget intelligence, social proof com dados reais, spot map no site, universal loader, proactive triggers, 4 camadas de config, gift card widget, waitlist widget)
- **Dados em tempo real** graças à arquitetura Supabase com RLS
- **Zero dependência externa** para widgets — tudo roda na infra existente

### Retenção de Plataforma

- Quanto mais widgets o dono ativa → maior o custo de troca (switching cost)
- Customização visual profunda reforça esse efeito
- Leads capturados via widget entram no pipeline CodeGym = dados presos na plataforma
- **Hipótese: redução de churn mensurável** para academias usando 3+ widgets ativos — a validar com cohort analysis após 3-6 meses de produção

---

## 13. Riscos, Dependências e Limitações Atuais

### ⚠️ Riscos

| Risco | Severidade | Mitigação |
|-------|-----------|----------|
| Baixa adoção por donos que não mexem no site | Alta | Opção 3 (links diretos) + micro-site auto-gerado (roadmap P3) |
| Concorrente (WL, MB) copiar cross-widget | Média | Vantagem de execução — já está live. Foco em profundidade, não só paridade |
| Performance do loader em sites lentos | Média | Loader é async e lazy-load. Monitorar Web Vitals em produção |
| IA Chat gerar respostas imprecisas | Média | Contexto limitado a dados públicos da academia. Fallback para "fale com a equipe" |
| Projeções de conversão não se confirmarem | Média | Baseline tracking ativo desde Sprint 1. Ajustar messaging com dados reais |

### 🔗 Dependências

| Dependência | Status | Impacto se ausente |
|------------|--------|--------------------|
| Dados de aulas populados (`class_schedules`) | ✅ Pronto | Widget de cronograma fica vazio |
| Planos de preço cadastrados (`membership_plans`) | ✅ Pronto | Widget de pricing fica vazio |
| Instrutores com foto e bio | ⚠️ Parcial | Widget funciona, mas com menos impacto visual |
| Reviews coletadas de membros | ⚠️ Poucas | Widget de avaliações depende de volume |
| Stripe configurado para checkout | ✅ Pronto | Sem Stripe, pricing vira lead-only |
| Gym owner instalar o script no site | ❌ Depende do owner | Sem instalação = sem impacto. Onboarding guiado necessário |

### 🚫 Não Incluído na Versão Atual

| Feature | Status | Quando |
|---------|--------|--------|
| Checkout IN-widget para Guest Pass / Gift Card | ✅ Gift Card com Stripe Checkout | Sprint 4 |
| Loja / eCommerce widget | Não implementado | Depende do módulo Store |
| Facebook Page embed | Não implementado | Roadmap P2 |
| Reserve with Google | Não implementado | Roadmap P1 |
| SEO mode (Schema.org + Shadow DOM) | ✅ Implementado | v2.2 — `data-seo="true"` |
| Multi-language / multi-currency | Não implementado | Roadmap P3 |
| AI SMS / AI Voice (estilo CAASI) | Não implementado | Roadmap P2-P3 |
| A/B testing de widgets | Não implementado | Roadmap P2 |
| Multi-location hub | Não implementado | Roadmap P2 |

> **Nota:** Os widgets já implementados usam dados reais via RPCs. Onde os dados da academia estão incompletos (ex: sem reviews, sem foto de instrutor), o widget funciona mas com menor impacto visual e de conversão.

---

**Bottom Line:** O Website Widget Integration System posiciona o CodeGym como a plataforma de gestão de academias com a integração de website mais completa que identificamos no mercado — combinando IA com proactive triggers, dados em tempo real e diferenciais técnicos difíceis de replicar a curto prazo. A proposta é forte, mas o impacto real depende de adoção pelo gym owner e qualidade dos dados cadastrados. Os próximos marcos são: validar métricas de conversão com as primeiras 10 academias em produção e iterar com base em dados reais.
