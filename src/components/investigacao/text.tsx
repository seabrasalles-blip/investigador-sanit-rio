import { Fragment } from "react";

// Renders a string with scientific bacterium names in italics.
export function SciText({ children }: { children: string }) {
  const parts = children.split(/(Pseudomonas aeruginosa|Pseudomonas)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Pseudomonas aeruginosa" || part === "Pseudomonas" ? (
          <em key={i} className="italic">
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
