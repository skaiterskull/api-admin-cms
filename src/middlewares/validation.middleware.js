import Joi from 'joi'

const str = Joi.string().max(30)
const shortStr = Joi.string().alphanum().max(30).required()
const email = Joi.string().email({ minDomainSegments: 2 })
const password = Joi.string().min(6).max(50).required()
const otp = Joi.string().min(6).max(6).required()

export const newUserformValidaton = (req, res, next) => {
  const schema = Joi.object({
    fname: shortStr,
    lname: shortStr,
    dob: Joi.date().allow('').allow(null),
    email,
    password,
    phone: Joi.string().allow('').max(15),
    address: Joi.string().allow('').max(50),
    gender: Joi.string().allow('').max(6),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
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

export const newCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    name: str.required(),
    parentCat: str.allow('').allow(null),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
    })
  }
  next()
}

export const updateCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: shortStr,
    name: str.required(),
    parentCat: str.allow('').allow(null),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
    })
  }
  next()
}

export const adminLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email,
    password: Joi.string().min(6).max(50).required(),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
    })
  }
  next()
}

export const updateUserformValidaton = (req, res, next) => {
  const schema = Joi.object({
    fname: shortStr,
    lname: shortStr,
    dob: Joi.date().allow('').allow(null),
    phone: Joi.string().allow('').max(15),
    address: Joi.string().allow('').max(50),
    gender: Joi.string().allow('').max(6),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
    })
  }
  next()
}

export const updatePasswordformValidaton = (req, res, next) => {
  const schema = Joi.object({
    password,
    currentPassword: password,
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
    })
  }
  next()
}

export const resetPasswordformValidaton = (req, res, next) => {
  const schema = Joi.object({
    otp,
    password,
    email,
  })

  const result = schema.validate(req.body)

  if (result.error) {
    return res.json({
      status: 'Error',
      message: result.error.message,
    })
  }
  next()
}
