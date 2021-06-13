const createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');


const cors = require('cors');
const angularRoute = path.join(__dirname, "dist/newsletter");
const apiRouter = require('./api/auth/users');

var app = express();

const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter)

app.use(express.static(angularRoute));

app.all('/*', (req, res) => {
  console.log("Rerouting angular");
  res.sendFile("index.html", {root: angularRoute});
});


// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const db = require("./config/db.config");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


module.exports = app;
