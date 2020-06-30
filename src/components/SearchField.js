import React from 'react';
import PokemonStats from './PokemonStats';

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

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.query) {
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pokemon: data,
          isThereAPokemon: true,
        });
        // ///////////////////?//////
        const types = data.types.map((item) => {
          return item.type.name;
        });

        this.props.setPokemonTypes({
          firstOrSecond: this.props.firstOrSecond,
          types: types,
        });
        // //////////////////////////////
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    if (event.target.value) {
      const term = event.target.value;
      const capitalizedTerm = term[0].toUpperCase() + term.slice(1);

      this.setState({
        query: term,
        buttonText: capitalizedTerm,
      });
    } else {
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
        {this.state.isThereAPokemon ? (
          <PokemonStats pokemon={this.state.pokemon} />
        ) : null}
      </div>
    );
  }
}
