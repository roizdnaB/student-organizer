var mongoose = require('mongoose')
    Course = mongoose.model('Courses')

exports.getAllCourses = function(req, res) {
     Course.find({}, function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};
    
exports.addCourse = function(req, res) {
    var newCourse = new course(req.body);
    newCourse.save(function(err, course) {
        if (err)
            res.send(err);
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
    Course.remove({
        _id: req.params.courseId
    }, function(err, course) {
        if (err)
            res.send(err);
        res.json({ message: 'Course successfully deleted' });
    });
};