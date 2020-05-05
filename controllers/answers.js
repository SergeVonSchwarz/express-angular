const Answers = require('../models/Answers');
const User = require('../models/User');
const methods = require('../utils/methods');
const errorHandler = require('../utils/errorHandler');

module.exports.answers = async (req, res) => {
    try {
        const rawAnswers = await Answers.aggregate([
            {
                $lookup:
                    {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userInfo'
                    }
            }
        ]);

        const parseAnswers = rawAnswers
            .map((item) => {
                return {
                    answers: item.answers.split(',').map(Number),
                    email: item.userInfo[0].email,
                    _id: item.userInfo[0]._id,
                    trueAnswers: item.answers.split(',').reduce((a, b) => +a + +b, 0),
                    total: item.answers.split(',').map(Number).length
                }
            });

        parseAnswers.sort(methods.compareTotal);
        res.status(200).json(parseAnswers);
    } catch (err) {
        errorHandler(res, err);
    }
}

module.exports.getAnswersById = async (req, res) => {
    try {
        const answers = await Answers.find({
            user: req.params.userId
        });
        res.status(200).json(answers);
    } catch (err) {
        errorHandler(res, err);
    }
}

module.exports.create = async (req, res) => {
    try {
        const createAanswers = await Answers({
            answers: req.body.answers,
            user: req.body.user
        }).save();
        res.status(201).json(createAanswers);

    } catch (err) {
        errorHandler(res, err);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updateAnswers = await Answers.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updateAnswers);

    } catch (err) {
        errorHandler(res, err);
    }
}