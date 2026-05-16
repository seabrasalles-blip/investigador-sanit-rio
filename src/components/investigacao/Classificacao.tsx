import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOTES, CATEGORIAS, type Lote } from "./data";
import { SciText } from "./text";
import { motion } from "framer-motion";

type Atribuicao = Record<string, Lote["categoria"] | null>;

export function Classificacao({ onNext }: { onNext: () => void }) {
  const [atrib, setAtrib] = useState<Atribuicao>(
    Object.fromEntries(LOTES.map((l) => [l.id, null])) as Atribuicao,
  );
  const [confirmado, setConfirmado] = useState(false);

  const allSet = Object.values(atrib).every(Boolean);

  function set(id: string, cat: Lote["categoria"]) {
    if (confirmado) return;
    setAtrib((a) => ({ ...a, [id]: cat }));
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
          const correto = confirmado && escolha === l.categoria;
          const errado = confirmado && escolha !== l.categoria;
          return (
            <div
              key={l.id}
              className="rounded-xl border border-border bg-card p-3"
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
                <SciText>{l.resultado}</SciText>
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {CATEGORIAS.map((c) => {
                  const ativo = escolha === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => set(l.id, c.key)}
                      disabled={confirmado}
                      className="rounded-lg border px-2 py-2 text-[11px] font-medium leading-tight transition disabled:opacity-90"
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
              {confirmado && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs"
                  style={{
                    color: correto
                      ? "var(--color-success)"
                      : "var(--color-destructive)",
                  }}
                >
                  {correto
                    ? "✓ Conduta adequada."
                    : `Reavalie: a conduta esperada é "${
                        CATEGORIAS.find((c) => c.key === l.categoria)!.label
                      }".`}
                </motion.p>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        {!confirmado ? (
          <Button
            onClick={() => setConfirmado(true)}
            disabled={!allSet}
            className="h-12 w-full rounded-full text-base"
          >
            <Check className="mr-2 h-4 w-4" /> Confirmar classificação
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
