// import express from "express"; ---->ES module
const express = require('express');

const app = express();

app.use(express.json());

let users = [
    // { id: '1', firstName: 'Anshika', lastName: 'Agarwal', hobby: 'Teaching' }
  ];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


function validateUser(req, res, next) {
  const { firstName, lastName, hobby } = req.body;
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({ message: 'Missing required fields: firstName, lastName, hobby' });
  }
  next();
}

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'USER NOT FOUND' });
  }
  res.status(200).json(user);
});

// route to add new user
app.post('/user', validateUser, (req, res) => {
  const { firstName, lastName, hobby } = req.body;
  const newUser = { id: (users.length + 1).toString(), firstName, lastName, hobby };
  users.push(newUser);
  res.status(201).json(newUser);
});

// route to update existing user by id
app.put('/user/:id', validateUser, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  const { firstName, lastName, hobby } = req.body;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (hobby) user.hobby = hobby;
  res.status(200).json(user);
});

app.delete('/user/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted successfully' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

