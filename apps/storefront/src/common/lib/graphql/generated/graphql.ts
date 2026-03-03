/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AccountDetailsEntity = {
  __typename?: 'AccountDetailsEntity';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  zipCode: Scalars['String']['output'];
};

export type AddToCartInput = {
  productId: Scalars['String']['input'];
};

export type AuthEntity = {
  __typename?: 'AuthEntity';
  accountDetails?: Maybe<AccountDetailsEntity>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isTwoFactorEnabled: Scalars['Boolean']['output'];
};

export type CartItemEntity = {
  __typename?: 'CartItemEntity';
  discountedPrice?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isPriceChanged?: Maybe<Scalars['Boolean']['output']>;
  price: Scalars['Float']['output'];
  product: CartProductItemEntity;
  quantity: Scalars['Int']['output'];
};

export type CartProductItemEntity = {
  __typename?: 'CartProductItemEntity';
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  subcategories: Array<SubcategoryEntity>;
};

export type CategoryRefEntity = {
  __typename?: 'CategoryRefEntity';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type CreateOrderEntity = {
  __typename?: 'CreateOrderEntity';
  url: Scalars['String']['output'];
};

export type CreateOrderInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  method: PaymentMethod;
  phone: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  zipCode: Scalars['String']['input'];
};

export type EmailConfirmationInput = {
  token: Scalars['String']['input'];
};

