var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var CourseSchema = new mongoose.Schema({
    title: String,
    seats: {type: Number, default: 25},
    starts: {type: Date, default: Date.now}
}, {collection: "course"});

var Course = mongoose.model("Course", CourseSchema);    // create db.courses
Course.create({title: "MongoDB", seats: 32}, function(err, results) {
    console.log(err);
    console.log(results);
});
