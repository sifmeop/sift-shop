import type { CoreRow } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Subcategory } from '../../types/subcategory.types'
import { SubcategoryFormDialog } from '../SubcategoryFormDialog'

interface UpdateSubcategoryProps {
	values: CoreRow<Subcategory>['original']
}

export const UpdateSubcategory = ({ values }: UpdateSubcategoryProps) => {
	return (
		<SubcategoryFormDialog mode='edit' defaultValues={values}>
			<Button variant='default' size='icon' color='yellow'>
				<EditIcon />
			</Button>
		</SubcategoryFormDialog>
	)
}
