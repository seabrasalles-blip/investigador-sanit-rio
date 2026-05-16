type Props = {
  step: number;
  total: number;
  labels: string[];
};

export function ProgressBar({ step, total, labels }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const active = i <= step;
          return (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: active
                  ? "var(--color-primary)"
                  : "var(--color-border)",
              }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>Etapa {step + 1} de {total}</span>
        <span className="font-medium text-foreground/70">{labels[step]}</span>
      </div>
    </div>
  );
}
