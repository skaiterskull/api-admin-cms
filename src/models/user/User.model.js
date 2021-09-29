import UserSchema from './User.schema.js'

export const createUser = (newUser) => {
  return UserSchema(newUser).save()
}

export const activeUser = (email) => {
  return UserSchema.findOneAndUpdate(
    email,
    { status: 'active', isEmailConfirmed: true },
    { new: true }
  )
}

export const getUserByEMail = (email) => {
  return UserSchema.findOne({ email })
}

export const setRefreshJWT = (_id, refreshJWT) => {
  return UserSchema.findByIdAndUpdate(_id, { refreshJWT })
}
