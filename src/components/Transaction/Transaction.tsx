import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  return (
    <div>
            <div className = "title">
                <h1>Search Bar test</h1>
            </div>
            <div className="input_wrapper">
                <input type="text"/>
                <button>Search</button>
            </div>
        </div>
  );
};

export default SearchBar;