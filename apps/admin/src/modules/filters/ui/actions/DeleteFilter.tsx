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
import { cn } from '~/common/utils/cn'
import { useDeleteFilterMutation } from '../../hooks/useDeleteFilterMutation'
import type { Filter } from '../../types/filters.types'

type DeleteFilterProps = Pick<Filter, 'id' | 'name'>

export const DeleteFilter = ({ id, name }: DeleteFilterProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteFilterMutation(id)

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Filter deleted successfully')
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	const formId = `delete-filter-form-${id}`

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form id={formId} onSubmit={onSubmit}>
				<DialogTrigger asChild>
					<Button variant='destructive'>
						<TrashIcon />
					</Button>
				</DialogTrigger>
				<DialogContent
					className={cn('sm:max-w-sm', {
						'pointer-events-none opacity-80': isLoading
					})}>
					<DialogHeader>
						<DialogTitle>Filter: {name}</DialogTitle>
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
							form={formId}
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
