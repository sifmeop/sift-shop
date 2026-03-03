import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Subcategory } from '../../types/subcategory.types'
import { SubcategoryFormDialog } from '../SubcategoryFormDialog'

interface UpdateSubcategoryProps {
	categorySlug: string
	subcategory: Subcategory
}

export const UpdateSubcategory = ({
	categorySlug,
	subcategory
}: UpdateSubcategoryProps) => {
	return (
		<SubcategoryFormDialog
			mode='edit'
			categorySlug={categorySlug}
			defaultValues={{
				id: subcategory.id,
				name: subcategory.name,
				slug: subcategory.slug,
				image: subcategory.image
			}}>
			<Button variant='outline' size='sm'>
				<EditIcon />
				Edit
			</Button>
		</SubcategoryFormDialog>
	)
}

