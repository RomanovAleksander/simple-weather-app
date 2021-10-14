import React, { useState } from 'react';
import './search.css';

export default function Search({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    let query = e.target.value;
    setQuery(query.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query.toLowerCase());
  };

  return (
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter the city"
            value={query}
            onChange={handleChange}
          />
          <button type="submit" className="search-button"></button>
        </div>
      </form>
  )
}
