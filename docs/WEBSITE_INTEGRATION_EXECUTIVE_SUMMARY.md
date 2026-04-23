# Website Widget Integration System — Executive Summary

**Data:** 23 de Abril de 2026  
**Status:** ✅ Sprint 7 Completo — AI Chat Agent V2 (Personalização de Agente + Upload de Avatar + Detecção de Idioma Automática + Dashboard de Conversas)  
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
| **🚀 Script Universal** | 1 linha de HTML | Dono que quer "instalar e esquecer" | `<script data-gym="slug" data-key="uuid">` |
| **🎯 Widgets Individuais** | DIVs posicionadas | Dono que quer controle de layout | `<div data-codegym="schedule" data-gym="slug"></div>` |
| **🔗 Links Diretos** | Zero código | Instagram, email, QR code | `codegym.com/schedule/slug` |
| **🔌 Form Bridge Nativo** | 1 atributo no `<form>` | Academia que já tem formulário próprio | `<form data-codegym-form data-gym="slug">` |

### Opção 1 — Script Universal (Recomendada)

```html
<!-- Obtido no Admin > Website Widgets > Install Code -->
<script
  src="https://app.codegym.com/widgets/loader.js"
  data-gym="minha-academia"
  data-key="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
</script>
```

- `data-gym` = slug público da academia
- `data-key` = Widget Key (UUID único por academia, obtido no admin)
- Loader busca configuração da academia via API gateway → injeta widgets habilitados
- Mudanças no admin refletem no site instantaneamente
- Zero manutenção para o dono da academia

### Opção 2 — Widgets Individuais

```html
<!-- Loader com a Widget Key -->
<script
  src="https://app.codegym.com/widgets/loader.js"
  data-key="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
</script>

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

---

## 3.1. Segurança Multi-Tenant: Arquitetura BFF (Backend for Frontend)

### O Problema Resolvido

Com 100 academias na plataforma, bastava conhecer o slug de uma academia (informação pública, presente na URL) para realizar operações de escrita: injetar leads falsos, poluir o pipeline de CRM, sobrecarregar o sistema de IA com dados fictícios.

### A Solução: API Gateway + Widget Key

```
Site da Academia (domínio externo)
  │
  │   Apenas: slug + widget_public_key UUID
  │   Zero credenciais de banco
  │
  ▼
https://app.codegym.com/api/widgets/*   ← Gateway CodeGym
  │
  │   Rate limit + validação + SERVICE_KEY (server-side)
  │
  ▼
