import ResetPinSchema from './ResetPin.schema.js'

export const createUniqueReset = (userInfo) => {
  return ResetPinSchema(userInfo).save()
}
export const findUniqueReset = (userInfo) => {
  return ResetPinSchema.findOne(userInfo)
}

export const deleteUniqueReset = async (userInfo) => {
  const result = await ResetPinSchema.findOneAndDelete(userInfo)
  return result
}
