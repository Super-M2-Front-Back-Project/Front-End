"use client";
import React from "react";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange, placeholder }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
