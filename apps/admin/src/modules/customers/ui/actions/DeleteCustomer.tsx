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
import { useDeleteCustomerMutation } from '../../hooks/useDeleteCustomerMutation'

interface DeleteCustomerProps {
	id: string
	fullName: string
}

export const DeleteCustomer = ({ id, fullName }: DeleteCustomerProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync, isPending: isLoading } = useDeleteCustomerMutation(id)

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()

		if (isLoading) return

		try {
			await mutateAsync()
			setIsOpen(false)
			toast.success('Customer deleted successfully')
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form id={`delete-customer-form-${id}`} onSubmit={onSubmit}>
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
						<DialogTitle>Delete customer</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete customer "{fullName}"?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							form={`delete-customer-form-${id}`}
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

