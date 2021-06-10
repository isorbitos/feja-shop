const valid = (name, email, password, cf_password) =>{
    if(!name || !email || !password)
    return "Please add all fields"

    if(!validateEmail(email))
    return 'Invalid Email!!!'

    if(password.length < 5)
    return "Password mus be at least 6 chars"

    if(password !== cf_password)
    return "Confirm password did not match!!!"
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export default valid;