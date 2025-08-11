import React from "react";

const SearchBar = ({ searchTerm, onSearchChange, filter, onFilterChange }) => {
  return (
    <div className="search-bar">
      <div className="search-container">
        <input type="text" placeholder="🔍 Cari catatan..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="search-input" />
      </div>

      <div className="filter-container">
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)} className="filter-select">
          <option value="all">📋 Semua Catatan</option>
          <option value="important">⭐ Catatan Penting</option>
          <option value="completed">✅ Catatan Selesai</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
