import { Fragment } from "react";

// Renders a string with scientific names rendered in italics.
// Currently italicizes "Pseudomonas aeruginosa" and standalone "Pseudomonas".
export function SciText({ children }: { children: string }) {
  const regex = /(Pseudomonas aeruginosa|Pseudomonas)/g;
  const parts = children.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
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
