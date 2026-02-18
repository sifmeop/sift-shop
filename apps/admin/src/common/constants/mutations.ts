export const MUTATIONS = {
	LOGIN: ['login'],
	LOGOUT: ['logout'],

	GET_CATEGORIES: ['get-categories'],
	CREATE_CATEGORY: ['create-category'],
	UPDATE_CATEGORY: (id: string) => ['update-category', id],
	DELETE_CATEGORY: (id: string) => ['delete-category', id],
	UPDATE_STATUS_CATEGORY: (id: string) => ['update-status-category', id],

	GET_SUBCATEGORIES: ['get-subcategories'],
	CREATE_SUBCATEGORY: ['create-subcategory'],
	UPDATE_SUBCATEGORY: (id: string) => ['update-subcategory', id],
	DELETE_SUBCATEGORY: (id: string) => ['delete-subcategory', id],
	UPDATE_STATUS_SUBCATEGORY: (id: string) => ['update-status-subcategory', id],

	CREATE_FILTER: ['create-filter'],
	UPDATE_FILTER: (id: string) => ['update-filter', id],
	DELETE_FILTER: (id: string) => ['delete-filter', id],
	UPDATE_STATUS_FILTER: (id: string) => ['update-status-filter', id],
	UPDATE_POSITION: ['update-position'],

	CREATE_PRODUCT: ['create-product'],
	UPDATE_PRODUCT: (id: string) => ['update-product', id],
	DELETE_PRODUCT: (id: string) => ['delete-product', id]
}
