import { RegisterInput } from "../resolvers/user";


const validateRegister = ( registerInput: RegisterInput ) => {

    const { username, email, password } = registerInput

    if ( username.length <= 2 ) {
        return [ {
            field: 'username',
            message: 'username must be greater than 2'
        } ]
    }

    if ( !email.includes( '@' ) ) {
        return [ {
            field: 'email',
            message: 'email invalid'
        } ]
    }

    if ( password.length <= 2 ) {
        return [ {
            field: 'password',
            message: 'password must be greater than 2'
        } ]
    }

    return null
}

export default validateRegister
