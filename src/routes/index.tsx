import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar } from "@/components/investigacao/ProgressBar";
import { Capa } from "@/components/investigacao/Capa";
import { Situacao } from "@/components/investigacao/Situacao";
import { TabelaDados } from "@/components/investigacao/TabelaDados";
import { Classificacao } from "@/components/investigacao/Classificacao";
import { Hipoteses } from "@/components/investigacao/Hipoteses";
import { EscolhaUnica } from "@/components/investigacao/EscolhaUnica";
import { Sintese } from "@/components/investigacao/Sintese";
import { FAKE_NEWS_OPCOES, REESCRITA_OPCOES } from "@/components/investigacao/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Investigadores da qualidade — Atividade investigativa" },
      {
        name: "description",
        content:
          "Atividade de Ciências da Natureza: analise dados microbiológicos, classifique lotes e avalie informações com olhar científico.",
      },
      { property: "og:title", content: "Investigadores da qualidade" },
      {
        property: "og:description",
        content:
          "Como a ciência investiga um problema? Atividade investigativa para o Ensino Médio.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const LABELS = [
  "Início",
  "Situação",
  "Dados",
  "Classificar",
  "Hipóteses",
  "Mensagem",
  "Reescrita",
  "Síntese",
];

function Index() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, LABELS.length - 1));
  const restart = () => setStep(0);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div
        className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
        style={{ height: "min(1080px, calc(100vh - 2rem))" }}
      >
        {step > 0 && (
          <div className="border-b border-border bg-card/80 px-6 py-4 backdrop-blur">
            <ProgressBar step={step} total={LABELS.length} labels={LABELS} />
          </div>
        )}

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {step === 0 && <Capa onStart={next} />}
              {step === 1 && <Situacao onNext={next} />}
              {step === 2 && <TabelaDados onNext={next} />}
              {step === 3 && <Classificacao onNext={next} />}
              {step === 4 && <Hipoteses onNext={next} />}
              {step === 5 && (
                <EscolhaUnica
                  titulo="Atividade 3 · informação confiável?"
                  pergunta="Informação confiável ou conclusão apressada? Após a divulgação da investigação dos lotes, uma mensagem começou a circular em grupos de conversa. Com base nos princípios de análise de informações científicas e sanitárias, essa mensagem deve ser avaliada com cautela porque:"
                  variant="fake"
                  mensagem="Foi encontrada uma bactéria perigosa em produtos de limpeza. Melhor parar de usar todos os detergentes até segunda ordem."
                  opcoes={FAKE_NEWS_OPCOES}
                  onNext={next}
                />
              )}
              {step === 6 && (
                <EscolhaUnica
                  titulo="Atividade 4 · comunicar sem pânico"
                  pergunta="Como comunicar um risco sem gerar pânico? Uma equipe precisa reescrever a mensagem anterior para orientar a população de forma responsável, sem minimizar o risco e sem espalhar alarme desnecessário. Qual das versões abaixo apresenta a comunicação mais adequada?"
                  variant="reescrita"
                  opcoes={REESCRITA_OPCOES}
                  onNext={next}
                />
              )}
              {step === 7 && <Sintese onRestart={restart} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
