"use client";

import React from "react";
import "./style.css";

interface DisplayFieldProps {
  label: string;
  value: string;
}

/**
 * Composant pour afficher un champ en lecture seule
 * Reprend le style des InputField mais sans border et non cliquable
 */
const DisplayField: React.FC<DisplayFieldProps> = ({ label, value }) => {
  return (
    <div className="display-field-container">
      <label className="display-field-label">{label}</label>
      <div className="display-field-value">{value}</div>
    </div>
  );
};

export default DisplayField;
