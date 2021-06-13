const User = require('../models/user');
const jwt = require("jsonwebtoken");

const secret = require("../config/jwt.config").secret;

exports.createUser = async (req, res, next) => {

    let user = await User.findOne({email: req.body.email});

    if (user) {
        console.log("User exixsts, exiting ");
        res.json({status:0, error:"User already exists"});
    }
    else {

        const userObject = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        user = new User(userObject);

        user.save((err) => {
            if (err) {
                return next(err);
            }

            // jwt expects a plain object, that's why I pass userObject instead of user
            let token = jwt.sign(userObject, secret)
            res.json({
                status: 1,
                "data": userObject,
                "token": token
            });
        });
    }
};

