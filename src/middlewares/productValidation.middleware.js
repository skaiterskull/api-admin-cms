import Joi from 'joi'

const bool = Joi.boolean()
const slug = Joi.string().max(120).required()
const title = Joi.string().max(100).required()
const price = Joi.number().max(10000).required()
const longStr = Joi.string().max(3000).allow(null)
const shortStr = Joi.string().max(120).allow(null)
const date = Joi.date().allow('').allow(null)
const num = Joi.number().max(10000)

//title, status, categories, price, qty, description, salePrice, saleStartDate, saleEndDate, brand
//slug, image

export const newProductFormValidaton = (req, res, next) => {
  const schema = Joi.object({
    status: bool.required(),
    title,
    price: num,
    qty: num,
    description: longStr.required(),
    categories: longStr,
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
