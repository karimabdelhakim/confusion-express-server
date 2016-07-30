// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var feedSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mychannel: {
        type: String,
        default: "don't contact me"
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        areaCode: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    comments: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var feedbacks = mongoose.model('Feedback', feedSchema);

// make this available to our Node applications
module.exports = feedbacks;