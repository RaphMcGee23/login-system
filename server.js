require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true , useUnifiedTopology: true } );

//Loads index.html
app.use('/', express.static('public'));

const db = mongoose.connection
db.on('error', (error) => {
  console.log(error);
});

db.once('open', () => {
  console.log('Connected to database');
})

app.use(express.json());

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
})