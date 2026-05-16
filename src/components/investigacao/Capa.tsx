import { Search, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Capa({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-8">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Search className="h-11 w-11" strokeWidth={1.6} />
        </div>
      </div>

      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <FlaskConical className="h-3.5 w-3.5" /> Ciências da Natureza · Ensino Médio
      </p>

      <h1 className="font-display text-5xl leading-[1.05] text-foreground">
        Investigadores
        <br />
        da qualidade
      </h1>

      <p className="mt-5 max-w-md text-base text-muted-foreground">
        Como a ciência investiga um problema? Analise dados, classifique lotes
        e avalie informações com olhar científico.
      </p>

      <Button
        size="lg"
        onClick={onStart}
        className="mt-10 h-12 rounded-full px-8 text-base"
      >
        Iniciar investigação
      </Button>

      <p className="mt-6 text-xs text-muted-foreground/80">
        Atividade investigativa · sem pontuação · feedback formativo
      </p>
    </div>
  );
}
