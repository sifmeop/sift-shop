import type { CellContext } from '@tanstack/react-table'
import { useId } from 'react'
import { Label } from '~/common/ui/Label'
import { Switch } from '~/common/ui/Switch'
import { useUpdateSubcategoryStatus } from '../../hooks/useUpdateSubcategoryStatus'
import type { Subcategory } from '../../types/subcategory.types'

type UpdateStatusProps = CellContext<Subcategory, unknown>

export const UpdateStatus = ({ cell }: UpdateStatusProps) => {
	const id = useId()
	const isActive = cell.getValue<Subcategory['isActive']>()
	const { mutateAsync, isPending: isLoading } = useUpdateSubcategoryStatus(
		cell.row.original.id
	)

	const handleChange = async (checked: boolean) => {
		if (isLoading) return

		try {
			await mutateAsync({ isActive: checked })
		} catch (error) {
			console.error(error)
		}
	}

	const label = isLoading ? 'Updating...' : isActive ? 'Active' : 'Inactive'

	return (
		<div className='flex items-center space-x-2 relative'>
			<Switch
				id={id}
				checked={isActive}
				onCheckedChange={handleChange}
				disabled={isLoading}
			/>
			<Label htmlFor={id}>{label}</Label>
		</div>
	)
}
