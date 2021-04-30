const session = require('express-session');

module.exports = function is_logged_in(req) {
    return req.session._id && req.session._id === req.data.token;
};