// eslint-disable-next-line import/no-unresolved
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

mongoose.Promise = global.Promise;
if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://root:password@mongo:27017/bookAPI_Test?authSource=admin', { useNewUrlParser: true, user: 'root', pass: 'password' }).catch(err => console.log('cant connect' + err));
} else {
  console.log('This is production mongo');
  const db = mongoose.connect('mongodb://root:password@mongo:27017/bookAPI?authSource=admin', { useNewUrlParser: true, user: 'root', pass: 'password' }).catch(err => console.log('cant connect' + err));
}
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', bookRouter);


app.get('/', (req, res) => {
  res.send('Welcome221!');
});

app.server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${port}`);
});

module.exports = app;