export type FilterOptionEntity = {
  __typename?: 'FilterOptionEntity';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  productCount: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type GetOrderByPaymentIdInput = {
  id: Scalars['String']['input'];
};

export type GetProductsInput = {
  subcategory: Scalars['String']['input'];
};

export type HomeProductsEntity = {
  __typename?: 'HomeProductsEntity';
  bestSelling: Array<ProductEntity>;
  featured: Array<ProductEntity>;
};

export type LogoutEntity = {
  __typename?: 'LogoutEntity';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: CartItemEntity;
  addToWishlist: WishlistItemEntity;
  create: CreateOrderEntity;
  deleteReview: Scalars['Boolean']['output'];
  disableTwoFactorAuth: Scalars['Boolean']['output'];
  emailConfirmation: AuthEntity;
  enableTwoFactorAuth: Scalars['Boolean']['output'];
  forgotPassword: SuccessEntity;
  markNotificationsAsRead: Array<NotificationEntity>;
  removeFromCart: CartItemEntity;
  removeFromWishlist: WishlistItemEntity;
  resetPassword: SuccessEntity;
  signIn: AuthEntity;
  signOut: LogoutEntity;
  signUp: SuccessEntity;
  updateAccountDetails: AccountDetailsEntity;
  upsertReview: ReviewEntity;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationAddToWishlistArgs = {
  productId: Scalars['String']['input'];
};


export type MutationCreateArgs = {
  input: CreateOrderInput;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableTwoFactorAuthArgs = {
  code: Scalars['String']['input'];
};


export type MutationEmailConfirmationArgs = {
  input: EmailConfirmationInput;
};


export type MutationEnableTwoFactorAuthArgs = {
  code: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationRemoveFromCartArgs = {
  input: RemoveFromCartInput;
};


export type MutationRemoveFromWishlistArgs = {
  productId: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateAccountDetailsArgs = {
  input: UpdateAccountDetailsInput;
};


export type MutationUpsertReviewArgs = {
  input: UpsertReviewInput;
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  type: NotificationType;
};

/** Notification type */
export enum NotificationType {
  OrderCancelled = 'ORDER_CANCELLED',
  OrderPlaced = 'ORDER_PLACED',
  PasswordChanged = 'PASSWORD_CHANGED',
  TwoFactorDisabled = 'TWO_FACTOR_DISABLED',
  TwoFactorEnabled = 'TWO_FACTOR_ENABLED'
}

export type OrderEntity = {
  __typename?: 'OrderEntity';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  deliveryAmount: Scalars['Float']['output'];
  discountAmount: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItemEntity>;
  lastName: Scalars['String']['output'];
  method: PaymentMethod;
  number: Scalars['Int']['output'];
  phone: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  status: OrderStatus;
  subtotalAmount: Scalars['Float']['output'];
  taxAmount: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
  zipCode: Scalars['String']['output'];
};

export type OrderItemEntity = {
  __typename?: 'OrderItemEntity';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  product: OrderItemProductEntity;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  totalPrice: Scalars['Float']['output'];
};

export type OrderItemProductEntity = {
  __typename?: 'OrderItemProductEntity';
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

/** Order status */
export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type OrdersEntity = {
  __typename?: 'OrdersEntity';
  orders: Array<OrderEntity>;
  total: Scalars['Int']['output'];
};

export type PaginationInput = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

/** Payment method */
export enum PaymentMethod {
  Card = 'CARD',
  Cash = 'CASH'
}

export type ProductDetailEntity = {
  __typename?: 'ProductDetailEntity';
  category: CategoryRefEntity;
  description?: Maybe<Scalars['String']['output']>;
  discountPercent?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  isFeatured: Scalars['Boolean']['output'];
  isPurchased: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  specifications: Scalars['JSON']['output'];
  stock: Scalars['Int']['output'];
  subcategory: SubcategoryRefEntity;
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  description?: Maybe<Scalars['String']['output']>;
  discountPercent?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  isFeatured: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  specifications: Scalars['JSON']['output'];
  stock: Scalars['Int']['output'];
};

export type ProductFiltersEntity = {
  __typename?: 'ProductFiltersEntity';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  options: Array<FilterOptionEntity>;
  slug: Scalars['String']['output'];
};

export type ProductResponseEntity = {
  __typename?: 'ProductResponseEntity';
  filters: Array<ProductFiltersEntity>;
  products: Array<ProductEntity>;
};

export type Query = {
  __typename?: 'Query';
  cart: Array<CartItemEntity>;
  categories: Array<CategoryEntity>;
  generateTwoFactorSecret: TwoFactorSetupOutputEntity;
  getOrderByPaymentId: OrderEntity;
  homeProducts: HomeProductsEntity;
  notifications: Array<NotificationEntity>;
  orders: OrdersEntity;
  product?: Maybe<ProductDetailEntity>;
  products: ProductResponseEntity;
  relatedProducts: Array<ProductEntity>;
  reviews: Array<ReviewEntity>;
  schema: Scalars['String']['output'];
  search: Array<SearchEntity>;
  verifySession: AuthEntity;
  wishlist: WishlistEntity;
};


export type QueryGetOrderByPaymentIdArgs = {
  input: GetOrderByPaymentIdInput;
};


export type QueryOrdersArgs = {
  input: PaginationInput;
};


export type QueryProductArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  input: GetProductsInput;
};


export type QueryRelatedProductsArgs = {
  productId: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};


export type QueryReviewsArgs = {
  productId: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  q: Scalars['String']['input'];
};

export type RemoveFromCartInput = {
  id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ReviewEntity = {
  __typename?: 'ReviewEntity';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type SearchEntity = {
  __typename?: 'SearchEntity';
  discountPercent?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export type SignInInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  recaptha: Scalars['String']['input'];
};

export type SubcategoryEntity = {
  __typename?: 'SubcategoryEntity';
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SubcategoryRefEntity = {
  __typename?: 'SubcategoryRefEntity';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SuccessEntity = {
  __typename?: 'SuccessEntity';
  success: Scalars['Boolean']['output'];
};

export type TwoFactorSetupOutputEntity = {
  __typename?: 'TwoFactorSetupOutputEntity';
  otpAuthUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type UpdateAccountDetailsInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  zipCode: Scalars['String']['input'];
};

export type UpsertReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};

export type WishlistEntity = {
  __typename?: 'WishlistEntity';
  id: Scalars['ID']['output'];
  items: Array<WishlistItemEntity>;
};

export type WishlistItemEntity = {
  __typename?: 'WishlistItemEntity';
  addedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  product: WishlistProductEntity;
};

export type WishlistProductEntity = {
  __typename?: 'WishlistProductEntity';
  discountPercent?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'LogoutEntity', success: boolean } };

export type VerifySessionQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifySessionQuery = { __typename?: 'Query', verifySession: { __typename?: 'AuthEntity', id: string, email: string, fullName: string, avatar?: string | null, isTwoFactorEnabled: boolean, createdAt: any, accountDetails?: { __typename?: 'AccountDetailsEntity', firstName: string, lastName: string, email: string, phone: string, city: string, country: string, state?: string | null, address: string, zipCode: string } | null } };

export type EmailConfirmationMutationVariables = Exact<{
  input: EmailConfirmationInput;
}>;


export type EmailConfirmationMutation = { __typename?: 'Mutation', emailConfirmation: { __typename?: 'AuthEntity', id: string, email: string, fullName: string, avatar?: string | null, isTwoFactorEnabled: boolean, createdAt: any, accountDetails?: { __typename?: 'AccountDetailsEntity', firstName: string, lastName: string, email: string, phone: string, city: string, country: string, state?: string | null, address: string, zipCode: string } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'SuccessEntity', success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'SuccessEntity', success: boolean } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthEntity', id: string, email: string, fullName: string, avatar?: string | null, isTwoFactorEnabled: boolean, createdAt: any, accountDetails?: { __typename?: 'AccountDetailsEntity', firstName: string, lastName: string, email: string, phone: string, city: string, country: string, state?: string | null, address: string, zipCode: string } | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SuccessEntity', success: boolean } };

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'CartItemEntity', id: string, quantity: number, price: number, discountedPrice?: number | null, isPriceChanged?: boolean | null, product: { __typename?: 'CartProductItemEntity', id: string, slug: string, name: string, stock: number, images: Array<string> } } };

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename?: 'Query', cart: Array<{ __typename?: 'CartItemEntity', id: string, quantity: number, price: number, discountedPrice?: number | null, isPriceChanged?: boolean | null, product: { __typename?: 'CartProductItemEntity', id: string, slug: string, name: string, stock: number, images: Array<string> } }> };

export type RemoveFromCartMutationVariables = Exact<{
  input: RemoveFromCartInput;
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: { __typename?: 'CartItemEntity', id: string, quantity: number, price: number, discountedPrice?: number | null, isPriceChanged?: boolean | null, product: { __typename?: 'CartProductItemEntity', id: string, slug: string, name: string, stock: number, images: Array<string> } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', slug: string, name: string, subcategories: Array<{ __typename?: 'SubcategoryEntity', slug: string, name: string, image: string }> }> };

export type GetOrderByPaymentIdQueryVariables = Exact<{
  input: GetOrderByPaymentIdInput;
}>;


export type GetOrderByPaymentIdQuery = { __typename?: 'Query', getOrderByPaymentId: { __typename?: 'OrderEntity', id: string, number: number, status: OrderStatus, method: PaymentMethod, firstName: string, lastName: string, email: string, phone: string, country: string, city: string, state?: string | null, address: string, zipCode: string, subtotalAmount: number, discountAmount: number, taxAmount: number, deliveryAmount: number, totalAmount: number, currency: string, createdAt: any, items: Array<{ __typename?: 'OrderItemEntity', id: string, productName: string, quantity: number, price: number, totalPrice: number, product: { __typename?: 'OrderItemProductEntity', id: string, name: string, images: Array<string> } }> } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', create: { __typename?: 'CreateOrderEntity', url: string } };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'NotificationEntity', id: string, data?: any | null, type: NotificationType, readAt?: any | null, createdAt: any }> };

export type MarkNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkNotificationsAsReadMutation = { __typename?: 'Mutation', markNotificationsAsRead: Array<{ __typename?: 'NotificationEntity', id: string, readAt?: any | null }> };

export type GetOrdersQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetOrdersQuery = { __typename?: 'Query', orders: { __typename?: 'OrdersEntity', total: number, orders: Array<{ __typename?: 'OrderEntity', id: string, number: number, status: OrderStatus, method: PaymentMethod, firstName: string, lastName: string, email: string, phone: string, country: string, city: string, state?: string | null, address: string, zipCode: string, subtotalAmount: number, discountAmount: number, taxAmount: number, deliveryAmount: number, totalAmount: number, currency: string, createdAt: any, items: Array<{ __typename?: 'OrderItemEntity', id: string, productName: string, quantity: number, price: number, totalPrice: number, product: { __typename?: 'OrderItemProductEntity', id: string, name: string, images: Array<string> } }> }> } };

export type GetHomeProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeProductsQuery = { __typename?: 'Query', homeProducts: { __typename?: 'HomeProductsEntity', bestSelling: Array<{ __typename?: 'ProductEntity', id: string, slug: string, name: string, images: Array<string>, stock: number, price: number, discountPercent?: number | null }>, featured: Array<{ __typename?: 'ProductEntity', id: string, slug: string, name: string, images: Array<string>, stock: number, price: number, discountPercent?: number | null }> } };

export type GetProductsQueryVariables = Exact<{
  input: GetProductsInput;
  filters?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductResponseEntity', products: Array<{ __typename?: 'ProductEntity', id: string, slug: string, name: string, description?: string | null, price: number, discountPercent?: number | null, stock: number, isFeatured: boolean, images: Array<string>, specifications: any }>, filters: Array<{ __typename?: 'ProductFiltersEntity', id: string, name: string, slug: string, options: Array<{ __typename?: 'FilterOptionEntity', id: string, label: string, value: string, productCount: number }> }> } };

export type GetProductDetailQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProductDetailQuery = { __typename?: 'Query', product?: { __typename?: 'ProductDetailEntity', id: string, slug: string, name: string, description?: string | null, price: number, discountPercent?: number | null, stock: number, isFeatured: boolean, images: Array<string>, specifications: any, isPurchased: boolean, rating: number, reviewCount: number, category: { __typename?: 'CategoryRefEntity', slug: string, name: string }, subcategory: { __typename?: 'SubcategoryRefEntity', slug: string, name: string } } | null };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: boolean };

export type GetRelatedProductsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;


export type GetRelatedProductsQuery = { __typename?: 'Query', relatedProducts: Array<{ __typename?: 'ProductEntity', id: string, slug: string, name: string, description?: string | null, price: number, discountPercent?: number | null, stock: number, isFeatured: boolean, images: Array<string>, specifications: any }> };

export type GetReviewsQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'ReviewEntity', id: string, fullName: string, rating: number, comment?: string | null, userId: string, createdAt: any }> };

export type UpsertReviewMutationVariables = Exact<{
  input: UpsertReviewInput;
}>;


export type UpsertReviewMutation = { __typename?: 'Mutation', upsertReview: { __typename?: 'ReviewEntity', id: string, fullName: string, rating: number, comment?: string | null, userId: string, createdAt: any } };

export type UpdateAccountDetailsMutationVariables = Exact<{
  input: UpdateAccountDetailsInput;
}>;


export type UpdateAccountDetailsMutation = { __typename?: 'Mutation', updateAccountDetails: { __typename?: 'AccountDetailsEntity', firstName: string, lastName: string, email: string, phone: string, city: string, country: string, state?: string | null, address: string, zipCode: string } };

export type SearchQueryVariables = Exact<{
  q: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchEntity', id: string, slug: string, name: string, stock: number, discountPercent?: number | null, price: number, images: Array<string> }> };

export type DisableTwoFactorAuthMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type DisableTwoFactorAuthMutation = { __typename?: 'Mutation', disableTwoFactorAuth: boolean };

export type EnableTwoFactorAuthMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type EnableTwoFactorAuthMutation = { __typename?: 'Mutation', enableTwoFactorAuth: boolean };

export type GenerateTwoFactorSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTwoFactorSecretQuery = { __typename?: 'Query', generateTwoFactorSecret: { __typename?: 'TwoFactorSetupOutputEntity', secret: string, otpAuthUrl: string } };

export type AddToWishlistMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type AddToWishlistMutation = { __typename?: 'Mutation', addToWishlist: { __typename?: 'WishlistItemEntity', id: string, addedAt: any, product: { __typename?: 'WishlistProductEntity', id: string, slug: string, name: string, price: number, discountPercent?: number | null, stock: number, images: Array<string> } } };

export type GetWishlistQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWishlistQuery = { __typename?: 'Query', wishlist: { __typename?: 'WishlistEntity', id: string, items: Array<{ __typename?: 'WishlistItemEntity', id: string, addedAt: any, product: { __typename?: 'WishlistProductEntity', id: string, slug: string, name: string, price: number, discountPercent?: number | null, stock: number, images: Array<string> } }> } };

export type RemoveFromWishlistMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type RemoveFromWishlistMutation = { __typename?: 'Mutation', removeFromWishlist: { __typename?: 'WishlistItemEntity', id: string, addedAt: any, product: { __typename?: 'WishlistProductEntity', id: string, slug: string, name: string, price: number, discountPercent?: number | null, stock: number, images: Array<string> } } };


export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const VerifySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifySession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifySession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isTwoFactorEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"accountDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}}]} as unknown as DocumentNode<VerifySessionQuery, VerifySessionQueryVariables>;
export const EmailConfirmationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailConfirmation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailConfirmationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailConfirmation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isTwoFactorEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"accountDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}}]} as unknown as DocumentNode<EmailConfirmationMutation, EmailConfirmationMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isTwoFactorEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"accountDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const AddToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddToCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isPriceChanged"}}]}}]}}]} as unknown as DocumentNode<AddToCartMutation, AddToCartMutationVariables>;
export const CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isPriceChanged"}}]}}]}}]} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const RemoveFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveFromCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isPriceChanged"}}]}}]}}]} as unknown as DocumentNode<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetOrderByPaymentIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderByPaymentId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetOrderByPaymentIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrderByPaymentId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"taxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderByPaymentIdQuery, GetOrderByPaymentIdQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const MarkNotificationsAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationsAsRead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationsAsRead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]}}]} as unknown as DocumentNode<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"taxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetHomeProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"homeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bestSelling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featured"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeProductsQuery, GetHomeProductsQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetProductsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"specifications"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"productCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"specifications"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductDetailQuery, GetProductDetailQueryVariables>;
export const DeleteReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const GetRelatedProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRelatedProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"specifications"}}]}}]}}]} as unknown as DocumentNode<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>;
export const GetReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetReviewsQuery, GetReviewsQueryVariables>;
export const UpsertReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertReviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpsertReviewMutation, UpsertReviewMutationVariables>;
export const UpdateAccountDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccountDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccountDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccountDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]} as unknown as DocumentNode<UpdateAccountDetailsMutation, UpdateAccountDetailsMutationVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const DisableTwoFactorAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableTwoFactorAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableTwoFactorAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<DisableTwoFactorAuthMutation, DisableTwoFactorAuthMutationVariables>;
export const EnableTwoFactorAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableTwoFactorAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableTwoFactorAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<EnableTwoFactorAuthMutation, EnableTwoFactorAuthMutationVariables>;
export const GenerateTwoFactorSecretDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenerateTwoFactorSecret"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateTwoFactorSecret"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"secret"}},{"kind":"Field","name":{"kind":"Name","value":"otpAuthUrl"}}]}}]}}]} as unknown as DocumentNode<GenerateTwoFactorSecretQuery, GenerateTwoFactorSecretQueryVariables>;
export const AddToWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWishlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addedAt"}}]}}]}}]} as unknown as DocumentNode<AddToWishlistMutation, AddToWishlistMutationVariables>;
export const GetWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWishlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wishlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetWishlistQuery, GetWishlistQueryVariables>;
export const RemoveFromWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWishlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercent"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addedAt"}}]}}]}}]} as unknown as DocumentNode<RemoveFromWishlistMutation, RemoveFromWishlistMutationVariables>;