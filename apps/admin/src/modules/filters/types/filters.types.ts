export interface Filter {
	id: string
	name: string
	slug: string
	position: number
	isActive: boolean
	options: FilterOption[]
	subcategoryId: string
}

export interface FilterOption {
	id: string
	value: string
	label: string
	isActive: boolean
	position: number
	filterId: string
}

export interface FilterOptionBody {
	label: string
	value: string
	position: number
}

export interface FilterBody {
	name: string
	value: string
	options: FilterOptionBody[]
}

export interface FilterSubcategory {
	id: string
	name: string
	slug: string
}

