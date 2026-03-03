import { PlusIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { FilterSubcategory } from '../../types/filters.types'
import { FilterFormDialog } from '../FilterFormDialog'

interface AddFilterProps {
	subcategories: FilterSubcategory[]
	selectedSubcategorySlug: string
}

export const AddFilter = ({
	subcategories,
	selectedSubcategorySlug
}: AddFilterProps) => {
	return (
		<FilterFormDialog
			mode='create'
			subcategories={subcategories}
			selectedSubcategorySlug={selectedSubcategorySlug}>
			<Button variant='secondary'>
				<PlusIcon />
				Add
			</Button>
		</FilterFormDialog>
	)
}

