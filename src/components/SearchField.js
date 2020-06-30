import React from 'react';
import PokemonStats from './PokemonStats';
import pokeball from '../pokeball.png';

export default class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      buttonText: '',
      pokemon: {},
      isThereAPokemon: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Get data from pokeAPI
  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.query) {
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query}`)
      .then((response) => response.json())
      .then((data) => {
        // Record pokemon data to be passed to PokemonStats component
        this.setState({
          pokemon: data,
          isThereAPokemon: true,
        });
        // Send types data back up to App component for comparison
        const types = data.types.map((item) => {
          return item.type.name;
        });

        this.props.setPokemonTypes({
          firstOrSecond: this.props.firstOrSecond,
          types: types,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Control input and button
  handleChange(event) {
    if (event.target.value) {
      // Capitalize pokemon name and display in button
      const term = event.target.value;
      const capitalizedTerm = term[0].toUpperCase() + term.slice(1);

      this.setState({
        query: term,
        buttonText: capitalizedTerm,
      });
    } else {
      // Reset state when user deletes input text
      this.setState({
        query: '',
        buttonText: '',
      });
    }
  }

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
          <button className="search-field--button" type="submit">
            {this.state.buttonText}
            {this.state.buttonText === '' ? '' : '...'} I Choose You!
          </button>
        </form>
        {
          /* If there is a result from the API display it */
          this.state.isThereAPokemon ? (
            <PokemonStats pokemon={this.state.pokemon} />
          ) : (
            <img class="pokeball" src={pokeball} alt="pokeball" />
          )
        }
      </div>
    );
  }
}
