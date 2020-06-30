import React from 'react';

export default function PokemonStats({ pokemon }) {
  // Capitalize name for display
  const name = pokemon.name;
  const capitalizedName = name[0].toUpperCase() + name.slice(1);

  // Create a span element for each type
  const types = pokemon.types.map((item, i) => {
    return (
      <span key={i} className="card--type">
        {item.type.name}
      </span>
    );
  });

  return (
    <div className="card">
      <div className="card--head">
        <span className="card--number">No. {pokemon.id}</span>
        <h2 className="card--name">{capitalizedName}</h2>
      </div>
      <div className="card--body">
        <img
          className="card--sprite"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="card--foot">{types}</div>
    </div>
  );
}
