import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        setProfileData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Profile Finder</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {profileData && (
        <div className="profile-container">
          <img src={profileData.avatar_url} alt="Profile" />
          <h2>{profileData.login}</h2>
          <p>{profileData.bio}</p>
          <div className="details">
            <p><strong>Followers:</strong> {profileData.followers}</p>
            <p><strong>Following:</strong> {profileData.following}</p>
            <p><strong>Repositories:</strong> {profileData.public_repos}</p>
            {profileData.location && <p><strong>Location:</strong> {profileData.location}</p>}
          </div>
          <a href={profileData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
