require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if(passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, process.env.JWT, { expiresIn: 60 * 60 });

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Password error!'
            });
        }

    } else {
        res.status(404).json({
            message: 'User not found!'
        });
    }
}

module.exports.register = async (req, res) => {

    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        res.status(409).json({
            message: 'Email is reserved!'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch(err) {
            errorHandler(res, err);
        }
    }
}