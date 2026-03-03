import type { FilterSubcategory } from '../types/filters.types'
import { AddFilter } from './actions/AddFilter'
import { FilterSubcategorySelect } from './FilterSubcategorySelect'
import { FiltersSearch } from './FiltersSearch'

interface FiltersHeaderProps {
	searchValue: string
	onSearchChange: (value: string) => void
	subcategories: FilterSubcategory[]
	selectedSubcategorySlug: string
	onSubcategoryChange: (value: string) => void
	isSubcategoriesLoading: boolean
}

export const FiltersHeader = ({
	searchValue,
	onSearchChange,
	subcategories,
	selectedSubcategorySlug,
	onSubcategoryChange,
	isSubcategoriesLoading
}: FiltersHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Filters</h3>
			<div className='flex items-center gap-2'>
				<AddFilter
					subcategories={subcategories}
					selectedSubcategorySlug={selectedSubcategorySlug}
				/>
				<FilterSubcategorySelect
					items={subcategories}
					value={selectedSubcategorySlug}
					onChange={onSubcategoryChange}
					disabled={isSubcategoriesLoading}
				/>
				<FiltersSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}

