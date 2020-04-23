import validator from 'validator';
//const validator = require('validator');

export default (user) => {
        if(!user.username || !user.email || !user.password || !user.passwordCheck){
            return {error: "Incomplete data. Please fill the form completely."};
        }

        user.username = validator.trim(user.username);        
        user.email = (validator.trim(user.email)).toLowerCase();
        user.password = user.password.replace(/\s/g,'');
        user.passwordCheck = user.passwordCheck.replace(/\s/g,'');

        if(!validator.isEmail(user.email)){
            return {error: "Invalid email."};
        }
        
        if(user.password.length < 6){
            return {error: "Password should not be less than 6 characters."};
        }else if(user.password.toLowerCase().includes("password")){
            return {error: "The password should not contain password keyword."};
        }else if(!user.password.match(/^[A-Za-z0-9]+$/)){
            return {error: "The password should only contain numbers and letters."};
        }else if(user.password.localeCompare(user.passwordCheck)){
            return {error: "The passwords didn't match. Please type correctly."};
        }
        delete user.passwordCheck;
        return user;
}

// const user = check({
//     username: '  Sushant Sapkota',
//     password: '74abc84545defg545',
//     passwordCheck: '74abc84545defg545',
//     email: '  50@lkkm '
// });

// console.log(user);