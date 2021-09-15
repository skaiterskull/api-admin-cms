import express from 'express'
const Router = express.Router()
import { createUser } from '../models/user/User.model.js'
import { newUserformValidaton } from '../middlewares/validation.middleware.js'
import { hashPassword } from '../helpers/bcrypt.js'

Router.all('/', (req, res, next) => {
  console.log('You have reached userAPI')
  next()
})

Router.post('/', newUserformValidaton, async (req, res) => {
  try {
    const hashPass = hashPassword(req.body.password)
    req.body.password = hashPass
    const result = await createUser(req.body)

    if (result?._id) {
      return res.json({
        status: 'Success',
        message:
          'User has been created. Email has been sent to your email address and follow the instruction to activate your account',
        result,
      })
    }
  } catch (error) {
    console.log(error)
    let msg = 'Unable to create new user, please contact administration'

    if (error.message.includes('E11000')) {
      msg = 'User already exist, please contact administrator'
    }
    res.json({
      status: 'Error',
      message: msg,
    })
  }
})
// Router.get()
// Router.patch()
// Router.delete()

export default Router
