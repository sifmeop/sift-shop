import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import type { Filter } from '../../types/filters.types'
import { FilterFormDialog } from '../FilterFormDialog'

interface UpdateFilterProps {
	values: Filter
}

export const UpdateFilter = ({ values }: UpdateFilterProps) => {
	return (
		<FilterFormDialog mode='edit' defaultValues={values}>
			<Button variant='default' size='icon' color='yellow'>
				<EditIcon />
			</Button>
		</FilterFormDialog>
	)
}
