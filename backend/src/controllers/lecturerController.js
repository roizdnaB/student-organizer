var mongoose = require('mongoose'),
    Lecturer = mongoose.model('Lecturers')
    Course = mongoose.model('Courses')

exports.getAllLecturers = function(req, res) {
    Lecturer.find({}, function(err, lecturer) {
        if (err)
            res.send(err);
        res.json(lecturer);
    });
};

exports.addLecturer = function(req, res) {
    var newLecturer = new Lecturer(req.body);
    newLecturer.save(function(err, lecturer) {
        if (err)
            res.send(err);
        res.json(lecturer);
    });
};

exports.getLecturerById = function(req, res) {
    Lecturer.findById(req.params.lecturerId, function(err, lecturer) {
        if (err)
            res.send(err);
        res.json(lecturer);
    });
};

exports.updateLecturer = function(req, res) {
    Lecturer.findOneAndUpdate({_id: req.params.lecturerId}, req.body, {new: true}, function(err, lecturer) {
        if (err)
            res.send(err);
        res.json(lecturer);
    });
};

exports.deleteLecturer = function(req, res) {
    Lecturer.findById(req.params.lecturerId, function(err, lecturer) {
        lecturer.courses.forEach(el => deleteLecturerOfCourse(el, lecturer));
    });
    Lecturer.remove({
        _id: req.params.lecturerId
    }, function(err, lecturer) {
        if (err)
            res.send(err);
        res.json({ message: 'Lecturer successfully deleted' });
    });
};

deleteLecturerOfCourse = function(courseId, lecturer) {
    Course.findByIdAndUpdate(courseId,
        { $pull: { lecturers: lecturer._id } },
        { new: true, useFindAndModify: false }, function(err, course) {});
};
