const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    cName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Topics', TopicSchema); // "Topics" collection
