const mongoose = require('mongoose')
const courseProgressSchema  = new mongoose.Schema({ 
    userId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    },
    courseId : { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Course"
    }, 
    // implemented later 
    completedVideos :  [ 
        {type : mongoose.Schema.Types.ObjectId ,ref :  "SubSection"} , 
    ]


})
module.exports = mongoose.model("CourseProgress" , courseProgressSchema) 
