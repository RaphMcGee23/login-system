const express = require('express');
const router = express.Router();

const Usernames = require('../models/login');

//Get all
router.get('/', async (req, res) => {
  try {
    const accounts = await Usernames.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get user
router.get('/:id', getUser, async (req, res) => {
  res.send({ username: res.user.username, password: res.user.password, email: res.user.emaill, timestamp: res.user.timestamp });
});

//Create user
router.post('/', async (req, res) => {
  const user = new Usernames({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Updating one user
router.patch('/:id', getUser, async (req, res) => {
  if(req.body.username !== null){
    res.user.username = req.body.username;
  }
  if(req.body.password !== null){
    res.user.password = req.body.password;
  }
  if(req.body.email !== null){
    res.user.email = req.body.email;
  }
  try{
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  }catch(error){
    res.status(400).json({message: error.message});
  }
});

//Delete user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await Usernames.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;