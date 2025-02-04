const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({ 

    courses :  [{ 
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Course"
    }], 

    name : { 
        type : String , 
        required : true,
    }, 
    description :  { 
        type : String , 
        required :true,
    }


})
const Category = mongoose.model("Category" , categorySchema) 
module.exports = Category