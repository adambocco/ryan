const express = require('express');
const router = express.Router();

// const { check, validationResult} = require("express-validator/check");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth")
// const authRedirect = require("../middleware/authRedirect")
// const User = require("../models/user");

router.get('/', function(req, res, next) {
    console.log("API CONTACTED");
    req.query 

    res.json({"res":'respond with a resource'});
  });

module.exports = router;