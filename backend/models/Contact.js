const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const {sendMail} = require('../utilities/sendMail')
const {contactUsEmail} = require('../mail/contactUs')


const contactSchema = new Schema( { 
    name : {
        type : String , 
        required : true, 
    }, 
    email : { 
        type : String , 
        required : true, 
        trim : true
    }, 
    phoneNumber : { 
        type : String , 
        required : true, 

    }, 
    message : { 
        type : String, 
        required : true, 
    }
})

contactSchema.pre("save" ,async function ( next ) { 
    try  { 

        await sendMail(this.email, "Your Message Sended Successfully",contactUsEmail(this.email , this.name.split(' ')[0], this.name.split(' ')[1] , this.message , this.phoneNumber , this.countryCode ))
        next()
    }catch(err){  
        throw new Error ("Error SENDING MAIL")
    }   
})

module.exports = mongoose.model("Contact" , contactSchema)