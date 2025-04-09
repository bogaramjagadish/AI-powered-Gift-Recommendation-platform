import React, { useState } from 'react';
import axios from 'axios';
import './GiftForm.css';

const GiftForm = () => {
  const [personality, setPersonality] = useState('Adventurous');
  const [preferences, setPreferences] = useState([]);
  const [occasion, setOccasion] = useState('Birthday');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handlePreferencesChange = (e) => {
    const value = e.target.value;
    setPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    try {
      const response = await axios.post('http://localhost:3001/api/gift-suggestions', {
        personality,
        preferences,
        occasion,
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="gift-form-container">
      <h1>🎁 Personalized Gift Recommendation Platform</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipient's Personality:</label>
          <select value={personality} onChange={(e) => setPersonality(e.target.value)}>
            <option value="Adventurous">Adventurous 🌄</option>
            <option value="Creative">Creative 🎨</option>
            <option value="Practical">Practical 🛠️</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferences (select all that apply):</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Reading"
                checked={preferences.includes('Reading')}
                onChange={handlePreferencesChange}
              />
              📚 Reading
            </label>
            <label>
              <input
                type="checkbox"
                value="Tech"
                checked={preferences.includes('Tech')}
                onChange={handlePreferencesChange}
              />
              💻 Tech
            </label>
            <label>
              <input
                type="checkbox"
                value="Personalized"
                checked={preferences.includes('Personalized')}
                onChange={handlePreferencesChange}
              />
              🎀 Personalized
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Occasion:</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option value="Birthday">Birthday 🎂</option>
            <option value="Anniversary">Anniversary 💍</option>
            <option value="Holiday">Holiday 🎄</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Fetching Suggestions...' : 'Get Gift Suggestions 🎉'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <h2>🎁 Gift Suggestions:</h2>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="Ai powered-search">
        <p>For more gift ideas, search here:</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for more gifts..." />
          <button>🔍</button>
        </div>
        <p className="OpenAi-brand">Powered by ChatGpt</p>
      </div>
    </div>
  );
};

export default GiftForm;