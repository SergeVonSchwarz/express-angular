const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answersSchema = new Schema({
    answers: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectID
    }
});

module.exports = mongoose.model('answers', answersSchema);