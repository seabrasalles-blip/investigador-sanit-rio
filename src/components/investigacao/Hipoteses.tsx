import { useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HIPOTESES } from "./data";
import { motion } from "framer-motion";

export function Hipoteses({ onNext }: { onNext: () => void }) {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [confirmado, setConfirmado] = useState(false);

  function toggle(id: string) {
    if (confirmado) return;
    setSel((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  return (
    <div className="flex h-full flex-col px-6 py-7">
      <div className="mb-3 flex items-center gap-2 px-1">
        <Lightbulb className="h-4 w-4 text-warning-foreground" />
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Atividade · hipóteses
        </span>
      </div>
      <h2 className="px-1 font-display text-2xl leading-tight">
        Quais hipóteses são mais plausíveis para a contaminação?
      </h2>
      <p className="mt-1 px-1 text-xs text-muted-foreground">
        Selecione todas as que considera sustentáveis pelas evidências.
      </p>

      <div className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
        {HIPOTESES.map((h) => {
          const ativo = sel.has(h.id);
          const certo = confirmado && ((ativo && h.correta) || (!ativo && !h.correta));
          const errado = confirmado && !certo;
          return (
            <div key={h.id}>
              <button
                onClick={() => toggle(h.id)}
                disabled={confirmado}
                className="w-full rounded-xl border p-3 text-left text-sm transition"
                style={{
                  borderColor: confirmado
                    ? certo
                      ? "var(--color-success)"
                      : "var(--color-destructive)"
                    : ativo
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                  backgroundColor: ativo
                    ? "color-mix(in oklab, var(--color-primary) 8%, var(--color-card))"
                    : "var(--color-card)",
                }}
              >
                <span className="mr-2 font-semibold text-foreground/60">{h.id}.</span>
                {h.texto}
              </button>
              {confirmado && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 px-3 text-[11px] leading-relaxed text-muted-foreground"
                >
                  {h.feedback}
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
            disabled={sel.size === 0}
            className="h-12 w-full rounded-full text-base"
          >
            Confirmar hipóteses
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
