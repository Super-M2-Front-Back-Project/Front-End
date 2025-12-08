
"use client";

import React from "react";

// Reusable nested list component
type NestedListItem = {
  label: string;
  children?: NestedListItem[];
};

function NestedList({ items }: { items: NestedListItem[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-base">
          {item.label}
          {item.children && item.children.length > 0 && (
            <NestedList items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

// Component with title and subtitles (sections)
interface DecouvrirListProps {
  populaire: NestedListItem[];
  nouveaute: NestedListItem[];
  coupDeCoeur: NestedListItem[];
}

export default function DecouvrirList({ populaire, nouveaute, coupDeCoeur }: DecouvrirListProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Découvrir</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Populaire</h2>
        <NestedList items={populaire} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Nouveauté</h2>
        <NestedList items={nouveaute} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Coup de cœur</h2>
        <NestedList items={coupDeCoeur} />
      </section>
    </div>
  );
}

// Example usage:
// const populaire = [ { label: "Item A" }, { label: "Item B" } ];
// const nouveaute = [ { label: "Nouveau 1" } ];
// const coupDeCoeur = [ { label: "❤️ Favori 1" } ];
// <DecouvrirList populaire={populaire} nouveaute={nouveaute} coupDeCoeur={coupDeCoeur} />
