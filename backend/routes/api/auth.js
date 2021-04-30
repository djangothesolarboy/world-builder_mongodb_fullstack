const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { signupValidation, loginValidation } = require('../../validation');

// SIGNUP router
router.post('/signup', async (req, res) => {
    // validate data before user creation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user's email is duplicate
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists.');

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // new user creation
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ userId: user._id });
    } catch(e) {
        res.status(400).send(e);
    }
});

// LOGIN router
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user's email is in registered in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is incorrect.');

    // check if user's password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password.');

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
    res.json({
        error: null,
        user: user,
        token: token
    })
    
    req.session._id = token;
});


module.exports = router;