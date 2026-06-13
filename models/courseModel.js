const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
        name : String,
        id : Number,
        nLecture : Number,
        link : [
            String
        ],
        image : String
    }
)

const courseModel = mongoose.model('course', courseSchema);

module.exports = courseModel;