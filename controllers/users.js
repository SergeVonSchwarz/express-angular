const Users = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.users = async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.status(200).json(allUsers);
    } catch (err) {
        errorHandler(res, err);
    }
}