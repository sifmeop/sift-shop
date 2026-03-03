import { Badge } from '~/common/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/common/ui/Card'
import type { DashboardRecentCustomer } from '../types/dashboard.types'
import { formatDateTime } from './format'

interface RecentCustomersListProps {
	rows: DashboardRecentCustomer[]
}

const getInitials = (fullName: string) => {
	const tokens = fullName.trim().split(/\s+/)
	return (tokens[0]?.[0] ?? '') + (tokens[1]?.[0] ?? '')
}

export const RecentCustomersList = ({ rows }: RecentCustomersListProps) => {
	return (
		<Card className='py-4 gap-4 h-full'>
			<CardHeader className='px-4'>
				<CardTitle>Recent Customers</CardTitle>
			</CardHeader>
			<CardContent className='px-4 space-y-3'>
				{rows.length === 0 ? (
					<p className='text-sm text-muted-foreground'>No recent customers</p>
				) : (
					rows.map((row) => (
						<div key={row.id} className='flex items-center gap-3'>
							{row.avatar ? (
								<img
									src={row.avatar}
									alt={row.fullName}
									className='h-10 w-10 rounded-full object-cover border'
								/>
							) : (
								<div className='h-10 w-10 rounded-full border bg-muted flex items-center justify-center text-xs font-medium'>
									{getInitials(row.fullName) || 'NA'}
								</div>
							)}

							<div className='min-w-0 flex-1'>
								<p className='font-medium truncate'>{row.fullName}</p>
								<p className='text-sm text-muted-foreground truncate'>
									{row.email}
								</p>
								<p className='text-xs text-muted-foreground'>
									{formatDateTime(row.createdAt)}
								</p>
							</div>

							<Badge variant={row.isVerified ? 'default' : 'secondary'}>
								{row.isVerified ? 'Verified' : 'Unverified'}
							</Badge>
						</div>
					))
				)}
			</CardContent>
		</Card>
	)
}
