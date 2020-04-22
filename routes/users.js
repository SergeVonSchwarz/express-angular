const express = require('express');
const router = express.Router();
const controller = require('../controllers/users')

router.get('/', controller.users);
//router.get('/:userId', controller.getAnswersById);

module.exports = router;