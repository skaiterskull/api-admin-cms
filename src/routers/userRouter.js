import express from 'express'
const Router = express.Router()
import {
  createUser,
  activeUser,
  getUserByEMail,
} from '../models/user/User.model.js'
import {
  createUniqueReset,
  findUniqueReset,
  deleteUniqueReset,
} from '../models/reset-pin/ResetPin.model.js'
import {
  newUserformValidaton,
  emailVerificationValidation,
  adminLoginValidation,
} from '../middlewares/validation.middleware.js'
import { hashPassword, verifyPassword } from '../helpers/bcrypt.js'
import { getRandomOTP } from '../helpers/otp.helper.js'
import {
  emailProcesser,
  emailVerificationWelcome,
} from '../helpers/mail.helper.js'
import { getJWTs } from '../helpers/jwt.helper.js'

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
      //create unique PIN and send it to database table reset_pin
      const otpLength = 8
      const otp = getRandomOTP(otpLength)
      const uniqueCombo = {
        otp,
        email: result.email,
      }
      const data = await createUniqueReset(uniqueCombo)
      if (data?._id) {
        emailProcesser(uniqueCombo)
      }
      //---------------------------------------------------------
      //send an email includes the OTP Unique PIN

      //---------------------------------------------------------

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

Router.post(
  '/email-verification',
  emailVerificationValidation,
  async (req, res) => {
    try {
      // check if pin and email combo is exist in reset pin
      const result = await findUniqueReset(req.body)
      if (result?._id) {
        const isUserActive = await activeUser(req.body.email)
        if (isUserActive?._id) {
          console.log(isUserActive._id)
          emailVerificationWelcome(req.body.email)
          deleteUniqueReset(req.body.email)
        }
        return res.json({
          status: 'Success',
          message: 'You email has been verified, you may sign in now.',
        })
      }
      res.json({
        status: 'Error',
        message: 'Invalid or expired link',
      })
    } catch (error) {
      res.json({
        status: 'Error',
        message: 'Unable to verify your email',
      })
    }
  }
)

Router.post('/login', adminLoginValidation, async (req, res) => {
  try {
    const { email, password } = req.body
    //find user by email
    const user = await getUserByEMail(email)
    if (user?._id) {
      //verify password
      const passMatched = verifyPassword(password, user.password)
      if (passMatched) {
        user.password = undefined
        const tokens = await getJWTs({ _id: user._id, email })
        return res.json({
          status: 'Success',
          message: 'Login Successful',
          user,
          tokens,
        })
      }
    }
    res.json({
      status: 'Error',
      message: 'Invalid Login details',
    })
    //login success
  } catch (error) {
    console.log(error)
    res.json({
      status: 'Error',
      message: 'Unable to process your request, please contact administrator',
    })
  }
})

export default Router
