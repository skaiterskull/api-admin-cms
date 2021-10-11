import express from 'express'
const Router = express.Router()
import {
  createUser,
  activeUser,
  getUserByEMail,
  updateUserById,
  updateUserByFilter,
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
  updateUserformValidaton,
  updatePasswordformValidaton,
  resetPasswordformValidaton,
} from '../middlewares/validation.middleware.js'
import { isAdminAuth } from '../middlewares/auth.middleware.js'
import { hashPassword, verifyPassword } from '../helpers/bcrypt.js'
import { getRandomOTP } from '../helpers/otp.helper.js'
import {
  emailProcesser,
  emailVerificationWelcome,
  userProfileUpdateNotification,
  userPasswordUpdateNotification,
} from '../helpers/mail.helper.js'
import { getJWTs } from '../helpers/jwt.helper.js'

//Get user profile information
Router.get('/', isAdminAuth, (req, res) => {
  const user = req.user
  user.refreshJWT = undefined
  user.password = undefined
  try {
    res.json({
      status: 'Success',
      message: 'User Profile',
      user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    })
  }
})

//Create new user
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

//New user email verification
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

//User login
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

//Update profile
Router.put('/', isAdminAuth, updateUserformValidaton, async (req, res) => {
  try {
    const { _id, email } = req.user
    const result = await updateUserById(_id, req.body)

    if (result?._id) {
      if (result?._id) {
        userProfileUpdateNotification(email)
        //todo update user with email notif
        return res.json({
          status: 'Success',
          message: 'You profile has been updated',
        })
      }

      res.json({
        status: 'Error',
        message: 'Unable to process your request, please try again later.',
        result,
      })
    }
  } catch (error) {
    console.log(error.message)
    res.json({
      status: 'Error',
      message: 'Unable to process your request, please contact administrator.',
    })
  }
})

//Update Password
Router.patch(
  '/',
  isAdminAuth,
  updatePasswordformValidaton,
  async (req, res) => {
    try {
      const { _id, email } = req.user
      const { password, currentPassword } = req.body
      //check current password against the one in database
      const isMatched = verifyPassword(currentPassword, req.user.password)
      if (isMatched) {
        //encrypt the password
        const hashedPass = hashPassword(password)
        //update database
        const result = hashedPass
          ? await updateUserById(_id, { password: hashedPass })
          : null
        //send email
        if (result?._id) {
          userPasswordUpdateNotification(email)
          //todo update user with email notif
          return res.json({
            status: 'Success',
            message: 'You password has been updated',
          })
        }
      }
      res.json({
        status: 'Error',
        message: 'Unable to process your request, please try again later.',
      })
    } catch (error) {
      console.log(error.message)
      res.json({
        status: 'Error',
        message:
          'Unable to process your request, please contact administrator.',
      })
    }
  }
)

//Reset Password
Router.patch(
  '/reset-password',
  resetPasswordformValidaton,
  async (req, res) => {
    try {
      const { email, otp, password } = req.body
      //check if the opt and email valid
      const otpInfo = await findUniqueReset({ otp, email })
      if (otpInfo?._id) {
        //encrypt the password
        const hashedPass = hashPassword(password)

        //update password in the database
        const filter = { email }
        const obj = { password: hashedPass }
        const user = await updateUserByFilter(filter, obj)
        if (user?._id) {
          //send email
          userProfileUpdateNotification(email)
          //remove the email and otp in the database
          deleteUniqueReset({ otp, email })
          return res.json({
            status: 'Success',
            message: 'Your password has been updated, you can sign in now.',
          })
        }
      }

      res.json({
        status: 'Error',
        message: 'Invalid request',
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'Error',
        message: 'Internal server error',
      })
    }
  }
)

export default Router
