import Joi from 'joi'

const shortStr = Joi.string().alphanum().max(30).required()
const email = Joi.string().email({ minDomainSegments: 2 })

export const newUserformValidaton = (req, res, next) => {
  const schema = Joi.object({
    fname: shortStr,
    lname: shortStr,
    dob: Joi.date(),
    email,
    password: Joi.string().min(6).max(50).required(),
    phone: Joi.string().max(15),
    address: Joi.string().max(50),
    gender: Joi.string().max(6),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message:
        'Data validation is failed, can not proceed to register the user',
    })
  }
  next()
}

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    otp: shortStr,
    email: email.required(),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    console.log(result.error.message)
  }
  next()
}
