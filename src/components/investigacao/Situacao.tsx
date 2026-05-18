import { useState } from "react";
import { Microscope, ArrowRight, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Situacao({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col px-7 py-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-investigate/15 text-investigate">
          <Microscope className="h-6 w-6" strokeWidth={1.7} />
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Situação-problema
        </span>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display text-[1.65rem] leading-tight text-foreground">
          Lotes de produtos saneantes passaram por testes microbiológicos.
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-investigate/10 text-investigate transition-colors hover:bg-investigate/20"
          aria-label="Saiba mais"
          title="Saiba mais"
        >
          <Info className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-foreground/80">
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

      <div className="mt-4 rounded-2xl border border-border bg-secondary/60 p-4">
        <p className="text-sm font-medium text-foreground">
          O que orienta a decisão sanitária?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Evidências, não impressões. Cada decisão depende do tipo de
          resultado obtido nos ensaios.
        </p>
      </div>

      <div className="mt-auto pt-4">
        <Button onClick={onNext} className="h-12 w-full rounded-full text-base">
          Ver dados <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="pr-8 font-display text-2xl leading-snug text-foreground">
              Como funciona o controle de qualidade?
            </h3>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/85">
              <p>
                O controle de qualidade verifica se um produto está seguro antes
                de chegar ao consumidor. Em produtos saneantes, como detergentes
                e desinfetantes, uma etapa importante é a análise
                microbiológica. Nela, amostras de cada lote são examinadas em
                laboratório para investigar a presença de microrganismos
                indesejados.
              </p>
              <p>
                Essas amostras podem ser colocadas em meios de cultura, que
                favorecem o crescimento de microrganismos. Se houver
                crescimento, novos testes ajudam a identificar qual bactéria,
                fungo ou levedura está presente.
              </p>
              <p>
                A investigação também considera possíveis fontes de
                contaminação, como água usada na produção, tubulações,
                reservatórios, equipamentos e falhas na higienização. Quando há
                contaminação confirmada ou resultado inconclusivo, o lote
                precisa ser investigado antes de qualquer decisão.
              </p>
              <p>
                Por isso, o controle de qualidade depende de dados, testes e
                evidências. Investigar é observar, testar, comparar e decidir
                com responsabilidade.
              </p>
            </div>

            <div className="mt-7 flex justify-end">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="rounded-full px-6"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
