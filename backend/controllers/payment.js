
const mongoose = require('mongoose')
const crypto = require('crypto')
const razorpay  = require('../configs/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const sendMail = require('../utilities/sendMail')


exports.capturePayment = async (req ,res) => { 

    try { 
        const { courseId }  = req.body 
        const { userId} = req.user 
        if(!userId) { 
            throw "user not found"
        }
        if(!courseId) { 
            throw "course not found "
        }
        // find the user
        const userDetails = await User.findById(userId)
        // find the course 
        const courseDetails = await Course.findById(courseId)
        if(!userDetails) { 
            throw "user not found"
        }if(!courseDetails) { 
            throw "course not found"
        }
        const uid = new mongoose.Types.ObjectId(userId) 
        // validate user is not pressent already 
        if(courseDetails.studentEnrolled.includes(userDetails._id))  { 
            throw "user already purchaced the course"
        }

        // craete instance of the course price 
        const orderPayload = { 
            amount: courseDetails.price * 100,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
              userId , 
              courseId ,
              coursePrice : courseDetails.price  
            }
        }
        const order = await razorpay.orders.create(orderPayload)
        
        return res.status(200).json({ 
            success : true , 
            message : "Succesfully bought course",
            order , 
            courseName : courseDetails.courseName,  
            courseDesc  : courseDetails.courseDescription, 
            orderId : order.id
        })
    }catch(err) { 
        return res.status(401).json( { 
            success : false , 
            message : err.message
        })
    }
}


exports.verifySignature = async(req, res) => { 
    try { 
        const WEB_HOOK_SECRET = process.env.WEB_HOOK_SECRET
        const signature = req.headers['x-razorpay-signature']
        const digest = crypto.createHmac('sha256', WEB_HOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

        if(signature == digest ) { 
            console.log("payment is auth")
            const {courseId , userId} = req.body.payload.payment.entity.notes
            const course  = await Course.findById(courseId) 
            // validate course
            if(!course ) { 
                throw new Error("course not found")
            }
            // find user
            const user = await User.findById(userId) 
            // push user to course 
            course.studentEnrolled.push(userId) 
            // push course to user 
            user.courses.push(courseId); 
            // save entry
            await course.save()
            await user.save() ;
            // send mail to the user 
            let email = user.email 

            await sendMail(email , `thankyou for buying the course${course.courseName}`, "learn more things")

            return res.status(200).json({ 
                success : true, 
                message : "payment verified successfully",
                user , 
                course,
            })
        }
    }catch(err){ 
         return res.status(401).json( { 
            success : false, 
            message : err.message
         })
    }
}
