import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '~/common/ui/Card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '~/common/ui/Table'
import type { DashboardTopProduct } from '../types/dashboard.types'
import { formatCurrency } from './format'

interface TopProductsTableProps {
	rows: DashboardTopProduct[]
}

export const TopProductsTable = ({ rows }: TopProductsTableProps) => {
	return (
		<Card className='py-4 gap-4'>
			<CardHeader className='px-4'>
				<CardTitle>Top Products</CardTitle>
			</CardHeader>
			<CardContent className='px-4'>
				{rows.length === 0 ? (
					<p className='text-sm text-muted-foreground'>No top products</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Total Sold</TableHead>
								<TableHead>Total Revenue</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.productId}>
									<TableCell>
										<Link to='/products' className='hover:underline'>
											{row.name}
										</Link>
									</TableCell>
									<TableCell>{row.totalSold}</TableCell>
									<TableCell>{formatCurrency(row.totalRevenue)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}

