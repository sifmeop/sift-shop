export interface Review {
	id: string
	productId: string
	userId: string
	fullName: string
	rating: number
	comment: string | null
	createdAt: string
}

