const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');



const User = require("../../models/user");
const userController = require('../../controllers/user')


router.get('/', function (req, res, next) {
  console.log("API CONTACTED");

  res.json({ "res": 'respond with a resource' });
});

router.post('/register', userController.createUser);


router.post('/login', async function (req, res, next) {

});

module.exports = router;