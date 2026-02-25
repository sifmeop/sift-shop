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
    "\n\tmutation SignOut {\n\t\tsignOut{\n\t\t\tsuccess\n\t\t}\n\t}\n": typeof types.SignOutDocument,
    "\n  query VerifySession {\n    verifySession {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n": typeof types.VerifySessionDocument,
    "\n  mutation EmailConfirmation($input: EmailConfirmationInput!) {\n    emailConfirmation(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n": typeof types.EmailConfirmationDocument,
    "\n  mutation ForgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input) {\n      success\n    }\n  }\n": typeof types.ForgotPasswordDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n    }\n  }\n": typeof types.ResetPasswordDocument,
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n": typeof types.SignUpDocument,
    "\n\tmutation AddToCart($input: AddToCartInput!) {\n\t\taddToCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n\t}\n": typeof types.AddToCartDocument,
    "\n  query Cart {\n    cart {\n      id\n      product {\n        id\n        slug\n        name\n        stock\n        images\n      }\n      quantity\n      price\n      discountedPrice\n    }\n  }\n": typeof types.CartDocument,
    "\n  mutation RemoveFromCart($input: RemoveFromCartInput!) {\n    removeFromCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n  }\n": typeof types.RemoveFromCartDocument,
    "\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n\tquery GetOrderByPaymentId($input: GetOrderByPaymentIdInput!) {\n    getOrderByPaymentId(input: $input) {\n      id\n      number\n      status\n      method\n      firstName\n      lastName\n      email\n      phone\n      country\n      city\n      state\n      address\n      zipCode\n      subtotalAmount\n      discountAmount\n      taxAmount\n      deliveryAmount\n      totalAmount\n      currency\n      createdAt\n      items {\n        id\n        productName\n        quantity\n        price\n        totalPrice\n        product {\n          id\n          name\n          images\n        }\n      }\n    }\n  }\n": typeof types.GetOrderByPaymentIdDocument,
    "\n\tmutation CreateOrder($input: CreateOrderInput!) {\n\t\tcreate(input: $input) {\n\t\t\turl\n\t\t}\n\t}\n": typeof types.CreateOrderDocument,
    "\n\tquery GetNotifications {\n\t\tnotifications {\n\t\t\tid\n\t\t\tdata\n\t\t\ttype\n\t\t\treadAt\n\t\t\tcreatedAt\n\t\t}\n\t}\n": typeof types.GetNotificationsDocument,
    "\n  mutation MarkNotificationsAsRead($input: MarkNotificationsAsReadInput!) {\n    markNotificationsAsRead(input: $input) {\n      id\n      readAt\n    }\n  }\n": typeof types.MarkNotificationsAsReadDocument,
    "\n\tquery GetOrders($input: PaginationInput!) {\n\t\torders(input: $input) {\n      orders {\n        id\n        number\n        status\n        method\n        firstName\n        lastName\n        email\n        phone\n        country\n        city\n        state\n        address\n        zipCode\n        subtotalAmount\n        discountAmount\n        taxAmount\n        deliveryAmount\n        totalAmount\n        currency\n        createdAt\n        items {\n          id\n          productName\n          quantity\n          price\n          totalPrice\n          product {\n            id\n            name\n            images\n          }\n        }\n      }\n      total\n\t\t}\n\t}\n": typeof types.GetOrdersDocument,
    "\n\tquery GetProducts($input: GetProductsInput!, $filters: JSON) {\n\t\tproducts(input: $input, filters: $filters) {\n\t\t\tproducts {\n\t\t\t\tid\n  \t\t\tslug\n  \t\t\tname\n  \t\t\tdescription\n  \t\t\tprice\n  \t\t\tdiscountPercent\n  \t\t\tstock\n  \t\t\tisFeatured\n  \t\t\timages\n  \t\t\tspecifications\n\t\t\t}\n\t\t\tfilters {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\toptions {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetProductsDocument,
    "\n\tmutation UpdateAccountDetails($input: UpdateAccountDetailsInput!) {\n\t\tupdateAccountDetails(input: $input) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\tphone\n\t\t\tcity\n\t\t\tcountry\n\t\t\tstate\n\t\t\taddress\n\t\t\tzipCode\n\t\t}\n\t}\n": typeof types.UpdateAccountDetailsDocument,
};
const documents: Documents = {
    "\n\tmutation SignOut {\n\t\tsignOut{\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SignOutDocument,
    "\n  query VerifySession {\n    verifySession {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n": types.VerifySessionDocument,
    "\n  mutation EmailConfirmation($input: EmailConfirmationInput!) {\n    emailConfirmation(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n": types.EmailConfirmationDocument,
    "\n  mutation ForgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input) {\n      success\n    }\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n": types.SignUpDocument,
    "\n\tmutation AddToCart($input: AddToCartInput!) {\n\t\taddToCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n\t}\n": types.AddToCartDocument,
    "\n  query Cart {\n    cart {\n      id\n      product {\n        id\n        slug\n        name\n        stock\n        images\n      }\n      quantity\n      price\n      discountedPrice\n    }\n  }\n": types.CartDocument,
    "\n  mutation RemoveFromCart($input: RemoveFromCartInput!) {\n    removeFromCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n  }\n": types.RemoveFromCartDocument,
    "\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n": types.GetCategoriesDocument,
    "\n\tquery GetOrderByPaymentId($input: GetOrderByPaymentIdInput!) {\n    getOrderByPaymentId(input: $input) {\n      id\n      number\n      status\n      method\n      firstName\n      lastName\n      email\n      phone\n      country\n      city\n      state\n      address\n      zipCode\n      subtotalAmount\n      discountAmount\n      taxAmount\n      deliveryAmount\n      totalAmount\n      currency\n      createdAt\n      items {\n        id\n        productName\n        quantity\n        price\n        totalPrice\n        product {\n          id\n          name\n          images\n        }\n      }\n    }\n  }\n": types.GetOrderByPaymentIdDocument,
    "\n\tmutation CreateOrder($input: CreateOrderInput!) {\n\t\tcreate(input: $input) {\n\t\t\turl\n\t\t}\n\t}\n": types.CreateOrderDocument,
    "\n\tquery GetNotifications {\n\t\tnotifications {\n\t\t\tid\n\t\t\tdata\n\t\t\ttype\n\t\t\treadAt\n\t\t\tcreatedAt\n\t\t}\n\t}\n": types.GetNotificationsDocument,
    "\n  mutation MarkNotificationsAsRead($input: MarkNotificationsAsReadInput!) {\n    markNotificationsAsRead(input: $input) {\n      id\n      readAt\n    }\n  }\n": types.MarkNotificationsAsReadDocument,
    "\n\tquery GetOrders($input: PaginationInput!) {\n\t\torders(input: $input) {\n      orders {\n        id\n        number\n        status\n        method\n        firstName\n        lastName\n        email\n        phone\n        country\n        city\n        state\n        address\n        zipCode\n        subtotalAmount\n        discountAmount\n        taxAmount\n        deliveryAmount\n        totalAmount\n        currency\n        createdAt\n        items {\n          id\n          productName\n          quantity\n          price\n          totalPrice\n          product {\n            id\n            name\n            images\n          }\n        }\n      }\n      total\n\t\t}\n\t}\n": types.GetOrdersDocument,
    "\n\tquery GetProducts($input: GetProductsInput!, $filters: JSON) {\n\t\tproducts(input: $input, filters: $filters) {\n\t\t\tproducts {\n\t\t\t\tid\n  \t\t\tslug\n  \t\t\tname\n  \t\t\tdescription\n  \t\t\tprice\n  \t\t\tdiscountPercent\n  \t\t\tstock\n  \t\t\tisFeatured\n  \t\t\timages\n  \t\t\tspecifications\n\t\t\t}\n\t\t\tfilters {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\toptions {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetProductsDocument,
    "\n\tmutation UpdateAccountDetails($input: UpdateAccountDetailsInput!) {\n\t\tupdateAccountDetails(input: $input) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\tphone\n\t\t\tcity\n\t\t\tcountry\n\t\t\tstate\n\t\t\taddress\n\t\t\tzipCode\n\t\t}\n\t}\n": types.UpdateAccountDetailsDocument,
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
export function gql(source: "\n\tmutation SignOut {\n\t\tsignOut{\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation SignOut {\n\t\tsignOut{\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query VerifySession {\n    verifySession {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query VerifySession {\n    verifySession {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EmailConfirmation($input: EmailConfirmationInput!) {\n    emailConfirmation(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EmailConfirmation($input: EmailConfirmationInput!) {\n    emailConfirmation(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      fullName\n      avatar\n      isTwoFactorEnabled\n      createdAt\n      accountDetails {\n        firstName\n        lastName\n        email\n        phone\n        city\n        country\n        state\n        address\n        zipCode\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation AddToCart($input: AddToCartInput!) {\n\t\taddToCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddToCart($input: AddToCartInput!) {\n\t\taddToCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Cart {\n    cart {\n      id\n      product {\n        id\n        slug\n        name\n        stock\n        images\n      }\n      quantity\n      price\n      discountedPrice\n    }\n  }\n"): (typeof documents)["\n  query Cart {\n    cart {\n      id\n      product {\n        id\n        slug\n        name\n        stock\n        images\n      }\n      quantity\n      price\n      discountedPrice\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveFromCart($input: RemoveFromCartInput!) {\n    removeFromCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n  }\n"): (typeof documents)["\n  mutation RemoveFromCart($input: RemoveFromCartInput!) {\n    removeFromCart(input: $input) {\n\t\t\tid\n\t\t\tproduct {\n        id\n\t\t\t\tslug\n\t\t\t\tname\n\t\t\t\tstock\n\t\t\t\timages\n\t\t\t}\n\t\t\tquantity\n\t\t\tprice\n\t\t\tdiscountedPrice\n\t\t}\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      slug\n      name\n      subcategories {\n        slug\n        name\n        image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetOrderByPaymentId($input: GetOrderByPaymentIdInput!) {\n    getOrderByPaymentId(input: $input) {\n      id\n      number\n      status\n      method\n      firstName\n      lastName\n      email\n      phone\n      country\n      city\n      state\n      address\n      zipCode\n      subtotalAmount\n      discountAmount\n      taxAmount\n      deliveryAmount\n      totalAmount\n      currency\n      createdAt\n      items {\n        id\n        productName\n        quantity\n        price\n        totalPrice\n        product {\n          id\n          name\n          images\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n\tquery GetOrderByPaymentId($input: GetOrderByPaymentIdInput!) {\n    getOrderByPaymentId(input: $input) {\n      id\n      number\n      status\n      method\n      firstName\n      lastName\n      email\n      phone\n      country\n      city\n      state\n      address\n      zipCode\n      subtotalAmount\n      discountAmount\n      taxAmount\n      deliveryAmount\n      totalAmount\n      currency\n      createdAt\n      items {\n        id\n        productName\n        quantity\n        price\n        totalPrice\n        product {\n          id\n          name\n          images\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateOrder($input: CreateOrderInput!) {\n\t\tcreate(input: $input) {\n\t\t\turl\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateOrder($input: CreateOrderInput!) {\n\t\tcreate(input: $input) {\n\t\t\turl\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNotifications {\n\t\tnotifications {\n\t\t\tid\n\t\t\tdata\n\t\t\ttype\n\t\t\treadAt\n\t\t\tcreatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNotifications {\n\t\tnotifications {\n\t\t\tid\n\t\t\tdata\n\t\t\ttype\n\t\t\treadAt\n\t\t\tcreatedAt\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MarkNotificationsAsRead($input: MarkNotificationsAsReadInput!) {\n    markNotificationsAsRead(input: $input) {\n      id\n      readAt\n    }\n  }\n"): (typeof documents)["\n  mutation MarkNotificationsAsRead($input: MarkNotificationsAsReadInput!) {\n    markNotificationsAsRead(input: $input) {\n      id\n      readAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetOrders($input: PaginationInput!) {\n\t\torders(input: $input) {\n      orders {\n        id\n        number\n        status\n        method\n        firstName\n        lastName\n        email\n        phone\n        country\n        city\n        state\n        address\n        zipCode\n        subtotalAmount\n        discountAmount\n        taxAmount\n        deliveryAmount\n        totalAmount\n        currency\n        createdAt\n        items {\n          id\n          productName\n          quantity\n          price\n          totalPrice\n          product {\n            id\n            name\n            images\n          }\n        }\n      }\n      total\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetOrders($input: PaginationInput!) {\n\t\torders(input: $input) {\n      orders {\n        id\n        number\n        status\n        method\n        firstName\n        lastName\n        email\n        phone\n        country\n        city\n        state\n        address\n        zipCode\n        subtotalAmount\n        discountAmount\n        taxAmount\n        deliveryAmount\n        totalAmount\n        currency\n        createdAt\n        items {\n          id\n          productName\n          quantity\n          price\n          totalPrice\n          product {\n            id\n            name\n            images\n          }\n        }\n      }\n      total\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetProducts($input: GetProductsInput!, $filters: JSON) {\n\t\tproducts(input: $input, filters: $filters) {\n\t\t\tproducts {\n\t\t\t\tid\n  \t\t\tslug\n  \t\t\tname\n  \t\t\tdescription\n  \t\t\tprice\n  \t\t\tdiscountPercent\n  \t\t\tstock\n  \t\t\tisFeatured\n  \t\t\timages\n  \t\t\tspecifications\n\t\t\t}\n\t\t\tfilters {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\toptions {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetProducts($input: GetProductsInput!, $filters: JSON) {\n\t\tproducts(input: $input, filters: $filters) {\n\t\t\tproducts {\n\t\t\t\tid\n  \t\t\tslug\n  \t\t\tname\n  \t\t\tdescription\n  \t\t\tprice\n  \t\t\tdiscountPercent\n  \t\t\tstock\n  \t\t\tisFeatured\n  \t\t\timages\n  \t\t\tspecifications\n\t\t\t}\n\t\t\tfilters {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\toptions {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateAccountDetails($input: UpdateAccountDetailsInput!) {\n\t\tupdateAccountDetails(input: $input) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\tphone\n\t\t\tcity\n\t\t\tcountry\n\t\t\tstate\n\t\t\taddress\n\t\t\tzipCode\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateAccountDetails($input: UpdateAccountDetailsInput!) {\n\t\tupdateAccountDetails(input: $input) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\tphone\n\t\t\tcity\n\t\t\tcountry\n\t\t\tstate\n\t\t\taddress\n\t\t\tzipCode\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;