const Answers = require('../models/Answers');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.answers = async (req, res) => {
    try {
        const fullAnswers = await Answers.aggregate([
            {
                $lookup:
                    {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "userInfo"
                    }
            }
        ]);
        res.status(200).json(fullAnswers);
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