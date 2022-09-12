const jwt = require('jsonwebtoken');
require('dotenv').config()



function createToken(req,res,next){
    user_id = req.temp_user._id;
    user_phone =  req.temp_user.phone;
    user_country_code = req.temp_user.country_code
    try{
        var token = jwt.sign({ user_id: user_id,user_phone:user_phone ,country_code:user_country_code}, process.env.JWT_SECRET_KEY,  {
            algorithm: "HS256",
            expiresIn: 365*24*3600,
        });
        req.token = token;
        next()
    }catch(err){
        console.log("Error in JWT page")
        console.log(err)
        res.status(200).send({
            "response_code":500,
            "message":"Internal server error",
            "response":null
        })
    }
}

function validateToken(req,res,next){
    try{token =req.headers.authorization && req.headers.authorization.split(" ")[1]
    if(token==null){
        return res.status(200).send({
            "response_code":403,
            "message":"Access denied",
            "response":null
        });
    }else{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(200).json({ "response_code": 401, "message": "Invalid token", "response" : null })
                  req.token = token
                  var decodedToken = jwt.decode(token)
                  req.user_id = decodedToken["user_id"],
                  req.user_phone = decodedToken["user_phone"]
                  req.country_code = decodedToken["country_code"]
                  next()
          })
    }}catch(err){
        console.log(err)
        return res.status(200).send({
            "response_code":500,
            "message":"Internal server error",
            "response":null
        })
    }
}
module.exports = {
    createToken,
    validateToken,
}