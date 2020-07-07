import React from 'react';
import PokemonStats from './PokemonStats';
import pokeball from '../images/pokeball.png';

export default class SearchField extends React.PureComponent {
  state = {
    query: '',
    buttonText: '',
    pokemon: {},
    isThereAPokemon: false,
  };

  fetchPokemon = async (query) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => response.json())
      .then((data) => {
        // Record pokemon data to be passed to PokemonStats component
        this.setState({
          pokemon: data,
          isThereAPokemon: true,
        });
        // Send types data back up to App component for comparison
        const types = data.types.map((item) => item.type.name);

        this.props.setSpellBetter(false);
        this.props.setPokemonTypes({
          firstOrSecond: this.props.firstOrSecond,
          types,
        });
      })
      .catch((err) => {
        // catch spelling errors and display a message to user
        console.error(err);
        if (!this.props.spellBetter) {
          this.props.setSpellBetter(true);
          setTimeout(() => {
            this.props.setSpellBetter(false);
          }, 2000);
        }
      });
  };

  // fill data with a random pokemon
  randomizePokemon = () => {
    // empty any previous pokemon form inpuit and button labels
    this.setState({
      query: '',
      buttonText: '',
    });

    // generate and fetch a random pokemon
    const randomNum = Math.floor(Math.random() * 807 + 1);
    this.fetchPokemon(randomNum);
  };

  // reset pokemon data
  handleClick = () => {
    this.setState({
      query: '',
      buttonText: '',
      pokemon: {},
      isThereAPokemon: false,
    });
    this.props.resetPokemonData(this.props.firstOrSecond);
  };

  // Get data from pokeAPI
  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.query) {
      return;
    }
    this.fetchPokemon(this.state.query);
  };

  // Control input and fetch button
  handleChange = (event) => {
    if (event.target.value) {
      // Capitalize pokemon name and display in button
      const query = event.target.value;
      const capitalizedTerm = query[0].toUpperCase() + query.slice(1);

      this.setState({
        query,
        buttonText: capitalizedTerm,
      });
    } else {
      // Reset state when user deletes input text
      this.setState({
        query: '',
        buttonText: '',
      });
    }
  };

  render() {
    return (
      <div className="pokemon-column">
        <form className="search-field" onSubmit={this.handleSubmit}>
          <label className="search-field--label" htmlFor="searchField">
            Pick a Pokemon
          </label>
          <input
            className="search-field--input"
            type="text"
            name="query"
            placeholder="e.g. Scyther"
            value={this.state.query}
            onChange={this.handleChange}
          ></input>
          <span
            className="search-field--reset-button"
            onClick={this.handleClick}
          >
            Reset
          </span>
          <button className="search-field--button" type="submit">
            {this.state.buttonText}
            {this.state.buttonText === '' ? '' : '...'} I Choose You!
          </button>
        </form>
        {
          /* If there is a result from the API display it */
          this.state.isThereAPokemon ? (
            <PokemonStats
              pokemon={this.state.pokemon}
              amISuperEffective={this.props.amISuperEffective}
            />
          ) : (
            <div className="pokeball-container">
              <img className="pokeball" src={pokeball} alt="pokeball" />
              <button
                className="secret-randomizer"
                onClick={this.randomizePokemon}
              ></button>
            </div>
          )
        }
      </div>
    );
  }
}
