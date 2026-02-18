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
