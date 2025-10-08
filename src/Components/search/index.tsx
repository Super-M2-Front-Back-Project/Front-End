"use client"

import React, { useState } from "react"
import "./style.css"

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export default function SearchBar({
  placeholder = "Rechercher...",
  onSearch = () => {},
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`search-bar ${className}`} // classe principale
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input" // input avec nouvelle classe
      />
      <button type="submit" className="search-button"> 
        <img src="/assets/search.svg" alt="Rechercher" />
      </button>
    </form>
  )
}
