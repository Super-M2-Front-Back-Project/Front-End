// app/components/Button.jsx
'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}
<p>bbrr</p>
const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded
        bg-blue-600 text-white
        hover:bg-blue-700 disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
    
  );
};

export default Button;
