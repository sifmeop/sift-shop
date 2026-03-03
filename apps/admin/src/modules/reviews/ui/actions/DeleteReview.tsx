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
import { useDeleteReviewMutation } from '../../hooks/useDeleteReviewMutation'

interface DeleteReviewProps {
	id: string
	productId: string
	fullName: string
}

export const DeleteReview = ({ id, productId, fullName }: DeleteReviewProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteReviewMutation(
		id,
		productId
	)

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()

		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Review deleted successfully')
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form id={`delete-review-form-${id}`} onSubmit={onSubmit}>
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
						<DialogTitle>Delete review</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete review by "{fullName}"?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							form={`delete-review-form-${id}`}
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

