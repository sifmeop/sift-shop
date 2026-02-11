import { AddSubcategory } from './actions/AddSubcategory'
import { SubcategorySearch } from './SubcategorySearch'

export const SubcategoriesHeader = () => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Subcategories</h3>
			<div className='flex items-center gap-2'>
				<AddSubcategory />
				<SubcategorySearch />
			</div>
		</div>
	)
}
