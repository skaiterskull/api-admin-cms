import jwt from 'jsonwebtoken'
import { createAccessSession } from '../models/session/Session.model.js'
import { setRefreshJWT } from '../models/user/User.model.js'

export const createAccessJWT = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_ACCESS_JWT, {
    expiresIn: '15m',
  })

  const obj = {
    type: 'accessJWT',
    userId: _id,
    token,
  }
  const result = await createAccessSession(obj)
  return token
}

export const createRefreshJWT = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_REFRESH_JWT, {
    expiresIn: '30d',
  })

  const obj = {
    type: 'accessJWT',
    userId: _id,
    token,
  }

  const result = await setRefreshJWT(_id, token)
  return token
}

export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_ACCESS_JWT)
  } catch (error) {
    return error.message
  }
}

export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_REFRESH_JWT)
  } catch (error) {
    return false
  }
}

export const getJWTs = async (userInfo) => {
  const accessJWT = await createAccessJWT(userInfo)
  const refreshJWT = await createRefreshJWT(userInfo)
  return { accessJWT, refreshJWT }
}
