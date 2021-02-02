var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var LecturerSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('Lecturers', LecturerSchema);