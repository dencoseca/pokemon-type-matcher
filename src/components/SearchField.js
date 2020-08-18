import React from 'react';
import PokemonStats from './PokemonStats';
import pokeball from '../images/pokeball.png';

export default class SearchField extends React.PureComponent {
  state = {
    query: '',
    buttonText: '',
    pokemon: {},
    isThereAPokemon: false,
    loading: false,
  };

  fetchPokemon = async (query) => {
    this.setState({
      loading: true,
    });

    await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => response.json())
      .then((data) => {
        // Record pokemon data to be passed to PokemonStats and App components
        this.setState({
          pokemon: data,
        });
        const types = data.types.map((item) => item.type.name);

        // delay PokemonStats component display and passing of type info to App component
        setTimeout(() => {
          this.setState({
            loading: false,
            isThereAPokemon: true,
          });
          this.props.setPokemonTypes({
            firstOrSecond: this.props.firstOrSecond,
            types,
          });
        }, 500);
      })
      .catch((err) => {
        // catch spelling errors and display a message to user
        this.setState({
          loading: false,
        });
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
    this.fetchPokemon(this.state.query.toLowerCase());
  };

  // Control input and fetch button
  handleChange = (event) => {
    // remove super effective styling
    this.props.resetPokemonData();

    // handle input event
    if (event.target.value) {
      // Capitalize pokemon name and display in button
      const query = event.target.value;
      const capitalizedTerm = query[0].toUpperCase() + query.slice(1);

      this.setState({
        query,
        buttonText: capitalizedTerm,
        isThereAPokemon: false,
      });
    } else {
      // Reset state when user deletes input text
      this.setState({
        query: '',
        buttonText: '',
        isThereAPokemon: false,
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
            disabled={this.state.loading}
          ></input>
          <span
            className="search-field--reset-button"
            onClick={this.handleClick}
          >
            Reset
          </span>
          <button
            className="search-field--button"
            type="submit"
            disabled={this.state.loading}
          >
            {this.state.buttonText}
            {this.state.buttonText === '' ? '' : '...'} I Choose You!
          </button>
        </form>
        {
          /* If there is a result from the API display it or display pokeball */
          this.state.isThereAPokemon ? (
            <PokemonStats
              pokemon={this.state.pokemon}
              amISuperEffective={this.props.amISuperEffective}
            />
          ) : (
            <div className="pokeball-container">
              <img
                className={
                  this.state.loading ? 'pokeball pokeball--loading' : 'pokeball'
                }
                src={pokeball}
                alt="pokeball"
              />
              <button
                className="secret-randomizer"
                onClick={this.randomizePokemon}
                disabled={this.state.loading}
              ></button>
            </div>
          )
        }
      </div>
    );
  }
}
