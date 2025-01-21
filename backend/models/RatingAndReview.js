const mongoose = require('mongoose')
const Schema = mongoose.Schema ; 
const ratingSchema = new Schema ( { 

    user : { 
        type: Schema.Types.ObjectId , 
        ref : "User"
    }, 
    course : { 
        type : Schema.Types.ObjectId , 
        ref  : "Course"
    }, 
    rating : { 
        type : String , 
        required : true,
    }, 
    review : { 
        type : String , 
        required : true,
    }

})

module.exports = mongoose.model('RatingAndSchema' , ratingSchema) 