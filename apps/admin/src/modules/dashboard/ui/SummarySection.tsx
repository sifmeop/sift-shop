import type { DashboardSummary } from '../types/dashboard.types'
import { formatCurrency } from './format'
import { SummaryCard } from './SummaryCard'

interface SummarySectionProps {
	summary: DashboardSummary
}

export const SummarySection = ({ summary }: SummarySectionProps) => {
	return (
		<section className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
			<SummaryCard title='Customers' value={summary.customersCount} />
			<SummaryCard title='Products' value={summary.productsCount} />
			<SummaryCard title='Categories' value={summary.categoriesCount} />
			<SummaryCard title='Orders' value={summary.ordersCount} />
			<SummaryCard title='Reviews' value={summary.reviewsCount} />
			<SummaryCard title='Pending Orders' value={summary.pendingOrdersCount} />
			<SummaryCard title='Low Stock' value={summary.lowStockProductsCount} />
			<SummaryCard title='Out of Stock' value={summary.outOfStockProductsCount} />
			<SummaryCard title='Total Revenue' value={formatCurrency(summary.totalRevenue)} />
			<SummaryCard title='Paid Revenue' value={formatCurrency(summary.paidRevenue)} />
		</section>
	)
}

