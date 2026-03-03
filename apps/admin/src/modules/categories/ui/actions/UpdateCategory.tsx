import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Category } from '../../types/category.types'
import { CategoryFormDialog } from '../CategoryFormDialog'

interface UpdateCategoryProps {
	category: Category
}

export const UpdateCategory = ({ category }: UpdateCategoryProps) => {
	return (
		<CategoryFormDialog
			mode='edit'
			defaultValues={{
				id: category.id,
				name: category.name,
				slug: category.slug
			}}>
			<Button variant='outline' size='sm'>
				<EditIcon />
				Edit
			</Button>
		</CategoryFormDialog>
	)
}

