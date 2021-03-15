const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test',  { useNewUrlParser: true , useUnifiedTopology: true } );

const db = mongoose.connection
db.on('error', (error) => {
  console.log(error);
});

db.once('open', () => {
  console.log('Connected to database');
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
})