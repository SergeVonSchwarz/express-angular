const express = require('express');
const controller = require('../controllers/quiz')
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.quiz);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.createAnswer);

module.exports = router;