import React from 'react';

export default function PokemonStats({ pokemon }) {
  // Capitalize name for display
  const name = pokemon.name;
  const capitalizedName = name[0].toUpperCase() + name.slice(1);

  // Set the color of each type
  function setTypeSpanColor(type) {
    let spanColor;
    switch (type) {
      case 'normal':
        spanColor = '#a8a878';
        break;
      case 'fighting':
        spanColor = '#c03028';
        break;
      case 'flying':
        spanColor = '#a890f0';
        break;
      case 'poison':
        spanColor = '#a040a0';
        break;
      case 'ground':
        spanColor = '#e0c068';
        break;
      case 'rock':
        spanColor = '#b8a038';
        break;
      case 'bug':
        spanColor = '#a8b820';
        break;
      case 'ghost':
        spanColor = '#705898';
        break;
      case 'steel':
        spanColor = '#b8b8d0';
        break;
      case 'fire':
        spanColor = '#f08030';
        break;
      case 'water':
        spanColor = '#6890f0';
        break;
      case 'grass':
        spanColor = '#78c850';
        break;
      case 'electric':
        spanColor = '#f8d030';
        break;
      case 'psychic':
        spanColor = '#f85888';
        break;
      case 'ice':
        spanColor = '#98d8d8';
        break;
      case 'dragon':
        spanColor = '#7038f8';
        break;
      case 'dark':
        spanColor = '#705848';
        break;
      case 'fairy':
        spanColor = '#ee99ac';
        break;
      default:
        spanColor = '#000000';
    }

    return spanColor;
  }

  // Create an array of span elements
  const types = pokemon.types.map((item, i) => {
    const typeColor = setTypeSpanColor(item.type.name);

    return (
      <span
        key={i}
        className="card--type"
        style={{ backgroundColor: typeColor, color: '#ffffff' }}
      >
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
