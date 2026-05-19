import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  tipo: "acerto" | "erro";
  titulo?: string;
  children: ReactNode;
  onRetry?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  retryLabel?: string;
  dismissible?: boolean;
  onClose?: () => void;
};

export function FeedbackPanel({
  open,
  tipo,
  titulo,
  children,
  onRetry,
  onContinue,
  continueLabel = "Continuar",
  retryLabel = "Tentar novamente",
  dismissible = false,
  onClose,
}: Props) {
  const acerto = tipo === "acerto";
  const Icon = acerto ? CheckCircle2 : AlertCircle;
  const headerTint = acerto ? "var(--color-success)" : "var(--color-destructive)";
  const defaultTitle = acerto ? "Boa investigação!" : "Observe melhor os dados";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 flex items-end bg-foreground/40 backdrop-blur-sm"
          onClick={dismissible ? onClose : undefined}
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
              <div className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `color-mix(in oklab, ${headerTint} 15%, var(--color-card))`,
                    color: headerTint,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p
                    className="text-[11px] uppercase tracking-wider"
                    style={{ color: headerTint }}
                  >
                    {acerto ? "Devolutiva" : "Mediação"}
                  </p>
                  <h3 className="font-display text-xl leading-tight">
                    {titulo ?? defaultTitle}
                  </h3>
                </div>
              </div>
              {dismissible && (
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/70 hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground/85">
              {children}
            </div>

            <div className="mt-4">
              {acerto ? (
                <Button
                  onClick={onContinue}
                  className="h-12 w-full rounded-full text-base"
                >
                  {continueLabel} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={onRetry}
                  variant="outline"
                  className="h-12 w-full rounded-full text-base"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> {retryLabel}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
