export const QUERIES = {
	VERIFY_SESSION: ['verify-session'],

	GET_CATEGORIES: ['get-categories'],

	GET_SUBCATEGORIES: (slug: string) => ['get-subcategories', slug],

	GET_PRODUCTS: ['get-products'],

	GET_FILTERS: (slug: string) => ['get-filters', slug]
}
