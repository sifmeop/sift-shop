export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly CUSTOMER: "CUSTOMER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const AuthMethod: {
    readonly CREDENTIALS: "CREDENTIALS";
    readonly GOOGLE: "GOOGLE";
    readonly GITHUB: "GITHUB";
};
export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod];
export declare const TokenType: {
    readonly VERIFICATION: "VERIFICATION";
    readonly TWO_FACTOR: "TWO_FACTOR";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type TokenType = (typeof TokenType)[keyof typeof TokenType];
export declare const FilterType: {
    readonly SELECT: "SELECT";
    readonly CHECKBOX: "CHECKBOX";
    readonly RANGE: "RANGE";
    readonly RADIO: "RADIO";
    readonly BOOLEAN: "BOOLEAN";
};
export type FilterType = (typeof FilterType)[keyof typeof FilterType];
