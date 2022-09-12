const redis = require("./../../services/redis");

const express = require("express");
var router = express.Router();

const { loginValidator,phoneOtpValidator,stepOneValidator} = require("./middlewares/validators");

const {createUserIfNotExist,validateUserExist,setProfileCompletion} = require('./middlewares/user');
const { validateOTP, createOtp } = require("./middlewares/otp");
const { createToken,validateToken } = require("./middlewares/token");
 

router.post("/login", loginValidator,createUserIfNotExist,createOtp, async (req, res) => {
  res.status(200).json({response_code:200,message:"Otp sent to your phone",response:null})
});



router.post("/otp/verify",phoneOtpValidator,validateUserExist,validateOTP,createToken, (req, res) => {
  res.status(200).json({"response_code":200,"message":"Login successful","response":{"token":req.token,"completion":req.temp_user.profile_completion}})
});

router.post('/profile/step-one/',validateToken,stepOneValidator,setProfileCompletion,(req,res)=>{
  res.status(200).json({"response_code":200,"message":"Updated profile successfully","response":null})
})

module.exports = router;