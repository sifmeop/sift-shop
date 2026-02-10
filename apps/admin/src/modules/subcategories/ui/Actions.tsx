import type { CellContext } from '@tanstack/react-table'
import { EditIcon, TrashIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { ButtonGroup } from '~/common/ui/ButtonGroup'
import type { Category } from '../types/column.types'

type ActionsProps = CellContext<Category, unknown>

export const Actions = ({}: ActionsProps) => {
	return (
		<ButtonGroup>
			<Button variant='outline' size='icon'>
				<EditIcon />
			</Button>
			<Button variant='destructive' size='icon'>
				<TrashIcon />
			</Button>
		</ButtonGroup>
	)
}
