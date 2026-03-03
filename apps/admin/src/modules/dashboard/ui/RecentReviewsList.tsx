import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '~/common/ui/Card'
import type { DashboardRecentReview } from '../types/dashboard.types'
import { formatDateTime } from './format'

interface RecentReviewsListProps {
	rows: DashboardRecentReview[]
}

const truncateComment = (comment: string | null, limit: number = 80) => {
	if (!comment) return '-'
	if (comment.length <= limit) return comment
	return `${comment.slice(0, limit)}...`
}

export const RecentReviewsList = ({ rows }: RecentReviewsListProps) => {
	return (
		<Card className='py-4 gap-4'>
			<CardHeader className='px-4'>
				<CardTitle>Recent Reviews</CardTitle>
			</CardHeader>
			<CardContent className='px-4 space-y-3'>
				{rows.length === 0 ? (
					<p className='text-sm text-muted-foreground'>No recent reviews</p>
				) : (
					rows.map((row) => (
						<div key={row.id} className='rounded-md border p-3 space-y-1'>
							<div className='flex items-center justify-between gap-2'>
								<Link to='/products' className='font-medium hover:underline truncate'>
									{row.product.name}
								</Link>
								<span className='text-sm'>Rating: {row.rating}/5</span>
							</div>
							<p className='text-sm text-muted-foreground'>
								{truncateComment(row.comment)}
							</p>
							<div className='flex items-center justify-between text-xs text-muted-foreground'>
								<span>{row.customer.fullName}</span>
								<span>{formatDateTime(row.createdAt)}</span>
							</div>
						</div>
					))
				)}
			</CardContent>
		</Card>
	)
}

