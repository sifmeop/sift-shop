import type { Category } from '~/modules/categories'
import { AddSubcategory } from './actions/AddSubcategory'
import { CategorySelect } from './CategorySelect'
import { SubcategorySearch } from './SubcategorySearch'

interface SubcategoriesHeaderProps {
	categorySlug: string
	onCategoryChange: (slug: string) => void
	categories: Category[]
	searchValue: string
	onSearchChange: (value: string) => void
	isCategoriesLoading: boolean
}

export const SubcategoriesHeader = ({
	categorySlug,
	onCategoryChange,
	categories,
	searchValue,
	onSearchChange,
	isCategoriesLoading
}: SubcategoriesHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Subcategories</h3>
			<div className='flex items-center gap-2'>
				<AddSubcategory categorySlug={categorySlug} />
				<CategorySelect
					categories={categories}
					value={categorySlug}
					onChange={onCategoryChange}
					disabled={isCategoriesLoading}
				/>
				<SubcategorySearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}

