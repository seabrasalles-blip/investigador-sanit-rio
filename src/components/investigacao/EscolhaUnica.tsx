import { useMemo, useState } from "react";
import { ArrowRight, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Opt = { id: string; texto: string; correta: boolean; feedback: string };

type Props = {
  titulo: string;
  pergunta: string;
  opcoes: Opt[];
  variant: "fake" | "reescrita";
  onNext: () => void;
  mensagem?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function EscolhaUnica({
  titulo,
  pergunta,
  opcoes,
  variant,
  onNext,
  mensagem,
}: Props) {
  const [round, setRound] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  const ordered = useMemo(() => {
    // round 0 = original order; subsequent rounds shuffled
    return round === 0 ? opcoes : shuffle(opcoes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, opcoes]);

  const acertou = confirmado && !!sel && opcoes.find((o) => o.id === sel)?.correta;
  const errou = confirmado && !acertou;

  const Icon = variant === "fake" ? AlertTriangle : ShieldCheck;
  const tint =
    variant === "fake" ? "var(--color-warning)" : "var(--color-success)";

  const tentarNovamente = () => {
    setConfirmado(false);
    setSel(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="flex h-full flex-col px-6 py-7">
      <div className="mb-3 flex items-center gap-2 px-1">
        <Icon
          className="h-4 w-4"
          style={{
            color:
              variant === "fake"
                ? "var(--color-warning-foreground)"
                : "var(--color-success)",
          }}
        />
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {titulo}
        </span>
      </div>

      {mensagem && (
        <div
          className="mb-4 rounded-2xl border p-4"
          style={{
            borderColor: tint,
            backgroundColor: "color-mix(in oklab, var(--color-warning) 25%, var(--color-card))",
          }}
        >
          <p className="text-[11px] uppercase tracking-wider text-warning-foreground/80">
            Mensagem recebida
          </p>
          <p className="mt-1 text-sm font-medium text-warning-foreground">
            "{mensagem}"
          </p>
        </div>
      )}

      <h2 className="px-1 font-display text-xl leading-snug">{pergunta}</h2>

      <div className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
        {ordered.map((o) => {
          const ativo = sel === o.id;
          const mostrarCerto = confirmado && acertou && o.correta;
          const mostrarErrado = confirmado && ativo && !o.correta;
          return (
            <div key={o.id}>
              <button
                onClick={() => !confirmado && setSel(o.id)}
                disabled={confirmado}
                className="w-full rounded-xl border p-3 text-left text-sm transition"
                style={{
                  borderColor: mostrarCerto
                    ? "var(--color-success)"
                    : mostrarErrado
                      ? "var(--color-destructive)"
                      : ativo
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                  backgroundColor: ativo
                    ? "color-mix(in oklab, var(--color-primary) 8%, var(--color-card))"
                    : "var(--color-card)",
                }}
              >
                <span className="mr-2 font-semibold text-foreground/60">{o.id}.</span>
                <span className="mr-2 font-semibold text-foreground/60">{o.id}.</span>
                {o.texto}
              </button>
              {confirmado && ativo && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 px-3 text-[11px] leading-relaxed text-muted-foreground"
                >
                  {o.feedback}
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
            disabled={!sel}
            className="h-12 w-full rounded-full text-base"
          >
            Confirmar resposta
          </Button>
        ) : errou ? (
          <Button
            onClick={tentarNovamente}
            variant="outline"
            className="h-12 w-full rounded-full text-base"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
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
