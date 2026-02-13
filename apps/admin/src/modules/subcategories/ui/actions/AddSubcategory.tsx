import { Button } from '~/common/ui/Button'
import { SubcategoryDialog } from '../SubcategoryFormDialog'

export const AddSubcategory = () => {
	return (
		<SubcategoryDialog mode='create'>
			<Button>Add</Button>
		</SubcategoryDialog>
	)
}
