var mongoose = require('mongoose')
    Course = mongoose.model('Courses')
    Lecturer = mongoose.model("Lecturers")

exports.getAllCourses = function(req, res) {
     Course.find({}, function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};
    
exports.addCourse = function(req, res) {
    var newCourse = new Course(req.body);
    newCourse.save(function(err, course) {
        if (err)
            res.send(err);
        newCourse.lecturers.forEach(el => addCourseToLecturer(el, newCourse));
        res.json(course);
    });
};
    
exports.getCourseById = function(req, res) {
    Course.findById(req.params.courseId, function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};
    
exports.updateCourse = function(req, res) {
    Course.findOneAndUpdate({_id: req.params.courseId}, req.body, {new: true}, function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};
    
exports.deleteCourse = function(req, res) {
    Course.findById(req.params.courseId, function(err, course) {
        course.lecturers.forEach(el => deleteCourseOfLecturer(el, course));
    });
    Course.remove({
        _id: req.params.courseId
    }, function(err, course) {
        if (err)
            res.send(err);
        res.json({ message: 'Course successfully deleted' });
    });
};

addCourseToLecturer = function(lecturerId, course) {    
    Lecturer.findByIdAndUpdate(lecturerId,
        { $push: { courses: course._id } },
        { new: true, useFindAndModify: false }, function(err, lecturer) {});
};

deleteCourseOfLecturer = function(lecturerId, course) {
    Lecturer.findByIdAndUpdate(lecturerId,
        { $pull: { courses: course._id } },
        { new: true, useFindAndModify: false }, function(err, lecturer) {});
};