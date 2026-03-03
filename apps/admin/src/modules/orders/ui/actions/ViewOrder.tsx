import { EyeIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/common/ui/Dialog'
import { formatPrice } from '~/common/utils/formatPrice'
import type { Order } from '../../types/order.types'

interface ViewOrderProps {
	order: Order
}

export const ViewOrder = ({ order }: ViewOrderProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm'>
					<EyeIcon />
					View
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Order #{order.number}</DialogTitle>
					<DialogDescription>
						{order.firstName} {order.lastName} ({order.email})
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					<div className='grid grid-cols-2 gap-3 text-sm'>
						<div>Status: {order.status}</div>
						<div>Payment: {order.method}</div>
						<div>Total: {formatPrice(order.totalAmount)}</div>
						<div>Currency: {order.currency}</div>
						<div>Phone: {order.phone}</div>
						<div>User ID: {order.userId}</div>
					</div>

					<div>
						<p className='font-medium mb-2'>Shipping address</p>
						<p className='text-sm text-muted-foreground'>
							{order.country}, {order.city}, {order.state ?? '-'},{' '}
							{order.address}, {order.zipCode}
						</p>
					</div>

					<div>
						<p className='font-medium mb-2'>Items</p>
						<div className='space-y-2 max-h-56 overflow-auto'>
							{order.items.map((item) => (
								<div
									key={item.id}
									className='rounded-md border p-2 text-sm flex justify-between gap-2'>
									<p className='truncate'>{item.productName}</p>
									<p className='shrink-0'>
										{item.quantity} x {formatPrice(item.price)} ={' '}
										{formatPrice(item.totalPrice)}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
