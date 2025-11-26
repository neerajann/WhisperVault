const checkEmailPattern = (email) => {
  const emailPattern = /^[a-zA-Z0-9.+_%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}
const checkPasswordPattern = (password) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  return passwordPattern.test(password)
}

export default { checkEmailPattern, checkPasswordPattern }
