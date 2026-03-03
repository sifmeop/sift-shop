import { handleApiError } from '~/common/api/errorHandler'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { useGetDashboardQuery } from '../hooks/useGetDashboardQuery'
import { OrderStatusSection } from './OrderStatusSection'
import { RecentCustomersList } from './RecentCustomersList'
import { RecentOrdersTable } from './RecentOrdersTable'
import { RecentReviewsList } from './RecentReviewsList'
import { SummarySection } from './SummarySection'
import { TopProductsTable } from './TopProductsTable'

export const DashboardScreen = () => {
	const { data, isLoading, isError, error } = useGetDashboardQuery()

	if (isLoading) return <CenterLoader />
	if (isError) return <div>{handleApiError(error)}</div>
	if (!data) return <div>No dashboard data</div>

	return (
		<div className='space-y-6'>
			<SummarySection summary={data.summary} />

			<div className='grid gap-4 lg:grid-cols-3'>
				<div className='lg:col-span-2'>
					<OrderStatusSection rows={data.orderStatus} />
				</div>
				<div>
					<RecentCustomersList rows={data.recentCustomers} />
				</div>
			</div>

			<RecentOrdersTable rows={data.recentOrders} />

			<div className='grid gap-4 lg:grid-cols-2'>
				<RecentReviewsList rows={data.recentReviews} />
				<TopProductsTable rows={data.topProducts} />
			</div>
		</div>
	)
}

