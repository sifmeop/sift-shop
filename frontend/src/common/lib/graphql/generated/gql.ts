/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation ForgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input) {\n      success\n    }\n  }\n": typeof types.ForgotPasswordDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n    }\n  }\n": typeof types.ResetPasswordDocument,
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      fullName\n      avatar\n      email\n      isTwoFactorEnabled\n      isVerified\n      method\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n": typeof types.SignUpDocument,
    "\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n": typeof types.GetCategoriesDocument,
};
const documents: Documents = {
    "\n  mutation ForgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input) {\n      success\n    }\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      fullName\n      avatar\n      email\n      isTwoFactorEnabled\n      isVerified\n      method\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n": types.SignUpDocument,
    "\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n": types.GetCategoriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ForgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ForgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      fullName\n      avatar\n      email\n      isTwoFactorEnabled\n      isVerified\n      method\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      fullName\n      avatar\n      email\n      isTwoFactorEnabled\n      isVerified\n      method\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;