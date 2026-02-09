"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.FilterOptionScalarFieldEnum = exports.FilterScalarFieldEnum = exports.SubcategoryScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.ProductVariantScalarFieldEnum = exports.ProductScalarFieldEnum = exports.TokenScalarFieldEnum = exports.AccountScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.3.0",
    engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Account: 'Account',
    Token: 'Token',
    Product: 'Product',
    ProductVariant: 'ProductVariant',
    Category: 'Category',
    Subcategory: 'Subcategory',
    Filter: 'Filter',
    FilterOption: 'FilterOption'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    avatar: 'avatar',
    role: 'role',
    isVerified: 'isVerified',
    isTwoFactorEnabled: 'isTwoFactorEnabled',
    twoFactorSecret: 'twoFactorSecret',
    method: 'method',
    createdAt: 'createdAt'
};
exports.AccountScalarFieldEnum = {
    id: 'id',
    type: 'type',
    provider: 'provider',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    userId: 'userId',
    createdAt: 'createdAt'
};
exports.TokenScalarFieldEnum = {
    id: 'id',
    email: 'email',
    token: 'token',
    type: 'type',
    expiresAt: 'expiresAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    price: 'price',
    compareAtPrice: 'compareAtPrice',
    inStock: 'inStock',
    isFeatured: 'isFeatured',
    thumbnail: 'thumbnail',
    images: 'images',
    subcategoryId: 'subcategoryId',
    filterValues: 'filterValues',
    specifications: 'specifications',
    createdAt: 'createdAt'
};
exports.ProductVariantScalarFieldEnum = {
    id: 'id',
    sku: 'sku',
    stock: 'stock',
    price: 'price',
    compareAtPrice: 'compareAtPrice',
    thumbnail: 'thumbnail',
    images: 'images',
    productId: 'productId',
    attributes: 'attributes',
    createdAt: 'createdAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    createdAt: 'createdAt'
};
exports.SubcategoryScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    image: 'image',
    categoryId: 'categoryId',
    createdAt: 'createdAt'
};
exports.FilterScalarFieldEnum = {
    id: 'id',
    name: 'name',
    value: 'value',
    type: 'type',
    position: 'position',
    subcategoryId: 'subcategoryId',
    createdAt: 'createdAt'
};
exports.FilterOptionScalarFieldEnum = {
    id: 'id',
    value: 'value',
    label: 'label',
    position: 'position',
    filterId: 'filterId',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map