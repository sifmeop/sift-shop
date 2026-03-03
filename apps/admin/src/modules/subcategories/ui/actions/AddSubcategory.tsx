import { PlusIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { SubcategoryFormDialog } from '../SubcategoryFormDialog'

interface AddSubcategoryProps {
	categorySlug: string
}

export const AddSubcategory = ({ categorySlug }: AddSubcategoryProps) => {
	return (
		<SubcategoryFormDialog mode='create' categorySlug={categorySlug}>
			<Button variant='secondary'>
				<PlusIcon />
				Add
			</Button>
		</SubcategoryFormDialog>
	)
}

