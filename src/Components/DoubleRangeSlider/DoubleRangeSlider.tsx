"use client";

import React, { useState, useEffect, useRef } from "react";

type DoubleRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  onChange?: (values: [number, number]) => void;
  className?: string;
};

export default function DoubleRangeSlider({
  min,
  max,
  step = 1,
  onChange,
  className = "",
}: DoubleRangeSliderProps) {
  const [value1, setValue1] = useState(min);
  const [value2, setValue2] = useState(max);
  const trackRef = useRef<HTMLDivElement>(null);

  const minGap = 0;

  // Mettre à jour la couleur du slider
  useEffect(() => {
    if (!trackRef.current) return;
    const percent1 = ((value1 - min) / (max - min)) * 100;
    const percent2 = ((value2 - min) / (max - min)) * 100;
    trackRef.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }, [value1, value2, min, max]);

  // Appel du callback à chaque changement
  useEffect(() => {
    onChange?.([value1, value2]);
  }, [value1, value2, onChange]);

  const handleValue1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), value2 - minGap);
    setValue1(val);
  };

  const handleValue2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), value1 + minGap);
    setValue2(val);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Affichage des valeurs */}
      <div className="flex justify-between mb-2">
        <span>{value1}</span>
        <span>{value2}</span>
      </div>

      <div className="relative h-4 w-full">
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute h-2 w-full rounded-lg bg-gray-300"
        ></div>

        {/* Curseur 1 */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value1}
          onChange={handleValue1}
          className="absolute w-full pointer-events-none appearance-none bg-transparent"
          style={{ zIndex: 2 }}
        />

        {/* Curseur 2 */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value2}
          onChange={handleValue2}
          className="absolute w-full pointer-events-none appearance-none bg-transparent"
          style={{ zIndex: 3 }}
        />
      </div>
    </div>
  );
}
