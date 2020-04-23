import validator from 'validator';
//const validator = require('validator');

export default (email, phone) => {
    if(!validator.isEmail(email)){
        const dataerror = {error: "Please enter your email correctly."};
        return {email: undefined, phone: undefined, dataerror};
    }else if(!phone.match(/^[0-9]+$/) || !(phone.length === 10)){
        const dataerror = {error: "Please check your phone number correctly. It should not contain any text and be 10 digits long."};
        return {email: undefined, phone: undefined, dataerror};
    }
    return {email, phone, dataerror: undefined};
}

//const {email, phone, dataerror} = valiation('sdkjsad', '9861053852');

//console.log(email, phone, dataerror);