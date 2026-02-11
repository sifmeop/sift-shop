import type { CoreRow } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Category } from '../../types/category.types'
import { CategoryDialog } from '../CategoryFormDialog'

interface UpdateCategoryProps {
	values: CoreRow<Category>['original']
}

export const UpdateCategory = ({ values }: UpdateCategoryProps) => {
	return (
		<CategoryDialog mode='edit' defaultValues={values}>
			<Button variant='default' size='icon' color='yellow'>
				<EditIcon />
			</Button>
		</CategoryDialog>
	)
}
