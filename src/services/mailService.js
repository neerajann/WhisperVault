import transporter from '../config/mailer.js'
import ejs from 'ejs'
import path from 'path'

const sendLoginCode = async (email, otp) => {
  const html = await ejs.renderFile(
    path.join(process.cwd(), 'views', 'email', 'resetPassword.ejs'),
    { otp: otp, user: email }
  )
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Code ',
    html,
  }
  await transporter.sendMail(mailOptions)
}

export default sendLoginCode
