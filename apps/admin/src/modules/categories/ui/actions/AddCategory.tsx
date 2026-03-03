import { PlusIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { CategoryFormDialog } from '../CategoryFormDialog'

export const AddCategory = () => {
	return (
		<CategoryFormDialog mode='create'>
			<Button variant='secondary'>
				<PlusIcon />
				Add
			</Button>
		</CategoryFormDialog>
	)
}

