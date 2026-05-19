export type Lote = {
  id: string;
  produto: string;
  lote: string;
  resultado: string;
  recomendacao: string;
  categoria: "suspender" | "repetir" | "liberar";
  detalhe: string;
};

export const LOTES: Lote[] = [
  {
    id: "A1021",
    produto: "Detergente A",
    lote: "1021",
    resultado: "Presença de Pseudomonas aeruginosa",
    recomendacao: "Exige ação imediata",
    categoria: "suspender",
    detalhe:
      "Pseudomonas aeruginosa é uma bactéria resistente que pode formar biofilmes e sobreviver em ambientes úmidos. Sua presença confirmada em um lote indica risco sanitário e demanda suspensão e investigação da causa.",
  },
  {
    id: "A1022",
    produto: "Detergente A",
    lote: "1022",
    resultado: "Ausência de contaminação detectável",
    recomendacao: "Manter monitoramento",
    categoria: "liberar",
    detalhe:
      "O lote não apresentou contaminação nos métodos analíticos utilizados. Pode ser liberado, mas o monitoramento contínuo é parte do controle de qualidade.",
  },
  {
    id: "B2041",
    produto: "Lava-roupas B",
    lote: "2041",
    resultado: "Presença de Pseudomonas aeruginosa",
    recomendacao: "Exige ação imediata",
    categoria: "suspender",
    detalhe:
      "A detecção do mesmo microrganismo em outro produto sugere possível fonte comum de contaminação no processo, como água, equipamentos ou reservatórios.",
  },
  {
    id: "C3071",
    produto: "Desinfetante C",
    lote: "3071",
    resultado: "Resultado inconclusivo",
    recomendacao: "Repetir análise",
    categoria: "repetir",
    detalhe:
      "Um resultado inconclusivo não permite decisão sanitária. A análise deve ser repetida com nova amostragem antes de qualquer liberação ou suspensão.",
  },
  {
    id: "D4082",
    produto: "Detergente D",
    lote: "4082",
    resultado: "Ausência de contaminação detectável",
    recomendacao: "Pode ser liberado",
    categoria: "liberar",
    detalhe:
      "Sem contaminação detectada nos ensaios. Pode ser liberado para distribuição, mantendo o acompanhamento de rotina.",
  },
];

export const CATEGORIAS = [
  {
    key: "suspender" as const,
    label: "Suspender e investigar",
    descricao: "Risco confirmado — retirar e investigar a causa.",
  },
  {
    key: "repetir" as const,
    label: "Repetir análise",
    descricao: "Resultado inconclusivo — nova amostragem necessária.",
  },
  {
    key: "liberar" as const,
    label: "Liberar com monitoramento",
    descricao: "Sem contaminação detectada — manter controle de rotina.",
  },
];

export const HIPOTESES = [
  {
    id: "A",
    texto:
      "A água usada na produção pode ter apresentado contaminação microbiológica.",
    correta: true,
    feedback:
      "Correto. A água usada na produção pode ser uma fonte de contaminação quando não há controle microbiológico adequado.",
  },
  {
    id: "B",
    texto:
      "Biofilmes podem ter se formado em tubulações ou reservatórios.",
    correta: true,
    feedback:
      "Correto. Biofilmes em tubulações ou reservatórios podem proteger microrganismos e dificultar a higienização.",
  },
  {
    id: "C",
    texto:
      "Pode ter ocorrido falha na higienização de equipamentos industriais.",
    correta: true,
    feedback:
      "Correto. Falhas na limpeza dos equipamentos podem favorecer a permanência de bactérias no processo produtivo.",
  },
  {
    id: "D",
    texto:
      "A bactéria surgiu espontaneamente no frasco.",
    correta: false,
    feedback:
      "Ainda não. Bactérias não surgem espontaneamente no frasco; é preciso investigar fontes de contaminação no processo.",
  },
  {
    id: "E",
    texto:
      "A formulação pode não ter controlado esse microrganismo.",
    correta: true,
    feedback:
      "Correto. A formulação ou os conservantes podem não ter sido suficientes para controlar esse tipo de microrganismo.",
  },
];

