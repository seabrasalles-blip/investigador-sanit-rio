import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
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
  const [idx, setIdx] = useState(0);
  const [verificado, setVerificado] = useState(false);

  const total = LOTES.length;
  const loteAtual = LOTES[idx];
  const escolhaAtual = atrib[loteAtual.id];
  const isUltimo = idx === total - 1;

  const allSet = Object.values(atrib).every(Boolean);
  const allCorrect =
    allSet && LOTES.every((l) => atrib[l.id] === l.categoria);
  const errados = LOTES.filter(
    (l) => atrib[l.id] !== null && atrib[l.id] !== l.categoria,
  );

  function set(cat: Lote["categoria"]) {
    if (verificado) return;
    setAtrib((a) => ({ ...a, [loteAtual.id]: cat }));
  }

  function avancar() {
    if (isUltimo) {
      setVerificado(true);
    } else {
      setIdx((i) => Math.min(i + 1, total - 1));
    }
  }

  function tentarNovamente() {
    setVerificado(false);
    const primeiroErrado = LOTES.findIndex(
      (l) => atrib[l.id] !== null && atrib[l.id] !== l.categoria,
    );
    setAtrib((a) => {
      const novo: Atribuicao = { ...a };
      errados.forEach((l) => {
        novo[l.id] = null;
      });
      return novo;
    });
    if (primeiroErrado >= 0) setIdx(primeiroErrado);
  }

  const resultadoEmItalico = loteAtual.resultado.replace(
    /Pseudomonas aeruginosa/g,
    "@@P@@",
  );

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

      <div className="mb-4 flex items-center justify-between px-1">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Lote {idx + 1} de {total}
        </span>
        <div className="flex items-center gap-1.5">
          {LOTES.map((l, i) => {
            const preenchido = atrib[l.id] !== null;
            const ativo = i === idx;
            return (
              <span
                key={l.id}
                className="h-2 w-2 rounded-full transition"
                style={{
                  backgroundColor: ativo
                    ? "var(--color-primary)"
                    : preenchido
                      ? "color-mix(in oklab, var(--color-primary) 45%, transparent)"
                      : "var(--color-border)",
                  transform: ativo ? "scale(1.25)" : "scale(1)",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-semibold">
            {loteAtual.produto}{" "}
            <span className="font-normal text-muted-foreground">
              · Lote {loteAtual.lote}
            </span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {resultadoEmItalico.split("@@P@@").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <em className="italic">Pseudomonas aeruginosa</em>
                )}
              </span>
            ))}
          </p>

          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-foreground/70">
            Qual é a conduta sanitária adequada?
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {CATEGORIAS.map((c) => {
              const ativo = escolhaAtual === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => set(c.key)}
                  disabled={verificado}
                  className="rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition"
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
      </div>

      <div className="pt-4">
        <Button
          onClick={avancar}
          disabled={!escolhaAtual || verificado}
          className="h-12 w-full rounded-full text-base"
        >
          {isUltimo ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Verificar classificação
            </>
          ) : (
            <>
              Próximo lote <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
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
