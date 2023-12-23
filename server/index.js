const express = require('express');
const connectToMongo = require('./db');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

connectToMongo();
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/mobiles', require('./routes/mobile-routes'));

app.get('/', (req, res) => {
  res.status(200).send("API is running");
});

app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('App listening on port ' + PORT);
})