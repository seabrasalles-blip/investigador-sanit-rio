import { ShieldCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sintese({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex h-full flex-col items-center px-8 py-10 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
        <ShieldCheck className="h-8 w-8" strokeWidth={1.6} />
      </div>

      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Síntese da investigação
      </span>
      <h2 className="mt-2 font-display text-3xl leading-tight">
        Investigação concluída
      </h2>

      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/80">
        Você analisou resultados de testes microbiológicos, classificou lotes,
        levantou hipóteses e avaliou uma mensagem alarmista. Esse percurso
        mostra que a ciência investiga problemas por meio de evidências.
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Antes de tomar uma decisão, é preciso observar dados, comparar
        resultados, considerar hipóteses e consultar fontes confiáveis.
      </p>

      <div className="mt-8 w-full max-w-md rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <p className="font-display text-2xl leading-snug text-primary">
          “Pensar cientificamente é investigar antes de concluir.”
        </p>
      </div>

      <Button
        onClick={onRestart}
        variant="outline"
        className="mt-8 h-11 rounded-full px-6"
      >
        <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar atividade
      </Button>
    </div>
  );
}
