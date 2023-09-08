const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Define your user_id (full_name_dob)
const user_id = "SM_FAHAD_JAAN_16092002";
const email = "sj6170@srmist.edu.in";
const roll_number = "RA2011003011150";

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    let highest_alphabet = [];
    if (alphabets.length > 0) {
      highest_alphabet = [alphabets.reduce((a, b) => a > b ? a : b)];
    }

    const response = {
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
