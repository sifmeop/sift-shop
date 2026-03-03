import { Card, CardContent, CardHeader, CardTitle } from '~/common/ui/Card'
import type { DashboardOrderStatus } from '../types/dashboard.types'

interface OrderStatusSectionProps {
	rows: DashboardOrderStatus[]
}

export const OrderStatusSection = ({ rows }: OrderStatusSectionProps) => {
	return (
		<Card className='py-4 gap-4'>
			<CardHeader className='px-4'>
				<CardTitle>Order Status</CardTitle>
			</CardHeader>
			<CardContent className='px-4 space-y-2'>
				{rows.length === 0 ? (
					<p className='text-sm text-muted-foreground'>No status data</p>
				) : (
					rows.map((item) => {
						const width = `${Math.min(item.count * 10, 100)}%`

						return (
							<div key={item.status} className='space-y-1'>
								<div className='flex justify-between text-sm'>
									<span>{item.status}</span>
									<span>{item.count}</span>
								</div>
								<div className='h-2 rounded bg-muted overflow-hidden'>
									<div className='h-full bg-primary' style={{ width }} />
								</div>
							</div>
						)
					})
				)}
			</CardContent>
		</Card>
	)
}

