"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AUTH_ERR_MSG = "404";
const authMiddleware = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error(AUTH_ERR_MSG);
    }
    return next();
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map