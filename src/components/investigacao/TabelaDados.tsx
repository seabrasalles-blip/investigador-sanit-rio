import { useState } from "react";
import { Tag, ArrowRight, X, AlertCircle, CheckCircle2, RotateCw } from "lucide-react";
import { LOTES, type Lote } from "./data";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SciText } from "./text";

function StatusIcon({ categoria }: { categoria: Lote["categoria"] }) {
  if (categoria === "suspender")
    return <AlertCircle className="h-4 w-4 text-destructive" />;
  if (categoria === "repetir")
    return <RotateCw className="h-4 w-4 text-warning-foreground" />;
  return <CheckCircle2 className="h-4 w-4 text-success" />;
}

export function TabelaDados({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<Lote | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  function open(l: Lote) {
    setSelected(l);
    setSeen((s) => new Set(s).add(l.id));
  }

  return (
    <div className="flex h-full flex-col px-6 py-8">
      <div className="mb-4 px-2">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Dados laboratoriais
        </span>
        <h2 className="mt-1 font-display text-2xl leading-tight">
          Toque em cada lote para investigar
        </h2>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {LOTES.map((l) => (
          <button
            key={l.id}
            onClick={() => open(l)}
            className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3.5 text-left transition hover:border-primary/40 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/70">
              <Tag className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                {l.produto}{" "}
                <span className="font-normal text-muted-foreground">
                  · Lote {l.lote}
                </span>
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <StatusIcon categoria={l.categoria} />
                <SciText>{l.resultado}</SciText>
              </p>
            </div>
            {seen.has(l.id) && (
              <span className="shrink-0 text-[10px] uppercase tracking-wider text-success">
                visto
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="pt-6">
        <Button
          onClick={onNext}
          disabled={seen.size < LOTES.length}
          className="h-12 w-full rounded-full text-base"
        >
          {seen.size < LOTES.length
            ? `Investigue todos os lotes (${seen.size}/${LOTES.length})`
            : "Continuar para classificação"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-end bg-foreground/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-3xl bg-card p-6 shadow-2xl"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Lote {selected.lote}
                  </p>
                  <h3 className="font-display text-2xl">{selected.produto}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/70 hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-background p-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Resultado
                  </p>
                  <p className="mt-1 text-sm font-medium"><SciText>{selected.resultado}</SciText></p>
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Recomendação
                  </p>
                  <p className="mt-1 text-sm font-medium">{selected.recomendacao}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {selected.detalhe}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
