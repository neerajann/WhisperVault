const generateOTP = () => {
  let otp = []
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * 10)
    otp.push(random)
  }

  return otp.join('')
}

export default generateOTP
