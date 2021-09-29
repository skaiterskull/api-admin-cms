import bcrypt from 'bcrypt'
const saltRounds = 10

export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, saltRounds)
}

export const verifyPassword = (plainPass, hassPassFromDB) => {
  return bcrypt.compareSync(plainPass, hassPassFromDB)
}
