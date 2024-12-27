const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to calculate GCD
app.get('/gcd', (req, res) => {
  const { num1, num2 } = req.query;

  // Convert inputs to integers
  const a = parseInt(num1, 10);
  const b = parseInt(num2, 10);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid inputs. Both inputs must be numbers.' });
  }

  // Euclid's algorithm for GCD
  function gcd(x, y) {
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }

  const result = gcd(a, b);

  res.json({ gcd: result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
