export const FilterType = {
	CHECKBOX: 'CHECKBOX',
	RANGE: 'RANGE'
} as const

export const filterTypeKeys: (keyof typeof FilterType)[] = [
	'CHECKBOX',
	'RANGE'
] as const

export type FilterType = (typeof FilterType)[keyof typeof FilterType]

export interface Filter {
	id: string
	name: string
	value: string
	type: FilterType
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
