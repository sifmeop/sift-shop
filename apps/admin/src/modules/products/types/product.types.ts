export interface Product {
	id: string
	slug: string
	name: string
	sku: string
	description: string | null
	stock: number
	price: string
	discountPercent: number | null
	images: string[]
	isFeatured: boolean
	isActive: boolean
	specifications: Record<string, string>
	subcategoryId: string
	createdAt: string
	updatedAt: string
	filters: {
		id: string
		value: string
		label: string
		position: number
		isActive: boolean
		filterId: string
		createdAt: string
		updatedAt: string
		filter: {
			id: string
			name: string
			slug: string
			position: number
			isActive: boolean
			subcategoryId: string
			createdAt: string
			updatedAt: string
		}
	}[]
}

export interface ProductSubcategory {
	id: string
	name: string
	slug: string
	productsCount: number
}

export interface ProductFilter {
	id: string
	name: string
	slug: string
	options: ProductFilterOption[]
}

export interface ProductFilterOption {
	id: string
	label: string
	value: string
}
