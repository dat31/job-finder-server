"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const stringUtils_1 = require("../../utils/stringUtils");
function validateRegister(registerInput) {
    const { username, email, password } = registerInput;
    const VALID_LENGTH = 2;
    const VALID_PASS_LENGTH = 3;
    if (!stringUtils_1.isValidLength(username, VALID_LENGTH)) {
        return [{
                field: 'username',
                message: 'username must be greater than 2'
            }];
    }
    if (!stringUtils_1.isEmail(email)) {
        return [{
                field: 'email',
                message: 'email invalid'
            }];
    }
    if (!stringUtils_1.isValidLength(password, VALID_PASS_LENGTH)) {
        return [{
                field: 'password',
                message: 'password must be greater than 2'
            }];
    }
    return;
}
exports.validateRegister = validateRegister;
//# sourceMappingURL=user.helper.js.map