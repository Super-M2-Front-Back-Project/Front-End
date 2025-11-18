"use client";
import React from "react";

import "./style.css";

interface OrderByProps {
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
}

export function OrderBy({
    options,
    selectedOption,
    onChange,
}: OrderByProps) {
    return (
        <div className="order-by-container">
            <label htmlFor="order-by-select" className="order-by-label">
                Trier par...
            </label>

            <select
                id="order-by-select"
                className="order-by-select"
                value={selectedOption}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                            {option}
                    </option>
                ))}
            </select>
        </div>
    );
}