const redis = require("./../../../services/redis");
const { sendOtp, generateOtp } = require("../controllers/otp");

function createOtp(req, res, next) {
    const otp = generateOtp();
    redis.set(
      `otp-${req.body.country_code}${req.body.phone}`,
      otp,
      "ex", 
      3600,
      async  function (err, reply) {
       try{ if (err) {
          throw new Error(`Failed to set redis ${err}`);
        } else {
          req.otp = otp;
          const status =await sendOtp(`+${req.body.country_code}${req.body.phone}`, req.otp);
          console.log(status);
          if (status == 200) {
            next();
          } else {
            throw new Error("Failed to send email");
          }
        }}catch(e){
          console.log(err);
    return res.status(200).json({
      response_code: 500,
      message: "Internal server error",
      response: null
    });
        }
      }
    );
}

function validateOTP(req, res, next) {
  if (redis.IsReady) {
    redis.get("otp-"+req.body.country_code+req.body.phone, (err, reply) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          response_code: 500,
          message: "Internal server error",
          response: null,
        });
      } else {
        console.log(reply)
        if (reply == req.body.otp) {
          next();
        } else {
          return res.status(200).json({
            response_code: 401,
            message: "Invalid otp",
            response: null,
          });
        }
      }
    });
  } else {
    console.log("Redis not connected error");
    return res
      .status(200)
      .json({ response_code: 500, message: resp[500], response: null });
  }
}

module.exports = {
  validateOTP,
  createOtp,
};