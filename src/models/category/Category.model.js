import CategorySchema from './Category.schema.js'

export const createCategory = (newCat) => {
  return CategorySchema(newCat).save()
}

export const deleteCategory = (_id) => {
  return CategorySchema.findByIdAndDelete(_id)
}

export const getCategory = () => {
  return CategorySchema.find()
}

export const updateCategory = ({ _id, ...catObj }) => {
  return CategorySchema.findByIdAndUpdate(_id, catObj)
}
