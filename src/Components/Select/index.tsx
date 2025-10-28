"use client";
import React from "react";

// On définit ici les propriétés que le composant accepte
interface SelectProps {
  label?: string; // facultatif
  options: string[]; // liste des options
  value: string; // valeur sélectionnée
  onChange: (value: string) => void; // fonction appelée lors d’un changement
}

// On utilise React.FC pour dire que Select est un composant fonctionnel avec ces props
const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">-- Sélectionnez une option --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