Supabase   ← credenciais nunca saem daqui
```

### Como Funciona na Prática

**Para o dono da academia** — transparente. O admin exibe a Widget Key na aba "Install Code":

| O que ele recebe | O que faz |
|---|---|
| `data-gym="minha-academia"` | Identifica a academia (público, como o domínio) |
| `data-key="xxxxxxxx-..."` | Autentica operações de escrita (segredo por academia) |

**Para o visitante do site** — zero impacto. Nenhuma credencial aparece no HTML público.

**Separação READ vs. WRITE:**

| Operação | Necessita key? | Motivo |
|---|---|---|
| Ver agenda, preços, instrutores | ❌ Não | Dados públicos (equivale ao site da academia) |
| Capturar lead, enviar formulário | ✅ Sim | Escrita no CRM, risco de spam |
| Chat IA, marcar aula, lista de espera | ✅ Sim | Escrita no banco, custo de processamento |
| Ping de instalação | ✅ Sim | Rastreamento de analytics |

**Se a key for comprometida:** o dono clica em "Regenerate" no admin. O site para de funcionar nas operações de escrita até ele atualizar o snippet — sem afetar nenhuma outra academia.

**Onboarding de uma academia real (WordPress, Wix, Squarespace, HTML puro):**
1. Admin → Settings → Website Widgets → aba "Install Code"
2. Copia o snippet gerado (já contém `data-gym` e `data-key` preenchidos)
3. Cola no `<head>` do site — fim. Nenhum Vercel, nenhuma variável de ambiente, nenhuma configuração extra.

> O site `pulsegym365-demo` usa env vars (`NEXT_PUBLIC_WIDGET_KEY`) porque é um projeto Next.js/React onde a chave precisa vir de uma variável de build — isso é um detalhe da arquitetura do demo, não do fluxo dos clientes reais.

---

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
| **🤖 Chat IA** | Assistente GPT-4o-mini com persona configurável (nome, avatar, saudação, especialidade), detecção de idioma automática, dashboard de conversas | ✅ **V2 Implementado** |
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
<script src="https://app.codegym.com/w/minha-academia.js"></script>
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
- **Cada widget pode sobrescrever as 5 cores do tema global de forma independente** ← Sprint 5

**Cores independentes por widget (Implementado — Sprint 5)**

O modal de configuração de cada widget (⚙️) inclui agora um painel de cores próprio:

| Campo | O que controla no widget |
|---|---|
| **Primary** | Headers, badges, highlights |
| **Background** | Fundo do widget |
| **Text** | Todos os textos |
| **Accent** | Destaques, urgência, tags |
| **CTA Button** | Botão de conversão |

- Deixar em branco = herda tema global
- "Reset to global theme" zera todos os overrides do widget
- Preview ao vivo atualiza instantaneamente
- Persiste na coluna `theme_overrides` em `website_widget_settings`
- O `loader.js` aplica automaticamente: `mergedTheme = Object.assign({}, globalTheme, widgetThemeOverrides)`

> **Exemplo:** widget de Pricing com fundo escuro e CTA laranja, enquanto o Schedule usa o tema claro padrão — cada um com identidade visual distinta sem conflito.

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
│  │  <script src="https://app.codegym.com/w/slug.js">        │  │
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
| API keys no client | ✅ Nenhuma chave exposta — public RPCs via anon key |
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

### Sprint 7 — AI Chat Agent V2 (Abril 2026)
- ✅ Personalização completa do agente: nome, avatar, saudação customizada, especialidade (lead_conversion / customer_service / general)
- ✅ Upload de avatar direto no Supabase Storage (`media/chat-agents/`) — preview circular + botão de remoção
- ✅ Detecção automática de idioma via `navigator.language` — resposta na língua do visitante sem configuração manual
- ✅ Dashboard de Conversas — stats (total, escaladas, emails, leads), filtros, busca, ações (criar lead, ver pipeline, email)
- ✅ Botão "Conversations" no header da página de Widgets → `/conversations`
- ✅ `public_chat_sessions.visitor_language` — campo novo, indexado por `(gym_id, visitor_language)`
- ✅ API salva `visitor_language` junto com cada sessão de chat
- ✅ SQL: `ADD_CHAT_AGENT_V2.sql`

| Step | Entrega | Status |
|------|---------|--------|
| 7.1 | 🤖 Persona do agente (nome, avatar, saudação, especialidade) | ✅ Implementado |
| 7.2 | 🖼️ Upload de avatar para Supabase Storage | ✅ Implementado |
| 7.3 | 🌐 Auto-detecção de idioma do visitante | ✅ Implementado |
| 7.4 | 📊 Dashboard de Conversas com ações de lead | ✅ Implementado |
| 7.5 | 🗄️ `visitor_language` no schema + API | ✅ Implementado |


### Sprint 5 — Qualidade & Inteligência de Atribuição

### Sprint 6 — Schedule Widget V2 (Abril 2026)
- ✅ Navegação por semana (← Esta Semana / Próxima →, até 4 semanas à frente)
- ✅ Imagem da aula (thumbnail no card + banner no expandido) — toggle do admin
- ✅ Foto do instrutor na linha do card — toggle do admin
- ✅ Filtro por categoria/programa (pills automáticos quando há 2+ categorias)
- ✅ Preview de descrição no card sem expandir — toggle do admin
- ✅ Badge "FULL" quando esgotado + botão muda para "Join Waitlist"
- ✅ Badge de urgência âmbar quando ≤ 5 vagas restantes
- ✅ Dificuldade visível na linha do card — toggle do admin
- ✅ Botão "Today" para voltar à semana atual com 1 clique
- ✅ SQL `ADD_SCHEDULE_WIDGET_V2.sql` — `get_public_schedule` retorna `class_image_url` + `category`

| Step | Entrega | Status |
|------|---------|--------|
| 5.1 | 🐛 **P0 FIX:** Theme delivery — `get_public_widget_config` remap de chaves | ✅ Hoje |
| 5.2 | 🐛 **P0 FIX:** `last_ping_at` nunca atualizado no health check | ✅ Hoje |
| 5.3 | ✨ Cores independentes por widget (5 color pickers no modal ⚙️) | ✅ Hoje |
| 5.4 | ✨ Campo "Website URL" no admin + save no health check | ✅ Hoje |
| 5.5 | ✨ Email de boas-vindas + notificação de staff para leads do site | ✅ Hoje |
| 5.6 | 🎯 UTM Context Capture — atribuição completa ads → lead → membro | 🔜 P1 próximo |

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
| **UTM Context Capture** — ads → lead → membro, fechar o loop | 🔜 P1 roadmap | Sprint 6 |
| **Pixel forwarding** (Meta/Google ao submit de lead) | 🔜 P1 roadmap | Sprint 6 |
| **Partial form save** (abandono captura email) | 🔜 P1 roadmap | Sprint 6 |
| Checkout IN-widget para Guest Pass / Gift Card | ✅ Gift Card com Stripe Checkout | Sprint 4 |
| Loja / eCommerce widget | Não implementado | Depende do módulo Store |
| Facebook Page embed | Não implementado | Roadmap P2 |
| Reserve with Google | Não implementado | Roadmap P1 |
| SEO mode (Schema.org + Shadow DOM) | ✅ Implementado | v2.2 — `data-seo="true"` |
| **Multi-language do Chat IA** | ✅ Auto-detecção via `navigator.language` — PT-BR, ES, FR, DE, EN | Sprint 7 |
| **Multi-language de outros widgets** | Não implementado | Roadmap P3 |
| **Multi-currency** | Não implementado | Roadmap P3 |
| AI SMS / AI Voice (estilo CAASI) | Não implementado | Roadmap P2-P3 |
| A/B testing de widgets | Não implementado | Roadmap P2 |
| Multi-location hub | Não implementado | Roadmap P2 |

> **Nota:** Os widgets já implementados usam dados reais via RPCs. Onde os dados da academia estão incompletos (ex: sem reviews, sem foto de instrutor), o widget funciona mas com menor impacto visual e de conversão.

---

## 14. P0 Bug Fix — Tema Ignorado no Site Real (Sprint 5)

### O Problema

Todo o sistema de customização de cores do admin (Primary, Background, Text, Accent, CTA) **era ignorado** quando os widgets eram carregados no site real de uma academia. O preview dentro do admin funcionava corretamente, mas o site real exibia apenas as cores padrão do sistema.

**Causa raiz — incompatibilidade de nomes de chaves:**

| Onde | Chaves usadas |
|------|---------------|
| Admin dashboard (estado + DB) | `primary_color`, `bg_color`, `text_color`, `mode`, `animations` |
| `loader.js encodeThemeParams()` | `primary`, `background`, `text`, `theme_mode`, `animations_enabled` |
| Preview admin (`buildPreviewUrl`) | Fazia mapeamento manual (por isso funcionava) |
| `get_public_widget_config` (antes do fix) | Retornava `wc.theme_config` **RAW** — chaves erradas |

**Impacto:** 100% das academias com customização de cores configurada não via o tema aplicado no site real.

### A Solução

O RPC `get_public_widget_config` foi atualizado para **remapear as chaves** antes de devolver o payload ao `loader.js`. Nenhuma mudança no DB, no admin, nem no `loader.js`:

```sql
-- ANTES (bug): retorna chaves do DB que loader.js não reconhece
'theme', wc.theme_config

