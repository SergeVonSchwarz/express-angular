const express = require('express');
const router = express.Router();
const controller = require('../controllers/answers')

router.get('/', controller.answers);
router.get('/:userId', controller.getAnswersById);
router.post('/', controller.create);
router.patch('/:id', controller.update);

module.exports = router;