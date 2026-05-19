import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HIPOTESES } from "./data";
import { SciText } from "./text";
import { FeedbackPanel } from "./FeedbackPanel";

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

  const tudoCorreto =
    confirmado &&
    HIPOTESES.every((h) => (sel.has(h.id) ? h.correta : !h.correta));

  const acertadas = HIPOTESES.filter((h) => sel.has(h.id) && h.correta);
  const incorretasMarcadas = HIPOTESES.filter(
    (h) => sel.has(h.id) && !h.correta,
  );
  const corretasNaoMarcadas = HIPOTESES.filter(
    (h) => !sel.has(h.id) && h.correta,
  );

  const tentarNovamente = () => {
    setConfirmado(false);
    setSel(new Set());
  };

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
          return (
            <button
              key={h.id}
              onClick={() => toggle(h.id)}
              disabled={confirmado}
              className="w-full rounded-xl border p-3 text-left text-sm transition"
              style={{
                borderColor: ativo
                  ? "var(--color-primary)"
                  : "var(--color-border)",
                backgroundColor: ativo
                  ? "color-mix(in oklab, var(--color-primary) 8%, var(--color-card))"
                  : "var(--color-card)",
              }}
            >
              {h.texto}
            </button>
          );
        })}
      </div>

      <div className="pt-4">
        <Button
          onClick={() => setConfirmado(true)}
          disabled={sel.size === 0 || confirmado}
          className="h-12 w-full rounded-full text-base"
        >
          Confirmar hipóteses
        </Button>
      </div>

      <FeedbackPanel
        open={confirmado}
        tipo={tudoCorreto ? "acerto" : "erro"}
        titulo={
          tudoCorreto ? "Hipóteses bem sustentadas" : "Reveja as hipóteses"
        }
        onRetry={tentarNovamente}
        onContinue={onNext}
        retryLabel="Refazer seleção"
      >
        {tudoCorreto ? (
          <div className="space-y-2">
            {acertadas.map((h) => (
              <p key={h.id}>
                <SciText>{h.feedback}</SciText>
              </p>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {incorretasMarcadas.length > 0 && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-destructive">
                  Hipóteses marcadas que não se sustentam
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  {incorretasMarcadas.map((h) => (
                    <li key={h.id}>
                      <SciText>{h.feedback}</SciText>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {corretasNaoMarcadas.length > 0 && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-warning-foreground">
                  Hipóteses que merecem atenção
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  {corretasNaoMarcadas.map((h) => (
                    <li key={h.id}>
                      <SciText>{h.feedback}</SciText>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </FeedbackPanel>
    </div>
  );
}
