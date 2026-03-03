import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { Button } from '~/common/ui/Button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/common/ui/Dialog'
import { useDeleteFilterMutation } from '../../hooks/useDeleteFilterMutation'

interface DeleteFilterProps {
	id: string
	name: string
}

export const DeleteFilter = ({ id, name }: DeleteFilterProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteFilterMutation(id)

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Filter deleted successfully')
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form id={`delete-filter-form-${id}`} onSubmit={onSubmit}>
				<DialogTrigger asChild>
					<Button variant='destructive' size='sm'>
						<TrashIcon />
						Delete
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-sm'>
					<DialogHeader>
						<DialogTitle>{name}</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this filter?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							form={`delete-filter-form-${id}`}
							type='submit'
							variant='destructive'
							isLoading={isLoading}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

