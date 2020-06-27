import React, { useState } from 'react';
import SearchField from './components/SearchField';

function App() {

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 class="header--title">Pokemon Type Matcher</h1>
          <p class="header--subtitle">
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

export default App;
