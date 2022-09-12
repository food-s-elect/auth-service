
const Ajv = require("ajv")
const ajv = new Ajv()

// Validate email for login 
const schemaLogin = {
  type: "object",
  properties: {
    phone: { type: "string", maxLength: 10, minLength: 10 },
    country_code:{type:"string",minLength:1,maxLength:3}
  },
  required: ["email","country_code"],
  additionalProperties: false,
}


const validatePhone = ajv.compile(schemaLogin)
function loginValidator(req, res, next) {
  console.log(req.body)
  const valid = validatePhone(req.body)
  if (!valid) {
    return res.status(200).json({ "response_code": 400, "message":"data validation error", "response" : null })
  } else {
    next();
  }
}


// Validate email and otp for validate-ootp endpoint
const schemaPhoneOtp = {
  type: "object",
  properties: {
    phone: { type: "string", maxLength: 10, minLength: 10 },
    country_code:{type:"string",minLength:1,maxLength:3},
    otp: {type:"string" },
  },
  required: ["email", "otp","country_code"],
  additionalProperties: false,
}

const validatePhoneOtp= ajv.compile(schemaPhoneOtp)
function phoneOtpValidator(req, res, next) {
  const valid = validatePhoneOtp(req.body)
  if (!valid) {
    return res.status(200).json({ "response_code": 400, "message": "Data validation error", "response" : null })
  } else {
    next();
  }
}

//validate step one
const schemaOneValidation =  {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 3, minLength: 50 },
    gender:{ enum: ['male', 'female', 'other']}
  },
  required: ["gender", "name"],
  additionalProperties: false,
}
const validateStepOne= ajv.compile(schemaOneValidation)
function stepOneValidator(req, res, next) {
  const valid = validateStepOne(req.body)
  if (!valid) {
    return res.status(200).json({ "response_code": 400, "message": "Data validation error", "response" : null })
  } else {
    next();
  }
}

module.exports = {
  loginValidator,
  phoneOtpValidator,
  stepOneValidator
};