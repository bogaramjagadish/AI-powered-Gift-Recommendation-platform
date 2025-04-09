const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Mock gift suggestions based on personality, preferences, and occasion
app.post('/api/gift-suggestions', (req, res) => {
  const { personality, preferences, occasion } = req.body;

  // Simple logic for gift suggestions (you can expand this)
  let suggestions = [];
  if (personality === 'Adventurous') {
    suggestions.push('Camping gear', 'Travel voucher');
  } else if (personality === 'Creative') {
    suggestions.push('Art supplies', 'DIY craft kit');
  } else {
    suggestions.push('Gift card', 'Personalized mug');
  }

  if (preferences.includes('Tech')) {
    suggestions.push('Smartwatch', 'Wireless earbuds');
  }
  if (preferences.includes('Reading')) {
    suggestions.push('Bestseller book', 'Kindle');
  }
  if (preferences.includes('Personalized')) {
    suggestions.push('Customized jewelry', 'Engraved photo frame');
  }

  if (occasion === 'Birthday') {
    suggestions.push('Birthday cake', 'Party decorations');
  } else if (occasion === 'Anniversary') {
    suggestions.push('Romantic dinner voucher', 'Couple’s spa day');
  }

  res.json({ suggestions: [...new Set(suggestions)] }); // Remove duplicates
});

// Start the server
const PORT = 3001; // Use a different port to avoid conflict with React
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});