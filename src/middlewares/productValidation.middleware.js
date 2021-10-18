import Joi from 'joi'

const bool = Joi.boolean()
const slug = Joi.string().max(120).required()
const title = Joi.string().max(100).required()
const price = Joi.number().max(10000).required()
const longStr = Joi.string().max(3000).allow(null)
const shortStr = Joi.string().max(120).allow(null)
const date = Joi.date().allow('').allow(null)
const num = Joi.number().max(10000)
const _id = Joi.string().max(30).required()

//title, status, categories, price, qty, description, salePrice, saleStartDate, saleEndDate, brand
//slug, image

export const newProductFormValidaton = (req, res, next) => {
  console.log(req.body)
  const schema = Joi.object({
    status: bool,
    title,
    price: num,
    qty: num,
    description: longStr.required(),
    categories: Joi.array(),
    salePrice: num,
    saleStartDate: date,
    saleEndDate: date,
    brand: shortStr,
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

export const updateProductFormValidaton = (req, res, next) => {
  console.log(req.body)
  const schema = Joi.object({
    _id,
    status: bool,
    title,
    price: num,
    qty: num,
    description: longStr.required(),
    images: Joi.array(),
    categories: Joi.array(),
    salePrice: num,
    saleStartDate: date,
    saleEndDate: date,
    brand: shortStr,
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
