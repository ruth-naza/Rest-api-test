const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
 

app.use(bodyParser.json());
//Import Routes
const usersRoute = require('./routes/users');

app.use('/users', usersRoute);

//MongoDB Atlas connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected to DB');
});



const PORT = process.env.port || 3000

app.listen(PORT, () => {
  console.info(`Server has started on ${PORT}`)
});