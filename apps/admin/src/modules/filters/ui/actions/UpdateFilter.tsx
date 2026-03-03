import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Filter, FilterSubcategory } from '../../types/filters.types'
import { FilterFormDialog } from '../FilterFormDialog'

interface UpdateFilterProps {
	filter: Filter
	subcategories: FilterSubcategory[]
}

export const UpdateFilter = ({ filter, subcategories }: UpdateFilterProps) => {
	return (
		<FilterFormDialog
			mode='edit'
			filter={filter}
			subcategories={subcategories}
			selectedSubcategorySlug={null}>
			<Button variant='outline' size='sm'>
				<EditIcon />
				Edit
			</Button>
		</FilterFormDialog>
	)
}

