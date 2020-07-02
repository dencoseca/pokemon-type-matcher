import React from 'react';
import SearchField from './components/SearchField';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstPokemonTypes: [],
      firstPokemonWeaknesses: [],
      secondPokemonTypes: [],
      secondPokemonWeaknesses: [],
    };
    this.setPokemonTypes = this.setPokemonTypes.bind(this);
    this.resetTypeData = this.resetTypeData.bind(this);
    this.setWeaknesses = this.setWeaknesses.bind(this);
    this.fetchTypeData = this.fetchTypeData.bind(this);
    this.findPokemonWeaknesses = this.findPokemonWeaknesses.bind(this);
  }

  fetchTypeData(type) {
    return new Promise((resolve, reject) => {
      try {
        const foundWeaknesses = fetch(`https://pokeapi.co/api/v2/type/${type}`)
          .then((response) => response.json())
          .then((data) => {
            const weakTo = data.damage_relations.double_damage_from.map(
              (type) => type.name
            );
            return weakTo;
          })
          .catch((err) => {
            console.error(err);
          });
        resolve(foundWeaknesses);
      } catch (err) {
        console.error(err);
        reject();
      }
    });
  }

  async findPokemonWeaknesses(pokemonTypes) {
    return Promise.all(
      pokemonTypes.map((type) => {
        return this.fetchTypeData(type);
      })
    ).then((result) => {
      const foundWeaknesses = [];
      result.forEach((arrayOfWeaknesses) => {
        arrayOfWeaknesses.forEach((weakness) => {
          foundWeaknesses.push(weakness);
        });
      });
      return [...new Set(foundWeaknesses)];
    });
  }

  async setWeaknesses() {
    // get a list of weaknesses from pokeAPI
    const firstPokemonUnfilteredWeaknesses = await this.findPokemonWeaknesses(
      this.state.firstPokemonTypes
    );
    const secondPokemonUnfilteredWeaknesses = await this.findPokemonWeaknesses(
      this.state.secondPokemonTypes
    );

    // filter out types self-super-effective types from dual type pokemon
    const firstPokemonWeaknesses = firstPokemonUnfilteredWeaknesses.filter(
      (type) => {
        return !this.state.firstPokemonTypes.includes(type);
      }
    );
    const secondPokemonWeaknesses = secondPokemonUnfilteredWeaknesses.filter(
      (type) => {
        return !this.state.secondPokemonTypes.includes(type);
      }
    );

    // record the weaknesses
    this.setState({
      firstPokemonWeaknesses,
      secondPokemonWeaknesses,
    });
  }

  resetTypeData(firstOrSecond) {
    this.setState({
      [firstOrSecond]: [],
    });
  }

  // Collect types from search for comparison
  setPokemonTypes(pokemon) {
    this.setState({
      [pokemon.firstOrSecond]: pokemon.types,
    });
    if (
      this.state.firstPokemonTypes.length > 0 &&
      this.state.secondPokemonTypes.length > 0
    ) {
      this.setWeaknesses();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="header">
            <h1 className="header--title">Pokemon Type Matcher</h1>
            <p className="header--subtitle">
              Choose two pokemon and see who is super effective!
            </p>
          </header>
          <div className="search-fields">
            <SearchField
              firstOrSecond="firstPokemonTypes"
              setPokemonTypes={this.setPokemonTypes}
              resetTypeData={this.resetTypeData}
            />
            <div className="vs-column">
              <p className="vs-column--vs">VS</p>
            </div>
            <SearchField
              firstOrSecond="secondPokemonTypes"
              setPokemonTypes={this.setPokemonTypes}
              resetTypeData={this.resetTypeData}
            />
          </div>
        </div>
      </div>
    );
  }
}
