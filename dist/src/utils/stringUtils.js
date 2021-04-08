"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLength = exports.isEmail = exports.capitalize = void 0;
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capitalize = capitalize;
function isEmail(string) {
    return true;
}
exports.isEmail = isEmail;
function isValidLength(string, length) {
    if (string === null || string === "") {
        return false;
    }
    return string.length > length;
}
exports.isValidLength = isValidLength;
//# sourceMappingURL=stringUtils.js.map