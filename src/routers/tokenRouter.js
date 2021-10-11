import express from 'express'
const Router = express.Router()
import { verifyRefreshJWT, createAccessJWT } from '../helpers/jwt.helper.js'
import { getUser, getUserByEMail } from '../models/user/User.model.js'
import { createPasswordResetOTP } from '../models/reset-pin/ResetPin.model.js'
import { passwordResetOTPNotification } from '../helpers/mail.helper.js'

Router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      const decoded = verifyRefreshJWT(authorization)

      if (decoded?.email) {
        const filter = {
          email: decoded.email,
          refreshJWT: authorization,
        }
        const user = await getUser(filter)
        if (user?._id) {
          const accessJWT = await createAccessJWT({
            _id: user._id,
            email: user.email,
          })

          return res.json({
            status: 'Success',
            message: 'New access token has been generated',
            accessJWT,
          })
        }
      }
    }
    res.status(401).json({
      status: 'Error',
      message: 'Invalid token',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    })
  }
})

Router.post('/request-otp', async (req, res) => {
  try {
    const { email } = req.body

    if (email) {
      //check email in database
      const user = await getUserByEMail(email)
      if (user?.id && user?.role === 'admin') {
        // create unique OTP and store in database
        const result = await createPasswordResetOTP(email)
        // email that otp to the user email
        if (result?._id) {
          passwordResetOTPNotification({ email, otp: result.otp })
        }
      }
    }

    res.json({
      status: 'Success',
      message:
        'If email exist in our system, we will send you an OTP, please check your email and use OTP to reset the password. The OTP will expired in 15 minutes.',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    })
  }
})
export default Router
