
function accountConstructor(
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  )
    {
      const accountBuild = {
        firstName: firstName,
        lastName : lastName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm 
  
      }
      return accountBuild
    }
  export default  accountConstructor
  