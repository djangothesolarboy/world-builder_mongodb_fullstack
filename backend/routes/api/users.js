const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const { signupValidation, loginValidation } = require('../../validation');
const { setTokenCookie, restoreUser } = require('../auth');

// FIXME signup not working -> validation(email, password match)
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
    } catch (e) {
        res.status(400).send(e);
    }
});

// LOGIN router
router.post('/login',
    asyncHandler(async (req, res) => {
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check if user's email is in registered in database
        const emailCheck = await User.findOne({ email: req.body.email });
        if (!emailCheck) return res.status(400).send('Email or password is incorrect.');

        // check if user's password is correct
        const validPass = await bcrypt.compare(req.body.password, emailCheck.password);
        if (!validPass) return res.status(400).send('Invalid password.');

        const user = await User.findOne({ email: req.body.email });

        setTokenCookie(res, user);

        return res.json({ user });
    })
);

// LOGOUT router
router.delete('/logout',
    (req, res) => {
        res.clearCookie('token');
        req.session.destroy();
        return res.json({ message: 'Logout success.' });
    });

// RESTORE user router
router.get('/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                _id: user._id
            });
        } else return res.json({});
    })
)

module.exports = router;