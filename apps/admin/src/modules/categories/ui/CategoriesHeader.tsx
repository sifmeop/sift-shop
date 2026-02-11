import { AddCategory } from './actions/AddCategory'
import { CategorySearch } from './CategorySearch'

export const CategoriesHeader = () => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Categories</h3>
			<div className='flex items-center gap-2'>
				<AddCategory />
				<CategorySearch />
			</div>
		</div>
	)
}
