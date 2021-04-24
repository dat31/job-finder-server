"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authChecker(resolverData, roles) {
    console.log({
        resolverData,
        roles
    });
    if (roles.length === 0) {
        return typeof resolverData.context.req.session.userId === "number";
    }
    return false;
}
exports.default = authChecker;
//# sourceMappingURL=authChecker.js.map