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
      "Plausível. A água é um insumo crítico e pode ser fonte de contaminação se não for tratada e monitorada adequadamente.",
  },
  {
    id: "B",
    texto:
      "Biofilmes podem ter se formado em tubulações ou reservatórios.",
    correta: true,
    feedback:
      "Plausível. Biofilmes protegem microrganismos como a Pseudomonas e são uma origem comum de contaminação recorrente em indústrias.",
  },
  {
    id: "C",
    texto:
      "Todos os produtos de limpeza do país estão contaminados.",
    correta: false,
    feedback:
      "Não sustentada. Generalização sem evidências. Os dados se referem a lotes específicos, não a toda a categoria.",
  },
  {
    id: "D",
    texto:
      "Pode ter ocorrido falha na higienização de equipamentos industriais.",
    correta: true,
    feedback:
      "Plausível. Falhas em procedimentos de higienização são causas frequentes de contaminação cruzada entre lotes.",
  },
  {
    id: "E",
    texto:
      "A bactéria surgiu espontaneamente dentro do frasco, sem relação com o processo de fabricação.",
    correta: false,
    feedback:
      "Não sustentada. A geração espontânea de microrganismos foi refutada cientificamente há mais de um século.",
  },
  {
    id: "F",
    texto:
      "A formulação ou os conservantes podem não ter sido suficientes para controlar esse microrganismo.",
    correta: true,
    feedback:
      "Plausível. Conservantes inadequados ou em concentração insuficiente podem permitir a sobrevivência de microrganismos resistentes.",
  },
];

export const FAKE_NEWS_OPCOES = [
  {
    id: "A",
    texto:
      "Sim, porque qualquer notícia sobre bactéria deve ser compartilhada rapidamente.",
    correta: false,
    feedback:
      "Compartilhar sem verificar amplia desinformação. A velocidade não substitui a checagem da fonte.",
  },
  {
    id: "B",
    texto: "Sim, porque produtos de limpeza nunca podem ter microrganismos.",
    correta: false,
    feedback:
      "Premissa incorreta. Produtos saneantes passam por controle justamente porque a contaminação é possível e precisa ser monitorada.",
  },
  {
    id: "C",
    texto:
      "Não, porque generaliza o problema, não informa lotes específicos e não apresenta fonte oficial.",
    correta: true,
    feedback:
      "Avaliação adequada. Uma comunicação responsável identifica os lotes envolvidos e cita fontes oficiais, como a Anvisa.",
  },
  {
    id: "D",
    texto: "Não, porque a Anvisa nunca investiga produtos de limpeza.",
    correta: false,
    feedback:
      "Incorreto. A Anvisa regula e investiga produtos saneantes no Brasil.",
  },
];

export const REESCRITA_OPCOES = [
  {
    id: "A",
    texto:
      "Todos os produtos de limpeza devem ser jogados fora imediatamente.",
    correta: false,
    feedback:
      "Generaliza e provoca pânico. Não orienta o consumidor sobre o que de fato verificar.",
  },
  {
    id: "B",
    texto:
      "Há informações sobre lotes específicos de produtos saneantes sob investigação. Consulte fontes oficiais, verifique o número do lote no rótulo e siga as orientações da Anvisa.",
    correta: true,
    feedback:
      "Comunicação responsável: específica, orienta o consumidor e indica fonte oficial.",
  },
  {
    id: "C",
    texto:
      "Não existe risco nenhum, então não é preciso buscar informações.",
    correta: false,
    feedback:
      "Minimiza um risco real. Ignorar evidências é tão problemático quanto exagerá-las.",
  },
  {
    id: "D",
    texto:
      "Se uma mensagem viralizou, ela já pode ser considerada verdadeira.",
    correta: false,
    feedback:
      "Viralização não é critério de veracidade. Informação confiável depende de fonte e evidência.",
  },
];