-- DEPOIS (fix): remapeia para as chaves que loader.js espera
'theme', jsonb_build_object(
  'primary',            wc.theme_config->>'primary_color',
  'background',         wc.theme_config->>'bg_color',
  'text',               wc.theme_config->>'text_color',
  'theme_mode',         wc.theme_config->>'mode',
  'animations_enabled', (wc.theme_config->>'animations')::boolean,
  'cta_color',          wc.theme_config->>'cta_color',
  -- ... demais campos
)
```

**Arquivo:** `codegym_bolt/FIX_THEME_CONFIG_KEY_MISMATCH.sql` — aplicar no Supabase Dashboard.

### Comparativo Competitivo — Theme Delivery

| Plataforma | Theme personalizado chega ao site? | Mecanismo |
|-----------|-----------------------------------|-----------|
| **WellnessLiving** | ✅ Sim | CSS vars via snippet dedicado |
| **Mindbody** | ✅ Sim (limitado) | Cores básicas via snippet |
| **Glofox** | ⚠️ Parcial | Apenas a cor primária |
| **Wodify** | ❌ Não | Sem customização de widget |
| **CodeGym (antes)** | ❌ Bug silencioso | Chaves incompatíveis entre DB e loader |
| **CodeGym (após fix)** | ✅ Completo — 8 propriedades | Remap no RPC público |

**Por que isso importa comercialmente:** A capacidade de match visual com o site da academia é um dos principais argumentos de adoção de qualquer sistema de widget. Uma plataforma que promete "match com seu site" e entrega cores padrão perde credibilidade no onboarding.

---

## 15. Análise Competitiva Detalhada — Sprint 5 (Abril 2026)

### Matriz de Paridade vs. Líderes de Mercado

| Funcionalidade | WellnessLiving | Mindbody | Glofox | Zen Planner | Mariana Tek | **CodeGym** |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Widgets de website | ✅ 8 | ✅ 7 | ✅ 3 | ⚠️ 2 | ❌ | **✅ 17** |
| Schedule — filtro por categoria | ✅ | ✅ | ⚠️ | ❌ | ❌ | **✅ Sprint 6** |
| Schedule — imagem da aula no card | ✅ | ✅ | ❌ | ❌ | ❌ | **✅ Sprint 6** |
| Schedule — navegação por semanas | ✅ | ✅ | ❌ | ❌ | ❌ | **✅ Sprint 6** |
| Schedule — badge sold-out / waitlist | ❌ | ✅ | ❌ | ❌ | ❌ | **✅ Sprint 6** |
| Customização de cores | ✅ | ✅ | ⚠️ | ❌ | N/A | **✅ 4 camadas** |
| **Cores por widget** | ❌ | ❌ | ❌ | ❌ | N/A | **✅ EXCLUSIVO** |
| IA conversacional no site | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Personalização de agente IA (nome/avatar/persona) | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Chat IA multilíngue automático | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Dashboard de conversas do chat IA | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Proactive triggers | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Cross-widget intelligence | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Social proof com dados reais | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Spot map embeddable | ❌ | ❌ | ❌ | ❌ | 🟡 app only | **✅ EXCLUSIVO** |
| 1 linha de código (universal) | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Gift Card widget | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Waitlist widget | ❌ | 🟡 app | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| Health check de instalação | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ EXCLUSIVO** |
| UTM context capture | ❌ | 🟡 limitado | ❌ | ❌ | ❌ | 🔜 Sprint 6 |
| Pixel forwarding (Meta/Google) | ✅ | ✅ | ❌ | ❌ | ❌ | 🔜 Sprint 6 |
| Partial form save | ❌ | ❌ | ❌ | ❌ | ❌ | 🔜 Sprint 6 |

### Próximas Features de Alto ROI (P1)

**UTM Context Capture** é o próximo diferencial de maior impacto:

- **Problema:** o dono da academia não sabe qual campanha de Google/Meta trouxe qual membro pagante
- **Solução:** `loader.js` captura `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` da URL do site ao carregar → envia junto com cada lead/form-bridge submit
- **Impacto:** fechar o loop "gastei R$500 no Google Ads → trouxe 12 leads → 3 viraram membros → ROI = X%"
- **Nenhum concorrente direto** fecha este loop de forma nativa no widget
- **Complexidade baixa:** `new URLSearchParams(window.location.search)` no loader + novo campo no schema de leads

---

**Bottom Line:** O Website Widget Integration System posiciona o CodeGym como a plataforma de gestão de academias com a integração de website mais completa que identificamos no mercado — combinando IA com proactive triggers, dados em tempo real e diferenciais técnicos difíceis de replicar a curto prazo. A proposta é forte, mas o impacto real depende de adoção pelo gym owner e qualidade dos dados cadastrados. Os próximos marcos são: validar métricas de conversão com as primeiras 10 academias em produção e iterar com base em dados reais.

---

## 16. Schedule Widget V2 — Sprint 6 (Abril 2026)

### Problema Resolvido
O widget de grade de aulas era funcional mas básico: mostrava apenas a semana atual, sem imagens, sem filtros e sem diferenciação visual por disponibilidade. Academias como Mindbody e WellnessLiving já oferecem navegação por semanas e thumbnails de aulas — o CodeGym agora tem paridade e alguns diferenciais adicionais.

### O que Mudou para o Visitante do Site

**Antes:** Uma lista de aulas do dia, em texto puro, sem possibilidade de ver a próxima semana.

**Depois:**
- Navega entre semanas com `← Prev / Next →` (até 4 semanas à frente)
- Filtra por categoria com um clique (pills `[All] [Aqua] [Pilates] [Yoga]`)
- Vê a foto da aula como thumbnail no card ou banner ao expandir
- Vê a foto do instrutor diretamente na linha, sem precisar expandir
- Recebe feedback visual imediato: badge vermelho **FULL** quando esgotado, âmbar **X left!** quando ≤ 5 vagas, botão transforma-se em "Join Waitlist" automaticamente
- Preview da descrição da aula visível sem expandir o card

### Configuração pelo Admin

Todos os novos recursos são controláveis via toggles no painel do admin — nenhuma mudança de código necessária:

| Toggle | Padrão | Descrição |
|---|---|---|
| `show_category_filter` | ✅ ON | Pills de categoria (só aparece com 2+ categorias na semana) |
| `show_class_image` | ❌ OFF | Thumbnail 48px no card + banner no expandido |
| `show_instructor_photo` | ❌ OFF | Avatar 16px do instrutor na linha do card |
| `show_description_preview` | ❌ OFF | 1 linha da descrição visível sem expandir |
| `show_difficulty` | ❌ OFF | Pill de dificuldade (beginner/intermediate/advanced) na linha |

> Imagem e foto de instrutor ficam OFF por padrão pois dependem de conteúdo cadastrado. Academias que já têm fotos cadastradas podem ativar com 1 clique.

### Impacto Esperado
- **+15-25% engajamento** com o widget (baseado em benchmarks de WellnessLiving com imagens habilitadas)
- **Redução de abandono** por incerteza de disponibilidade (badges FULL / urgência)
- **Mais reservas antecipadas** pela navegação de semanas futuras
- **Paridade competitiva** com Mindbody/WellnessLiving no item mais visitado do site de academia

### Dependência Técnica
Aplicar `ADD_SCHEDULE_WIDGET_V2.sql` no Supabase Dashboard para que `class_image_url` seja retornado pelo RPC. Sem este SQL, o widget funciona normalmente mas sem imagens.
