const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

// sends a JWT cookie
const setTokenCookie = (res, user) => {
    // create token
    const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET,
        { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) }, // 604800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // set the token cookie
    res.cookie('token', token, {
        maxAge: process.env.JWT_EXPIRES_IN * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax',
    });
    console.log('token ->', token)
    return token;
}

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, process.env.SECRET, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findById({ _id: id });
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// if there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };