import React from 'react';
import SearchField from './components/SearchField';

export default class App extends React.Component {
  state = {
    firstPokemonTypes: [],
    firstPokemonWeaknesses: [],
    firstPokemonIsSuperEffective: false,
    secondPokemonTypes: [],
    secondPokemonWeaknesses: [],
    secondPokemonIsSuperEffective: false,
    spellBetter: false,
  };

  setSpellBetter = (bool) => {
    this.setState({
      spellBetter: bool,
    });
  };

  setSuperEffectivePokemon = () => {
    const firstPokemonIsSuperEffective = this.state.firstPokemonTypes.some(
      (type) => this.state.secondPokemonWeaknesses.includes(type)
    );
    const secondPokemonIsSuperEffective = this.state.secondPokemonTypes.some(
      (type) => this.state.firstPokemonWeaknesses.includes(type)
    );
    this.setState({
      firstPokemonIsSuperEffective,
      secondPokemonIsSuperEffective,
    });
  };

  fetchTypeData = (type) => {
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
  };

  findPokemonWeaknesses = async (pokemonTypes) => {
    return Promise.all(
      pokemonTypes.map((type) => this.fetchTypeData(type))
    ).then((result) => {
      const foundWeaknesses = [];
      result.forEach((arrayOfWeaknesses) => {
        arrayOfWeaknesses.forEach((weakness) => {
          foundWeaknesses.push(weakness);
        });
      });
      return [...new Set(foundWeaknesses)];
    });
  };

  setWeaknesses = async () => {
    // get a list of weaknesses from pokeAPI
    const firstPokemonUnfilteredWeaknesses = await this.findPokemonWeaknesses(
      this.state.firstPokemonTypes
    );
    const secondPokemonUnfilteredWeaknesses = await this.findPokemonWeaknesses(
      this.state.secondPokemonTypes
    );

    // filter out self-super-effective types from dual type pokemon
    const firstPokemonWeaknesses = firstPokemonUnfilteredWeaknesses.filter(
      (type) => !this.state.firstPokemonTypes.includes(type)
    );
    const secondPokemonWeaknesses = secondPokemonUnfilteredWeaknesses.filter(
      (type) => !this.state.secondPokemonTypes.includes(type)
    );

    // record the weaknesses
    this.setState({
      firstPokemonWeaknesses,
      secondPokemonWeaknesses,
    });
    this.setSuperEffectivePokemon();
  };

  // reset all state data for a particular pokemon
  resetPokemonData = (firstOrSecond) => {
    if (firstOrSecond === 'firstPokemonTypes') {
      this.setState({
        firstPokemonTypes: [],
        firstPokemonWeaknesses: [],
        firstPokemonIsSuperEffective: false,
        secondPokemonIsSuperEffective: false,
        spellBetter: false,
      });
    } else {
      this.setState({
        secondPokemonTypes: [],
        secondPokemonWeaknesses: [],
        firstPokemonIsSuperEffective: false,
        secondPokemonIsSuperEffective: false,
        spellBetter: false,
      });
    }
  };

  // Collect types from search for comparison
  setPokemonTypes = (pokemon) => {
    this.setState({
      [pokemon.firstOrSecond]: pokemon.types,
    });
    if (
      this.state.firstPokemonTypes.length > 0 &&
      this.state.secondPokemonTypes.length > 0
    ) {
      this.setWeaknesses();
    }
  };

  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="header--title">Pokemon Type Matcher</h1>
          <p className="header--subtitle">
            Choose two pokemon and see who is super effective!
          </p>
          <div
            className="spell-better"
            style={
              this.state.spellBetter
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            Spell Better!
          </div>
        </header>
        <div className="search-fields">
          <SearchField
            firstOrSecond="firstPokemonTypes"
            setPokemonTypes={this.setPokemonTypes}
            resetPokemonData={this.resetPokemonData}
            amISuperEffective={
              this.state.firstPokemonIsSuperEffective ? true : false
            }
            setSpellBetter={this.setSpellBetter}
            spellBetter={this.state.spellBetter}
          />
          <div className="vs-column">
            <p className="vs-column--vs">VS</p>
          </div>
          <SearchField
            firstOrSecond="secondPokemonTypes"
            setPokemonTypes={this.setPokemonTypes}
            resetPokemonData={this.resetPokemonData}
            amISuperEffective={
              this.state.secondPokemonIsSuperEffective ? true : false
            }
            setSpellBetter={this.setSpellBetter}
            spellBetter={this.state.spellBetter}
          />
        </div>
      </div>
    );
  }
}
