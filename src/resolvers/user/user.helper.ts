import { ErrorField, RegisterInput } from "./user.type";
import { isEmail, isValidLength } from "../../utils/stringUtils";

export function validateRegister( registerInput: RegisterInput ): ErrorField[] | undefined {

    const { username, email, password } = registerInput
    const VALID_LENGTH = 2
    const VALID_PASS_LENGTH = 3

    if( !isValidLength( username, VALID_LENGTH ) ) {
        return [ {
            field: 'username',
            message: 'username must be greater than 2'
        } ]
    }

    if( !isEmail( email ) ) {
        return [ {
            field: 'email',
            message: 'email invalid'
        } ]
    }

    if( !isValidLength( password, VALID_PASS_LENGTH ) ) {
        return [ {
            field: 'password',
            message: 'password must be greater than 2'
        } ]
    }

    return
}
