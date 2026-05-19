import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOTES, CATEGORIAS, type Lote } from "./data";
import { FeedbackPanel } from "./FeedbackPanel";

type Atribuicao = Record<string, Lote["categoria"] | null>;

function feedbackErro(l: Lote): string {
  if (l.categoria === "suspender") {
    return "A presença confirmada da bactéria exige uma medida sanitária mais cautelosa.";
  }
  if (l.categoria === "repetir") {
    return "Quando o resultado é inconclusivo, é necessário obter nova evidência antes de liberar o produto.";
  }
  return "A ausência de contaminação detectável permite uma conduta menos restritiva, com acompanhamento.";
}

export function Classificacao({ onNext }: { onNext: () => void }) {
  const [atrib, setAtrib] = useState<Atribuicao>(
    Object.fromEntries(LOTES.map((l) => [l.id, null])) as Atribuicao,
  );
  const [verificado, setVerificado] = useState(false);

  const allSet = Object.values(atrib).every(Boolean);
  const allCorrect =
    allSet && LOTES.every((l) => atrib[l.id] === l.categoria);

  const errados = LOTES.filter(
    (l) => atrib[l.id] !== null && atrib[l.id] !== l.categoria,
  );

  function set(id: string, cat: Lote["categoria"]) {
    if (verificado) return;
    setAtrib((a) => ({ ...a, [id]: cat }));
  }

  function verificar() {
    setVerificado(true);
  }

  function tentarNovamente() {
    setVerificado(false);
    setAtrib((a) => {
      const novo: Atribuicao = { ...a };
      errados.forEach((l) => {
        novo[l.id] = null;
      });
      return novo;
    });
  }

  return (
    <div className="flex h-full flex-col px-6 py-7">
      <div className="mb-4 px-1">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Atividade · classificação
        </span>
        <h2 className="mt-1 font-display text-2xl leading-tight">
          Atribua a conduta sanitária a cada lote
        </h2>
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
        {LOTES.map((l) => {
          const escolha = atrib[l.id];
          const correto = verificado && escolha === l.categoria;
          const errado =
            verificado && escolha !== null && escolha !== l.categoria;
          const resultadoEmItalico = l.resultado.replace(
            /Pseudomonas aeruginosa/g,
            "@@P@@",
          );
          return (
            <div
              key={l.id}
              className="rounded-xl border border-border bg-card p-3 transition"
              style={{
                borderColor: correto
                  ? "var(--color-success)"
                  : errado
                    ? "var(--color-destructive)"
                    : undefined,
              }}
            >
              <p className="text-sm font-semibold">
                {l.produto}{" "}
                <span className="font-normal text-muted-foreground">
                  · Lote {l.lote}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {resultadoEmItalico.split("@@P@@").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <em className="italic">Pseudomonas aeruginosa</em>
                    )}
                  </span>
                ))}
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {CATEGORIAS.map((c) => {
                  const ativo = escolha === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => set(l.id, c.key)}
                      disabled={verificado}
                      className="rounded-lg border px-2 py-2 text-[11px] font-medium leading-tight transition"
                      style={{
                        borderColor: ativo
                          ? "var(--color-primary)"
                          : "var(--color-border)",
                        backgroundColor: ativo
                          ? "color-mix(in oklab, var(--color-primary) 12%, transparent)"
                          : "transparent",
                        color: ativo
                          ? "var(--color-primary)"
                          : "var(--color-foreground)",
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        <Button
          onClick={verificar}
          disabled={!allSet || verificado}
          className="h-12 w-full rounded-full text-base"
        >
          <Check className="mr-2 h-4 w-4" /> Verificar classificação
        </Button>
      </div>

      <FeedbackPanel
        open={verificado}
        tipo={allCorrect ? "acerto" : "erro"}
        titulo={
          allCorrect
            ? "Classificação adequada"
            : "Reveja os lotes destacados"
        }
        onRetry={tentarNovamente}
        onContinue={onNext}
        retryLabel="Reclassificar lotes"
      >
        {allCorrect ? (
          <p>
            Você classificou os lotes com base nas evidências
            microbiológicas. Cada conduta sanitária está coerente com o
            resultado analítico apresentado.
          </p>
        ) : (
          <div className="space-y-3">
            <p>
              Ainda há decisões que precisam ser revistas. Retome os
              resultados microbiológicos de cada lote antes de avançar.
            </p>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-destructive">
                Lotes a reanalisar
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                {errados.map((l) => (
                  <li key={l.id}>
                    <span className="font-semibold">
                      {l.produto} · Lote {l.lote}:
                    </span>{" "}
                    {feedbackErro(l)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </FeedbackPanel>
    </div>
  );
}
