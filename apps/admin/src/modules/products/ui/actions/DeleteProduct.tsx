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
import { useDeleteProductMutation } from '../../hooks/useDeleteProductMutation'

interface DeleteProductProps {
	id: string
	name: string
}

export const DeleteProduct = ({ id, name }: DeleteProductProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteProductMutation(id)

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Product deleted successfully')
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	const onOpenChange = (open: boolean) => {
		setIsOpen(open)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<form id='delete-product-form' onSubmit={onSubmit}>
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
							Are you sure you want to delete this product?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							form='delete-product-form'
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
