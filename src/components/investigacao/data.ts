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
      "“Produtos de limpeza podem estar contaminados. Para evitar riscos, recomenda-se interromper o uso de todos eles até que novas informações sejam divulgadas.”",
    correta: false,
    feedback:
      "Ainda não. Essa mensagem parece preventiva, mas continua generalizando o problema. Ela recomenda interromper o uso de todos os produtos, mesmo que a investigação envolva apenas lotes específicos. Uma comunicação responsável deve orientar a verificação do lote e a consulta a fontes oficiais.",
  },
  {
    id: "B",
    texto:
      "“Há investigação sobre possíveis problemas em determinados lotes de produtos saneantes. Verifique o número do lote no rótulo e consulte as orientações oficiais da Anvisa e da empresa responsável.”",
    correta: true,
    feedback:
      "Correto! Essa é a comunicação mais adequada porque informa o problema sem alarmismo, evita generalizações e orienta uma ação concreta: verificar o lote e consultar fontes oficiais, como a Anvisa e a empresa responsável.",
  },
  {
    id: "C",
    texto:
      "“A presença de bactérias em produtos de limpeza não representa risco relevante, por isso os consumidores podem continuar usando qualquer produto normalmente.”",
    correta: false,
    feedback:
      "Ainda não. Essa alternativa minimiza o risco. Embora a presença da bactéria não signifique perigo para todas as pessoas em qualquer situação, ela pode representar risco para grupos vulneráveis ou em contato com feridas e mucosas. Por isso, a orientação oficial deve ser seguida.",
  },
  {
    id: "D",
    texto:
      "“Como ainda existem dúvidas, a população deve aguardar novas mensagens nas redes sociais antes de decidir o que fazer com os produtos que possui em casa.”",
    correta: false,
    feedback:
      "Ainda não. Redes sociais não são a fonte mais segura para orientar decisões sobre saúde pública. O ideal é consultar comunicados oficiais e informações verificáveis, especialmente quando há risco sanitário envolvido.",
  },
  {
    id: "E",
    texto:
      "“A contaminação de alguns produtos mostra que detergentes não são seguros e devem ser substituídos por soluções caseiras de limpeza.”",
    correta: false,
    feedback:
      "Ainda não. Essa alternativa tira uma conclusão ampla demais a partir de um problema específico. A contaminação de alguns lotes não significa que todos os detergentes sejam inseguros. Além disso, soluções caseiras também podem apresentar riscos quando usadas sem orientação adequada.",
  },
];

