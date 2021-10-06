import { verifyAccessJWT } from '../helpers/jwt.helper.js'
import { getSession } from '../models/session/Session.model.js'
import { getUserById } from '../models/user/User.model.js'

export const isAdminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      const decoded = verifyAccessJWT(authorization)
      console.log(decoded)
      if (decoded === 'jwt expired') {
        return res.status(403).json({
          status: 'error',
          message: 'JWT expired',
        })
      }

      if (decoded?.email) {
        const session = await getSession({ token: authorization })

        if (session?._id) {
          const user = await getUserById(session.userId)
          if (user?.role === 'admin') {
            req.user = user
            return next()
          }
        }
      }
    }

    return res.status(401).json({
      status: 'error',
      message: 'Unauthenticated',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}
