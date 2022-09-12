const axios = require("axios");
const generateOtp = function () {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

async function sendOtp(mobile, otp) {
  console.log(mobile);
  console.log(otp);
  const res = await axios.post(`https://api.in.kaleyra.io/v1/HXIN1740145135IN/messages`, {
    "body":"Hi User, Please find the below OTP "+otp+" -Kaleyra",
    "sender":"KALERA",
    "to":mobile,
    "type":"OTP",
    "template_id":"1107165959873165373"
  });
  console.log(res.data);
  if (res.status == 200) {
    return res.data["response_code"];
  } else {
    console.log(`response with status ${res.status}`);
    return 500;
  }
}

module.exports = { generateOtp, sendOtp };