import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

// @ValidatorConstraint()
// export class IsEmail implements ValidatorConstraintInterface {
//     validate(text:string) {
//         let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return (re.test(String(text.toLowerCase()))) 
//     }
// }

@ValidatorConstraint()
export class IsPhoneNumber implements ValidatorConstraintInterface {
    validate(text:string) {
        let re = /^\d{8}$/ ;
        return re.test(text.toString());
    }
}


module.exports = {
//   IsEmail,
    IsPhoneNumber,
};


