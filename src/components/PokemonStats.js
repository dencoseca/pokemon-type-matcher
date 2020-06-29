import React from 'react';

export default function PokemonStats({ pokemon }) {
  const types = pokemon.types.map((type, i) => {
    return (
      <span key={i} className="card--type">
        {type.type.name}
      </span>
    );
  });

  return (
    <div className="card">
      <div className="card--head">
        <span className="card--number">No. {pokemon.id}</span>
        <h2 className="card--name">{pokemon.name}</h2>
      </div>
      <img
        className="card--sprite"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="card--types">{types}</div>
    </div>
  );
}
