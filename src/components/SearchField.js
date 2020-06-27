import React, { useState } from 'react';

export default function SearchField() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <form class="search-field">
        <label class="search-field--label" htmlFor="searchField">
          Pick a Pokemon
        </label>
        <input
          class="search-field--input"
          type="text"
          placeholder="e.g. Scyther"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </form>
    </div>
  );
}
