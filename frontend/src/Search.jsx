import React from 'react';
import './Search.css';

const Search = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const presetProfiles = [
    { name: 'Adam Binks', url: 'https://www.linkedin.com/in/adam-binks/' },
    { name: 'Eli Lifland', url: 'https://www.linkedin.com/in/eli-lifland/' },
    { name: 'Aaron Ho', url: 'https://www.linkedin.com/in/aaron-ho/' },
    { name: 'Misha Yagugdin', url: 'https://x.com/mishayagudin/' },
    // { name: 'Simon Wisdom', url: 'https://www.linkedin.com/in/iamsimonwisdom/' }
  ];

  return (
    <div className="search">
      <div className="introduction">
        <h2 className="text-lg font-semibold mb-2">Welcome to the Targeted Persuasion Toolbox.</h2>
        <p> This demo showcases how publicly available data and an LLM can be used to launch targeted persuasive messaging, potentially for malicious purposes. </p>
        <p>Choose a person (‘target’) to gather information on and launch a targeted persuasion campaign.</p>
      </div>
      <div className="instructions">
      <h2 className="text-lg font-semibold mb-2">Select a Target from Sage:</h2>
      </div>
      <div className="search-row mb-4">
        {presetProfiles.map((profile) => (
          <button
            key={profile.url}
            onClick={() => setSearchTerm(profile.url)}
            className="profile-button"
          >
            {profile.name}
          </button>
        ))}
      </div>
      <div className="instructions">
        <p>Or enter a target with a personal LinkedIn, Twitter, or Facebook profile URL:</p>
      </div>
      <div className="search-row">
        <input
          type="text"
          placeholder="Enter LinkedIn URL or user ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Analyze Profile</button>
      </div>
    </div>
  );
};

export default Search;
