import UserSchema from './User.schema.js'

export const createUser = (newUser) => {
  return UserSchema(newUser).save()
}
