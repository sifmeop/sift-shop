export const MUTATIONS = {
	LOGIN: ['login'],
	LOGOUT: ['logout'],

	GET_CATEGORIES: ['get-categories'],
	CREATE_CATEGORY: ['create-category'],
	UPDATE_CATEGORY: (id: string) => ['update-category', id],
	DELETE_CATEGORY: (id: string) => ['delete-category', id],

	GET_SUBCATEGORIES: ['get-subcategories'],
	CREATE_SUBCATEGORY: ['create-subcategory'],
	UPDATE_SUBCATEGORY: (id: string) => ['update-subcategory', id],
	DELETE_SUBCATEGORY: (id: string) => ['delete-subcategory', id]
}
