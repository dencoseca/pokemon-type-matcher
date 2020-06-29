import React from 'react';
import SearchField from './components/SearchField';

export default function App() {
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
          <SearchField />
          <SearchField />
        </div>
      </div>
    </div>
  );
}
