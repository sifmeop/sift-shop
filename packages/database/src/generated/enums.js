"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterType = exports.TokenType = exports.AuthMethod = exports.UserRole = void 0;
exports.UserRole = {
    ADMIN: 'ADMIN',
    CUSTOMER: 'CUSTOMER'
};
exports.AuthMethod = {
    CREDENTIALS: 'CREDENTIALS',
    GOOGLE: 'GOOGLE',
    GITHUB: 'GITHUB'
};
exports.TokenType = {
    VERIFICATION: 'VERIFICATION',
    TWO_FACTOR: 'TWO_FACTOR',
    PASSWORD_RESET: 'PASSWORD_RESET'
};
exports.FilterType = {
    SELECT: 'SELECT',
    CHECKBOX: 'CHECKBOX',
    RANGE: 'RANGE',
    RADIO: 'RADIO',
    BOOLEAN: 'BOOLEAN'
};
//# sourceMappingURL=enums.js.map