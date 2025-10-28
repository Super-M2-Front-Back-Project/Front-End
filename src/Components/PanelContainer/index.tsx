// components/PanelContainer.jsx
"use client"; // nécessaire si le contenu enfant est interactif

import React from "react";

interface PanelContainerProps {
  title: string;
  children: React.ReactNode;
}

const PanelContainer: React.FC<PanelContainerProps> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default PanelContainer;
