export function capitalize( string: String ): String {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

export function isEmail( string: String ): boolean {
    return true
}

export function isValidLength( string: String, length: number ): boolean {
    if( string === null || string === "" ) {
        return false
    }
    return string.length > length
}
