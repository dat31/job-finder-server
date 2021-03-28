"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error('404');
    }
    return next();
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map