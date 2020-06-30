import React from 'react';
import SearchField from './components/SearchField';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstPokemonTypes: [],
      secondPokemonTypes: [],
    };
    this.setPokemonTypes = this.setPokemonTypes.bind(this);
  }
  setPokemonTypes(pokemon) {
    this.setState({
      [pokemon.firstOrSecond]: pokemon.types,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="header">
            <h1 className="header--title">Pokemon Type Matcher</h1>
            <p className="header--subtitle">
              Choose two pokemon and see who comes out on top!
            </p>
          </header>
          <div className="search-fields">
            <SearchField
              firstOrSecond="firstPokemonTypes"
              setPokemonTypes={this.setPokemonTypes}
            />
            <SearchField
              firstOrSecond="secondPokemonTypes"
              setPokemonTypes={this.setPokemonTypes}
            />
          </div>
        </div>
      </div>
    );
  }
}
