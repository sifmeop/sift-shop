import { Button } from '~/common/ui/Button'
import { FilterFormDialog } from '../FilterFormDialog'

export const AddFilter = () => {
	return (
		<FilterFormDialog mode='create'>
			<Button variant='secondary'>Add</Button>
		</FilterFormDialog>
	)
}
