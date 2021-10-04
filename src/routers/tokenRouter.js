import express from 'express'
const Router = express.Router()
import { verifyRefreshJWT, createAccessJWT } from '../helpers/jwt.helper.js'
import { getUser } from '../models/user/User.model.js'

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

export default Router
