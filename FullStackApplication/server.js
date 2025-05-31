const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const users = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.status(201).send('User registered');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.status(200).send('Login successful');
  else res.status(401).send('Invalid credentials');
});

app.listen(5000, () => console.log('Server running on port 5000'));
