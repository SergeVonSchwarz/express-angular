const Answers = require('../models/Answers');
const errorHandler = require('../utils/errorHandler');
const questions = require('../questions.json');

module.exports.quiz = async (req, res) => {
    try {
        const answers = await Answers.find({
            user: req.user.id
        });
        res.status(200).json({
            answers,
            questions
        });
    } catch(err) {
        errorHandler(res, err);
    }
}

module.exports.createAnswer = async (req, res) => {
    try {
        const answers = await Answers.find({
            user: req.user.id
        });

        console.log('Answers: ', answers);

        /*res.status(200).json({
            answers
        });*/

    } catch(err) {
        errorHandler(res, err);
    }
}