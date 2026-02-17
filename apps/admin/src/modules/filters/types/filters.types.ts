export interface Filter {
	id: string
	name: string
	slug: string
	position: number
	options: FilterOption[]
	subcategoryId: string
}

export interface FilterOption {
	id: string
	value: string
	label: string
	position: number
	filterId: string
}
