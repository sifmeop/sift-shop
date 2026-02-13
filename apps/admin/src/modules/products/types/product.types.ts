export interface Product {
	name: string
	id: string
	slug: string
	description: string | null
	price: string
	compareAtPrice: string
	inStock: boolean
	isFeatured: boolean
	thumbnail: string
	images: string[]
	subcategoryId: string
	filterValues: Record<string, string>
	specifications: Record<string, string>
	createdAt: string
}
