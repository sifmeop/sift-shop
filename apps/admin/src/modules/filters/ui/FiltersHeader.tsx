import { AddFilter } from './actions/AddFilter'
import { FiltersSearch } from './FiltersSearch'

export const FiltersHeader = () => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Filters</h3>
			<div className='flex items-center gap-2'>
				<AddFilter />
				<FiltersSearch />
			</div>
		</div>
	)
}
