import { AddCategory } from './actions/AddCategory'
import { CategoriesSearch } from './CategoriesSearch'

interface CategoriesHeaderProps {
	searchValue: string
	onSearchChange: (value: string) => void
}

export const CategoriesHeader = ({
	searchValue,
	onSearchChange
}: CategoriesHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Categories</h3>
			<div className='flex items-center gap-2'>
				<AddCategory />
				<CategoriesSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}

