"use client";

import React from "react";
import "./style.css";

interface InputFieldProps {
  label: string; // Le texte du label
  id: string; // L'id du champ (lié au label)
  type?: string; // Type du champ (text, email, password, etc.)
  value: string; // Valeur actuelle
  onChange: (value: string) => void; // Fonction appelée à chaque changement
  placeholder?: string; // Texte d’exemple
  required?: boolean; // Champ obligatoire ou non
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="input-field-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="input-field"
      />
    </div>
  );
};

export default InputField;
