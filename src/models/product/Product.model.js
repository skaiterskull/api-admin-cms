import ProductSchema from './Product.schema.js'

export const createProduct = (proInfo) => {
  return ProductSchema(proInfo).save()
}

export const getProduct = () => {
  return ProductSchema.find()
}

export const getSingleProduct = (filter) => {
  return ProductSchema.findOne(filter)
}

export const getSingleProductById = (_id) => {
  return ProductSchema.findById(_id)
}

export const updateProduct = (filter, object) => {
  return ProductSchema.findOneAndUpdate(filter, object)
}

export const updateProductById = (_id, object) => {
  return ProductSchema.findByIdAndUpdate(_id, object)
}

export const deleteProductById = (_id) => {
  return _id ? ProductSchema.findByIdAndDelete(_id) : null
}
