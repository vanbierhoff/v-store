import isEmail from 'validator/lib/isEmail';
import validator from 'validator';
import IsEmailOptions = validator.IsEmailOptions;


export function REmailValidator(email: string, options: IsEmailOptions) {
    return isEmail(email);
}
