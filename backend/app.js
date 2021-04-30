const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

// import routes
const charRouter = require('./routes/api/characters');
const authRouter = require('./routes/api/auth');

dotenv.config();

// connect to database
mongoose
.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connected.'))
.catch(err => console.log(err))

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.get('/', (req, res) => res.send('Working!'));

// route middleware
app.use('/api/characters', charRouter);
app.use('/api/users', authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));