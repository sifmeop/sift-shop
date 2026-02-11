import type { CoreRow } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Subcategory } from '../../types/subcategory.types'
import { SubcategoryDialog } from '../SubategoryFormDialog'

interface UpdateSubcategoryProps {
	values: CoreRow<Subcategory>['original']
}

export const UpdateSubcategory = ({ values }: UpdateSubcategoryProps) => {
	return (
		<SubcategoryDialog mode='edit' defaultValues={values}>
			<Button variant='default' size='icon' color='yellow'>
				<EditIcon />
			</Button>
		</SubcategoryDialog>
	)
}
