require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const authRoutes = require('./routes/auth');
const answersRoutes = require('./routes/answers');
const quizRoutes = require('./routes/quiz');
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/answers', answersRoutes);
app.use('/api/quiz', quizRoutes);

module.exports = app;