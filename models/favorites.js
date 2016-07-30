// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var favSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var favorites = mongoose.model('Favorite', favSchema);

// make this available to our Node applications
module.exports = favorites;