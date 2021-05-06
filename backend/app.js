const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const session = require('express-session');

const routes = require('./routes');

dotenv.config();

// connect to database
mongoose
.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connected.'))
.catch(err => console.log(err))

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// set _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            sameSite: 'Lax',
            httpOnly: true,
        },
    })
);

app.use(routes) // connects all routes

app.get('/', (req, res) => res.send('Working!'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));