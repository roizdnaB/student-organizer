var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Lecturer = require('./models/lecturerModel'),
    bodyParser = require('body-parser');

var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./routes/lecturers-routes');
routes(app);

app.listen(port)

console.log("student-organizer server started on: " + port);