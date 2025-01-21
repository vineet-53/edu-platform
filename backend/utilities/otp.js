const otpGen = require('otp-generator')
const Otp = require('../models/Otp')
exports.generateOtp  =async ( ) => { 
    try { 
        const otp = await otpGen.generate(6, { upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,});
        return otp
    }
    catch(err) { 
        console.log("Otp not generated ")
    }
}
exports.verifyOtp =async (email , otp)=> { 
    try  { 
        // validate the otp 
        let recentOtp = await Otp.findOne({email}).sort({createdAt : -1}).limit(1);
        console.log(recentOtp , "::recent otp")
        if(!recentOtp) { 
            throw "Otp not present in db"
        }
        if(recentOtp.otpNumber !== otp) { 
            throw "Otp does not match"
        }
        if(!recentOtp.otpExpiresAt){ 
            throw "Time limit exceded"
        }
        return true ;
    }catch( err ) { 
        console.error(err.message)
        return false;
    }
}