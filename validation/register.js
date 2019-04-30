const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = (data)=>{
    let errors = {};
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //name checks

    if(Validator.isEmpty(data.fname)){
        errors.fname = "Name field is required";
    }

    //email checks

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    } else{
        if(!Validator.isEmail(data.email)){
            errors.email = "Email is invalid";
        }
    }

    //password checks

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password field is required";
    }
    if(!Validator.isLength(data.password , {min: 6, max: 30})){
        errors.password = "Password must be atleast 6 characters";
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Password is not matching";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;