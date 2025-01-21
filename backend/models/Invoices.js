const mongoose  = require('mongoose')
const Schema = mongoose.Schema ; 
const invoicesSchema = new Schema( { 
    users : [ {type : Schema.Types.ObjectId , ref : "User"} ]
    ,
    price : { 
        type : String , 
        required : true,
    }, 

    address : { 
        type : String, 
    }, 
    
    pincode : { 
        type : String, 
    }, 

    courseId : { 
        type : Schema.Types.ObjectId, 
        ref : "Course"
    }
})