import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOTES, CATEGORIAS, type Lote } from "./data";
import { motion, AnimatePresence } from "framer-motion";

type Atribuicao = Record<string, Lote["categoria"] | null>;

function feedbackErro(l: Lote): string {
  if (l.categoria === "suspender") {
    return "Reavalie os dados deste lote. A presença confirmada da bactéria exige uma medida sanitária mais cautelosa.";
  }
  if (l.categoria === "repetir") {
    return "Reavalie os dados deste lote. Quando o resultado é inconclusivo, é necessário obter nova evidência antes de liberar o produto.";
  }
  return "Reavalie os dados deste lote. A ausência de contaminação detectável permite uma conduta menos restritiva, com acompanhamento.";
}

export function Classificacao({ onNext }: { onNext: () => void }) {
  const [atrib, setAtrib] = useState<Atribuicao>(
    Object.fromEntries(LOTES.map((l) => [l.id, null])) as Atribuicao,
  );
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [globalMsg, setGlobalMsg] = useState<
    { tipo: "erro" | "ok"; texto: string } | null
  >(null);

  const allSet = Object.values(atrib).every(Boolean);
  const allCorrect =
    allSet && LOTES.every((l) => atrib[l.id] === l.categoria);

  function set(id: string, cat: Lote["categoria"]) {
    setAtrib((a) => ({ ...a, [id]: cat }));
    setChecked((c) => ({ ...c, [id]: false }));
    setGlobalMsg(null);
  }

  function verificar() {
    const novos: Record<string, boolean> = {};
    LOTES.forEach((l) => {
      novos[l.id] = true;
    });
    setChecked(novos);
    if (LOTES.every((l) => atrib[l.id] === l.categoria)) {
      setGlobalMsg({
        tipo: "ok",
        texto: "Ótimo! Você classificou os lotes com base nas evidências.",
      });
    } else {
      setGlobalMsg({
        tipo: "erro",
        texto:
          "Ainda há decisões que precisam ser revistas. Analise novamente os resultados microbiológicos antes de avançar.",
      });
    }
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
          const foiVerificado = checked[l.id];
          const correto = foiVerificado && escolha === l.categoria;
          const errado = foiVerificado && escolha !== null && escolha !== l.categoria;
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
              <AnimatePresence>
                {errado && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-xs"
                    style={{ color: "var(--color-destructive)" }}
                  >
                    {feedbackErro(l)}
                  </motion.p>
                )}
                {correto && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-xs"
                    style={{ color: "var(--color-success)" }}
                  >
                    ✓ Conduta adequada.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {globalMsg && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-lg border px-3 py-2 text-xs"
          style={{
            borderColor:
              globalMsg.tipo === "ok"
                ? "var(--color-success)"
                : "var(--color-destructive)",
            color:
              globalMsg.tipo === "ok"
                ? "var(--color-success)"
                : "var(--color-destructive)",
            backgroundColor:
              globalMsg.tipo === "ok"
                ? "color-mix(in oklab, var(--color-success) 8%, transparent)"
                : "color-mix(in oklab, var(--color-destructive) 8%, transparent)",
          }}
        >
          {globalMsg.texto}
        </motion.div>
      )}

      <div className="pt-4">
        {!allCorrect ? (
          <Button
            onClick={verificar}
            disabled={!allSet}
            className="h-12 w-full rounded-full text-base"
          >
            <Check className="mr-2 h-4 w-4" /> Verificar classificação
          </Button>
        ) : (
          <Button onClick={onNext} className="h-12 w-full rounded-full text-base">
            Continuar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
