import React from 'react';

export default function PokemonStats({ pokemon, amISuperEffective }) {
  // Capitalize name for display
  const capitalizedName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const quotes = [
    "Goddamn I'm so super effective right now!",
    'Waaaaaaaaaaaah! The Power!',
    "You're going DOWN!",
    `Can you smeeeeeeeell what the ${capitalizedName} is cookin?!`,
    'Here comes the smackdown!',
    'In your FACE!',
    'You got pwned!',
  ];
  const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomQuoteIndex];

  // Set the color of each type
  function setSpanColorByType(type) {
    switch (type) {
      case 'normal':
        return '#a8a878';
      case 'fighting':
        return '#c03028';
      case 'flying':
        return '#a890f0';
      case 'poison':
        return '#a040a0';
      case 'ground':
        return '#e0c068';
      case 'rock':
        return '#b8a038';
      case 'bug':
        return '#a8b820';
      case 'ghost':
        return '#705898';
      case 'steel':
        return '#b8b8d0';
      case 'fire':
        return '#f08030';
      case 'water':
        return '#6890f0';
      case 'grass':
        return '#78c850';
      case 'electric':
        return '#f8d030';
      case 'psychic':
        return '#f85888';
      case 'ice':
        return '#98d8d8';
      case 'dragon':
        return '#7038f8';
      case 'dark':
        return '#705848';
      case 'fairy':
        return '#ee99ac';
      case '???':
        return '#68a090';
      default:
        return '#000000';
    }
  }

  // Create an array of span elements
  const types = pokemon.types.map((item, i) => {
    const typeColor = setSpanColorByType(item.type.name);

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
    <div className={amISuperEffective ? 'super-effective--bang card' : 'card'}>
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
      <p className="super-effective--text">
        {amISuperEffective ? quote : null}
      </p>
    </div>
  );
}
