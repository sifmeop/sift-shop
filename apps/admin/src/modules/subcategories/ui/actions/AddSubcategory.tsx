import { Button } from '~/common/ui/Button'
import { SubcategoryFormDialog } from '../SubcategoryFormDialog'

export const AddSubcategory = () => {
	return (
		<SubcategoryFormDialog mode='create'>
			<Button variant='secondary'>Add</Button>
		</SubcategoryFormDialog>
	)
}
