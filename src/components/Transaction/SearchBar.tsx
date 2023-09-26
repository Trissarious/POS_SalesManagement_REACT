import React, { useState } from 'react';
import SearchBar from './SearchBar';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    // Perform the search operation with the 'query' parameter
    console.log(`Searching for: ${query}`);
    // Replace this with your actual search logic
  };

  return (
    <div>
      <h1>Simple Search App</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default App;