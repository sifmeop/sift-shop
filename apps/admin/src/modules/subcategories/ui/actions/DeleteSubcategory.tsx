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
import { useDeleteSubcategoryMutation } from '../../hooks/useDeleteSubcategoryMutation'

interface DeleteSubcategoryProps {
	id: string
	name: string
}

export const DeleteSubcategory = ({ id, name }: DeleteSubcategoryProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteSubcategoryMutation(id)

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Subcategory deleted successfully')
		} catch (error) {
			const message = handleApiError(error)
			toast.error(message)
		}
	}

	const onOpenChange = (open: boolean) => {
		setIsOpen(open)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<form id='delete-subcategory-form' onSubmit={onSubmit}>
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
						<DialogTitle>{name}</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this subcategory?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							form='delete-subcategory-form'
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
