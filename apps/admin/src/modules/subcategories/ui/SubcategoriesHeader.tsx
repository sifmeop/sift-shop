import { useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { AddSubcategory } from './actions/AddSubcategory'
import { SubcategorySearch } from './SubcategorySearch'

export const SubcategoriesHeader = () => {
	const navigate = useNavigate()

	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<div className='flex items-center gap-2'>
				<Button
					size='icon'
					variant='ghost'
					onClick={() =>
						navigate({
							to: '/categories',
							search: { redirect: window.location.pathname }
						})
					}>
					<ArrowLeftIcon />
				</Button>
				<h3 className='font-semibold text-lg'>Subcategories</h3>
			</div>
			<div className='flex items-center gap-2'>
				<AddSubcategory />
				<SubcategorySearch />
			</div>
		</div>
	)
}
