
## Visão geral

Aplicação React (TanStack Start) de página única com fluxo guiado em 8 etapas, formato vertical 720x1080, visual científico moderno (azul/verde/branco/amarelo suave), sem pontuação numérica — apenas feedback formativo.

## Estrutura de telas

1. **Capa** — ícone de lupa, título "Investigadores da qualidade", subtítulo "Como a ciência investiga um problema?", botão "Iniciar investigação".
2. **Situação-problema** — card explicativo sobre testes microbiológicos em lotes de saneantes; botão "Ver dados".
3. **Tabela de dados** — 5 linhas clicáveis (produto, lote, resultado, recomendação) abrindo cartão lateral/modal com explicação técnica do microrganismo e da decisão sanitária.
4. **Classificação de lotes** — arrastar/selecionar cada lote para uma das 3 categorias (Suspender e investigar / Repetir análise / Liberar com monitoramento). Feedback formativo por item ao confirmar.
5. **Hipóteses** (múltipla escolha) — 6 alternativas, marcar as plausíveis (A, B, D, F corretas). Feedback explica cada uma.
6. **Fake news** — exibir mensagem alarmista em card de alerta; escolher avaliação (C correta).
7. **Reescrita responsável** — escolher a melhor versão da comunicação (B correta).
8. **Síntese final** — texto-resumo + frase destacada "Pensar cientificamente é investigar antes de concluir"; botão "Reiniciar".

Barra de progresso fixa no topo (8 etapas, marcador visual sem números de pontuação).

## Design

- Paleta via tokens em `src/styles.css` (oklch): azul investigação, verde validação, amarelo alerta suave, neutros claros.
- Tipografia: par sério-display + sans (ex.: Instrument Serif + Work Sans) para tom editorial-científico.
- Ícones lucide-react: `Search` (lupa), `FlaskConical` (frasco), `Tag` (lote), `Microscope`, `AlertTriangle`, `ShieldCheck`.
- Cards com cantos suaves, sombras leves, hierarquia tipográfica forte; sem ilustrações infantis.
- Container central limitado a ~720px de largura, alturas calculadas para caber em 1080px sem rolagem.
- Animações sutis (fade/slide) entre etapas com framer-motion.
- Acessibilidade: foco visível, contraste AA, aria-labels nas opções.

## Implementação técnica

- Rota única `/` em `src/routes/index.tsx` controlando step state (0–7) via `useState`.
- Componentes em `src/components/investigacao/`: `ProgressBar`, `Capa`, `Situacao`, `TabelaDados`, `Classificacao`, `Hipoteses`, `FakeNews`, `Reescrita`, `Sintese`.
- Dados (lotes, alternativas, gabaritos, feedbacks) em `src/components/investigacao/data.ts`.
- Classificação: cada lote tem botões das 3 categorias (mais robusto em mobile que drag-and-drop) e mostra estado selecionado; botão "Confirmar" revela feedback por item (✓ correto / explicação se incorreto).
- Múltipla escolha (hipóteses): checkboxes; ao confirmar, cada alternativa ganha tag "plausível"/"não sustentada" com micro-explicação.
- Fake news / reescrita: radio cards; feedback explicativo ao confirmar.
- Sem persistência/backend — tudo client-side.
- Atualizar `head()` da rota com título e meta description próprios.

## Fora do escopo

- Backend, autenticação, salvamento de respostas.
- Geração de imagens (uso apenas de ícones lucide).
- Pontuação numérica.
