import { Microscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Situacao({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full flex-col px-8 py-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-investigate/15 text-investigate">
          <Microscope className="h-6 w-6" strokeWidth={1.7} />
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Situação-problema
        </span>
      </div>

      <h2 className="font-display text-3xl leading-tight text-foreground">
        Lotes de produtos saneantes passaram por testes microbiológicos.
      </h2>

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
        <p>
          Um laboratório de controle de qualidade analisou amostras de cinco
          lotes diferentes de detergentes, lava-roupas e desinfetantes para
          verificar a presença de microrganismos.
        </p>
        <p>
          Sua tarefa é examinar os resultados, decidir a conduta sanitária
          adequada para cada lote, levantar hipóteses sobre a origem da
          contaminação e avaliar uma mensagem que circula nas redes sociais.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-secondary/60 p-5">
        <p className="text-sm font-medium text-foreground">
          O que orienta a decisão sanitária?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Evidências, não impressões. Cada decisão depende do tipo de
          resultado obtido nos ensaios.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <Button onClick={onNext} className="h-12 w-full rounded-full text-base">
          Ver dados <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
