export const QUERIES = {
	VERIFY_SESSION: ['verify-session'],

	GET_CATEGORIES: ['get-categories'],

	GET_SUBCATEGORIES: (slug: string) => ['get-subcategories', slug],

	GET_PRODUCTS: ['get-products'],

	GET_REVIEWS: (productId: string) => ['get-reviews', productId],

	GET_CUSTOMERS: ['get-customers'],

	GET_ORDERS: ['get-orders'],

	GET_DASHBOARD: ['get-dashboard'],

	GET_FILTERS: (slug: string) => ['get-filters', slug]
}
