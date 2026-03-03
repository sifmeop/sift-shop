import { Badge } from '~/common/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/common/ui/Card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '~/common/ui/Table'
import type { DashboardRecentOrder } from '../types/dashboard.types'
import { formatCurrency, formatDateTime } from './format'

interface RecentOrdersTableProps {
	rows: DashboardRecentOrder[]
}

const getStatusVariant = (status: DashboardRecentOrder['status']) => {
	switch (status) {
		case 'PAID':
			return 'default'
		case 'CANCELLED':
			return 'destructive'
		case 'PROCESSING':
			return 'outline'
		default:
			return 'secondary'
	}
}

export const RecentOrdersTable = ({ rows }: RecentOrdersTableProps) => {
	return (
		<Card className='py-4 gap-4'>
			<CardHeader className='px-4'>
				<CardTitle>Recent Orders</CardTitle>
			</CardHeader>
			<CardContent className='px-4'>
				{rows.length === 0 ? (
					<p className='text-sm text-muted-foreground'>No recent orders</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Number</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Created</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id}>
									<TableCell>#{row.number}</TableCell>
									<TableCell>{row.customer.fullName}</TableCell>
									<TableCell>
										<Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>
									</TableCell>
									<TableCell>
										{formatCurrency(Number(row.totalAmount), row.currency)}
									</TableCell>
									<TableCell>{formatDateTime(row.createdAt)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}

