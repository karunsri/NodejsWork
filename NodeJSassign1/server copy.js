const express = require('express');
const app = express();
app.use(express.json());

let users = [];

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware to validate user input for POST and PUT
function validateUser(req, res, next) {
  const { firstName, lastName, hobby } = req.body;
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({ message: 'Missing required fields: firstName, lastName, hobby' });
  }
  next();
}

// Route to get all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Route to get a user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

// Route to add a new user
app.post('/user', validateUser, (req, res) => {
  const { firstName, lastName, hobby } = req.body;
  const newUser = { id: (users.length + 1).toString(), firstName, lastName, hobby };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route to update an existing user by ID
app.put('/user/:id', validateUser, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { firstName, lastName, hobby } = req.body;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (hobby) user.hobby = hobby;
  res.status(200).json(user);
});

// Route to delete a user by ID
app.delete('/user/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

