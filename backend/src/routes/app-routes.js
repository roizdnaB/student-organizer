module.exports = function(app) {
    var lecturer = require('../controllers/lecturerController')
    var course = require('../controllers/courseController')

    app.route('/lecturers')
        .get(lecturer.getAllLecturers)
        .post(lecturer.addLecturer);

    app.route('/lecturers/:lecturerId')
        .get(lecturer.getLecturerById)
        .put(lecturer.updateLecturer)
        .delete(lecturer.deleteLecturer);
    
    app.route('/courses')
        .get(course.getAllCourses)
        .post(course.addCourse);

    app.route('/courses/:courseId')
        .get(course.getCourseById)
        .put(course.updateCourse)
        .delete(course.deleteCourse);
};