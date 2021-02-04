var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
	zoomLink: {
		type: String
	},
    lecturers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturers"
      }
    ]
});

module.exports = mongoose.model('Courses', CourseSchema);
