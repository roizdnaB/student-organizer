var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    ownerId: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Courses', CourseSchema);