export const FAKE_NEWS_OPCOES = [
  {
    id: "A",
    texto:
      "apresenta uma orientação preventiva adequada, pois qualquer risco microbiológico exige a suspensão imediata de todos os produtos semelhantes.",
    correta: false,
    feedback:
      "Ainda não. A preocupação com a saúde é importante, mas a alternativa generaliza o risco. A presença de contaminação em determinados lotes não permite concluir que todos os produtos semelhantes devem ser suspensos. A decisão sanitária precisa considerar marca, lote, resultado do teste e orientação oficial.",
  },
  {
    id: "B",
    texto:
      "transforma uma informação sobre lotes específicos em uma recomendação generalizada, sem indicar fonte oficial, marca, lote ou orientação sanitária.",
    correta: true,
    feedback:
      "Correto! A mensagem transforma uma informação específica em uma recomendação geral e alarmista. Para avaliar o risco, é necessário saber quais produtos e lotes estão envolvidos, consultar fontes oficiais e seguir as orientações dos órgãos responsáveis.",
  },
  {
    id: "C",
    texto:
      "está correta ao priorizar a proteção da saúde, já que mensagens informais costumam circular antes dos comunicados oficiais.",
    correta: false,
    feedback:
      "Ainda não. A proteção da saúde é essencial, mas mensagens informais não substituem comunicados oficiais. Informações sem fonte, sem dados verificáveis e sem orientação técnica podem gerar medo e decisões inadequadas.",
  },
  {
    id: "D",
    texto:
      "deveria ser aceita provisoriamente, pois, em temas de saúde, a rapidez da divulgação é mais importante do que a verificação das evidências.",
    correta: false,
    feedback:
      "Ainda não. A rapidez na divulgação não pode ser mais importante que a verificação das evidências. Compartilhar informações sem confirmação amplia a desinformação e dificulta a orientação correta da população.",
  },
  {
    id: "E",
    texto:
      "é cientificamente válida porque a presença de uma bactéria em um produto comprova que todos os produtos da mesma categoria estão contaminados.",
    correta: false,
    feedback:
      "Ainda não. A presença de bactéria em um produto ou lote específico não comprova que todos os produtos da mesma categoria estejam contaminados. A ciência trabalha com evidências delimitadas: amostras, lotes, condições de produção e resultados laboratoriais.",
  },
];

export const REESCRITA_OPCOES = [
  {
    id: "A",
    texto:
      "Suspenda o uso de todos os produtos de limpeza até novas orientações.",
    correta: false,
    feedback:
      "Essa mensagem generaliza o problema. A investigação envolve lotes específicos, não todos os produtos de limpeza.",
  },
  {
    id: "B",
    texto:
      "Verifique se o produto pertence a um lote investigado e consulte as orientações oficiais da Anvisa.",
    correta: true,
    feedback:
      "Correto. A mensagem orienta a verificar o lote e consultar uma fonte oficial, evitando pânico e desinformação.",
  },
  {
    id: "C",
    texto:
      "Continue usando qualquer produto, pois a presença de bactérias não representa risco.",
    correta: false,
    feedback:
      "Essa mensagem minimiza o risco. Em alguns casos, a presença de microrganismos pode representar perigo, especialmente para pessoas vulneráveis.",
  },
  {
    id: "D",
    texto:
      "Aguarde novas mensagens nas redes sociais antes de tomar uma decisão.",
    correta: false,
    feedback:
      "Redes sociais não são a fonte mais segura para decisões sobre saúde pública. O ideal é consultar fontes oficiais.",
  },
  {
    id: "E",
    texto:
      "Substitua detergentes por soluções caseiras, pois são sempre mais seguras.",
    correta: false,
    feedback:
      "Essa conclusão é inadequada. Soluções caseiras também podem oferecer riscos se usadas sem orientação.",
  },
];

