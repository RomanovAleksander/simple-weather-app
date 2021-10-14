import React, { useState } from 'react';
import './search.css';

export default function Search({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    let query = e.target.value;
    setQuery(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.toLowerCase() === 'kyiv') {
      onSubmit('kiev');
    } else {
      onSubmit(query.toLowerCase());
    }
    setQuery('');
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
            minLength={1}
            required
          />
          <button type="submit" className="search-button"></button>
        </div>
      </form>
  )
}
