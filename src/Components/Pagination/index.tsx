"use client";
import React from "react";
import "./style.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination-container">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-button ${page === currentPage ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >{page}</button>
            ))}
        </div>
    );
}