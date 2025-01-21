const RatingAndReview = require('../models/RatingAndReview')
const Course = require('../models/Course')
const User = require('../models/User')
const mongoose = require('mongoose')
exports.createRating = async(req ,res) => { 
    try { 
        const  {rating , review , courseId } = req.body 
        const {userId} = req.user
        if(!rating || !review) { 
            throw "missing details"
        }
        // validate the user is not present in rating or not have done rating
        const courseDetail = await Course.findById(courseId)
        const uid = new mongoose.Types.ObjectId(userId)
        if(courseDetail.ratingAndReviews.includes(uid)) { 
            throw "user already done rating"
        }
        // create rating and review  
        const ratingDetails = await RatingAndReview.create({ 
            user : userId , 
            course : courseId,
            rating , 
            review,
        })
        // put insde the course
        courseDetail.ratingAndReviews.push(ratingDetails._id)
        await courseDetail.save(err => {
            if (err) throw "error updating course details"
        })
        return res.status(200).json( { 
            success : true, 
            message : "rating created successfully",
            ratingDetails
        })

    }catch(err) { 
        return res.status(401).json( {
            success : false, 
            message : err.message
        })
    }
}

exports.getAvgRating = async  (req ,res) => { 


    try { 
        const {courseId} = req.body 
        const courseDetails = await Course.findById(courseId) 
        if(!courseDetails) { 
            throw "course not found "
        }
        const totalRatings = courseDetails.ratingAndReviews.length()
        let avgRating = totalRatings/2
        return res.status(200).json({ 
            success : true ,
            message :'fecthed all ratings',
            avgRating
        })
    }catch(err) { 
        return res.status(401).json({ 
            success : false , 
            message : err.message
        })
    }
}

exports.getAllRatings = async (req , res) => { 
    try { 
        const allRatings = await RatingAndReview.find({ }).sort({rating : "desc"}).populate({path : "user" , select : "firstName lastName email image"}).populate({ 
            path : "course"
            ,select : "courseName"
        }).exec()
        if(!allRatings) { 
            throw "error fetching all ratings"
        }
        return res.status(200).json({ 
            success : true , 
            message : "fetched all ratings",
            allRatings
        })

    }catch(err) { 
        return res.status(401).json({ 
            success : false , 
            message : err.message
        })
    }
}