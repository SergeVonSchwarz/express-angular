const Answers = require('../models/Answers');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.answers = async (req, res) => {
    try {
        const allAnswers = await Answers.find();
        res.status(200).json(allAnswers);
    } catch (err) {
        errorHandler(res, err);
    }
}

module.exports.moreAnswers = async (req, res) => {
    try {
        const allAnswers = await Answers.find();

        /****/
        const allUsers = await User.find();
        const fullData = allAnswers.map((answer) => {
            let user = allUsers.find((item) => String(item._id) === String(answer.user));
            return {
                answers: answer.answers,
                user: user.email
            }
        });
        /****/

        //res.status(200).json(allAnswers);
        res.status(200).json(fullData);
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
    } catch(err) {
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

    } catch(err) {
        errorHandler(res, err);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updateAnswers = await Answers.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateAnswers);

    } catch(err) {
        errorHandler(res, err);
    }
}