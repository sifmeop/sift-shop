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
import { useDeleteCategoryMutation } from '../../hooks/useDeleteCategoryMutation'

interface DeleteCategoryProps {
	id: string
	name: string
}

export const DeleteCategory = ({ id, name }: DeleteCategoryProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteCategoryMutation(id)

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()

		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Category deleted successfully')
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form id={`delete-category-form-${id}`} onSubmit={onSubmit}>
				<DialogTrigger asChild>
					<Button variant='destructive' size='sm'>
						<TrashIcon />
						Delete
					</Button>
				</DialogTrigger>
				<DialogContent
					className={cn('sm:max-w-sm', {
						'pointer-events-none opacity-80': isLoading
					})}>
					<DialogHeader>
						<DialogTitle>{name}</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this category?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							form={`delete-category-form-${id}`}
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

