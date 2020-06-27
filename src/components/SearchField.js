import React, { useState } from 'react';

export default function SearchField() {
  const [query, setQuery] = useState('');

  const searchForPokemon = async (e) => {
    e.preventDefault();
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    try {
      const response = await fetch(url);
      const pokemon = await response.json();
      console.log(pokemon);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="search-field" onSubmit={searchForPokemon}>
        <label className="search-field--label" htmlFor="searchField">
          Pick a Pokemon
        </label>
        <input
          className="search-field--input"
          type="text"
          name="query"
          placeholder="e.g. Scyther"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className="search-field--button" type="submit">
          {query}
          {query === '' ? '' : '...'} I Choose You!
        </button>
      </form>
    </div>
  );
}
