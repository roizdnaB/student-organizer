module.exports = function(app) {
    var lecturer = require('../controllers/lecturerController')

    app.route('/lecturers')
        .get(lecturer.getAllLecturers)
        .post(lecturer.addLecturer);

    app.route('/lecturers/:lecturerId')
        .get(lecturer.getLecturerById)
        .put(lecturer.updateLecturer)
        .delete(lecturer.deleteLecturer);
};