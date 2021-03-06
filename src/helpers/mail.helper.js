import nodemailer from 'nodemailer'

const send = async (mailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const info = await transporter.sendMail(mailInfo)

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

export const emailProcesser = ({ email, otp }) => {
  const link = `${process.env.CLIENT_ROOT_URL}/email-verification?otp=${otp}&email=${email}`
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'User Email Verification', // Subject line
    text: `Hi there Please follow the link to verify your email ${link}`, // plain text body
    html: `
        Hello there,
        <br/>
        <p>Thank you for register with us. Please verify your email</p>
        <p><a href=${link}>${link}</a></p>
        <br/>
        <p>Kind regards</p>
        <br/>
        <p>--Some company info</p>
    `, // html body
  }

  send(mailObj)
}

export const emailVerificationWelcome = (email) => {
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Welcome, your email has been verified', // Subject line
    text: `Hi there, your email has been verified, you can sign in now`, // plain text body
    html: `
        Hello there,
        <br/>
        <p>Thank you for register with us. Your email has been verified</p>

        <p>Kind regards</p>
        <br/>
        <p>--Some company info</p>
    `, // html body
  }

  send(mailObj)
}

export const userProfileUpdateNotification = (email) => {
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Profile update', // Subject line
    text: `Hi there, your profile has been updated. If you did not make this change, please contact us immediately.`, // plain text body
    html: `
        Hello there,
        <br/>
        <p>Hi there, your profile has been updated. If you did not make this change, please contact us immediately.</p>

        <p>Kind regards</p>
        <br/>
        <p>--Some company info</p>
    `, // html body
  }

  send(mailObj)
}

export const userPasswordUpdateNotification = (email) => {
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Password update', // Subject line
    text: `Hi there, your password has been updated. If you did not make this change, please contact us immediately.`, // plain text body
    html: `
        Hello there,
        <br/>
        <p>Hi there, your password has been updated. If you did not make this change, please contact us immediately.</p>

        <p>Kind regards</p>
        <br/>
        <p>--Some company info</p>
    `, // html body
  }

  send(mailObj)
}

export const passwordResetOTPNotification = ({ email, otp }) => {
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'OTP for password reset', // Subject line
    text: `Hi there, use the otp ${otp} to reset the password. The password will expire in x amount`, // plain text body
    html: `
        Hello there,
        <br/>
        <p>Hi there, use the otp ${otp} to reset the password. The password will expire in x amount</p>

        <p>Kind regards</p>
        <br/>
        <p>--Some company info</p>
    `, // html body
  }

  send(mailObj)
}
