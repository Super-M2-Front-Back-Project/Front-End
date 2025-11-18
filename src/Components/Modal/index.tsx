"use client";

import React from "react";

export type CountryStat = {
  id: string;
  name: string;
  code?: string;
  lat: number;
  lon: number;
  value?: number;
  color?: string;
};

export type MondialMapProps = {
  width?: number;
  height?: number;
  countries?: CountryStat[];
  onSelect?: (country: CountryStat) => void;
  className?: string;
};

export default function MondialMap({
  width = 900,
  height = 480,
  countries = [],
  onSelect,
  className = "",
}: MondialMapProps) {
  return (
    <div className={className}>
      {/* Carte */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        className="block"
      >
        {/* Fond */}
        <rect width={width} height={height} fill="#e6eef8" />

        {/* Marqueurs */}
        {countries.map((country) => (
          <g key={country.id}>
            {/* Exemple d’un dot statique : à remplacer par votre projection */}
            <circle
              cx={0}
              cy={0}
              r={6}
              fill={country.color || "#0ea5e9"}
              onClick={() => onSelect?.(country)}
              style={{ cursor: "pointer" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
