import { Button } from '~/common/ui/Button'
import { CategoryDialog } from '../CategoryFormDialog'

export const AddCategory = () => {
	return (
		<CategoryDialog mode='create'>
			<Button variant='secondary'>Add</Button>
		</CategoryDialog>
	)
}
