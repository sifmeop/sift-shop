import {
	type PaginationState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { handleApiError } from '~/common/api/errorHandler'
import { Button } from '~/common/ui/Button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '~/common/ui/Table'
import { useGetOrdersQuery } from '../hooks/useGetOrdersQuery'
import type { OrderStatus } from '../types/order.types'
import { columns } from './columns'

interface OrdersTableProps {
	searchValue: string
	status: 'ALL' | OrderStatus
}

export const OrdersTable = ({ searchValue, status }: OrdersTableProps) => {
	const { data = [], isLoading, isError, error } = useGetOrdersQuery()
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const normalizedSearch = searchValue.trim().toLowerCase()
	const filteredData = useMemo(() => {
		return data.filter((order) => {
			if (status !== 'ALL' && order.status !== status) {
				return false
			}

			if (!normalizedSearch) {
				return true
			}

			const searchableValues = [
				String(order.number),
				order.email,
				order.phone,
				order.firstName,
				order.lastName,
				order.paymentId
			].join(' ')

			return searchableValues.toLowerCase().includes(normalizedSearch)
		})
	}, [data, normalizedSearch, status])

	useEffect(() => {
		setPagination((prev) => ({ ...prev, pageIndex: 0 }))
	}, [normalizedSearch, status])

	const table = useReactTable({
		data: filteredData,
		columns,
		state: {
			sorting,
			pagination
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	})

	if (isLoading) return <CenterLoader />
	if (isError) return <div>{handleApiError(error)}</div>

	return (
		<div className='space-y-4'>
			<div className='overflow-hidden rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											<button
												type='button'
												className='inline-flex items-center gap-1 w-full'
												onClick={header.column.getToggleSortingHandler()}
												disabled={!header.column.getCanSort()}>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{(header.column.getCanSort() &&
													{
														asc: '(asc)',
														desc: '(desc)'
													}[header.column.getIsSorted() as 'asc' | 'desc']) ??
													null}
											</button>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-20 text-center'>
									No orders found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between gap-2'>
				<p className='text-sm text-muted-foreground'>
					{filteredData.length} orders
				</p>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<p className='text-sm'>
						Page {table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount() || 1}
					</p>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
