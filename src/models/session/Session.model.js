import SessionSchema from './Session.Schema.js'

export const createAccessSession = (sessionObj) => {
  return SessionSchema(sessionObj).save()
}
