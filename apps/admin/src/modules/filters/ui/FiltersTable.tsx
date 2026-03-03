import {
	type PaginationState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Badge } from '~/common/ui/Badge'
import { Button } from '~/common/ui/Button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '~/common/ui/Table'
import { useToggleFilterStatusMutation } from '../hooks/useToggleFilterStatusMutation'
import type { Filter, FilterSubcategory } from '../types/filters.types'
import { DeleteFilter } from './actions/DeleteFilter'
import { UpdateFilter } from './actions/UpdateFilter'

interface FiltersTableProps {
	rows: Filter[]
	subcategories: FilterSubcategory[]
}

const StatusCell = ({ filter }: { filter: Filter }) => {
	const { mutateAsync, isPending } = useToggleFilterStatusMutation(filter.id)

	return (
		<Button
			variant='ghost'
			size='sm'
			isLoading={isPending}
			onClick={() => void mutateAsync()}>
			<Badge variant={filter.isActive ? 'default' : 'secondary'}>
				{filter.isActive ? 'Active' : 'Inactive'}
			</Badge>
		</Button>
	)
}

export const FiltersTable = ({ rows, subcategories }: FiltersTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const subcategoryById = useMemo(
		() => new Map(subcategories.map((item) => [item.id, item])),
		[subcategories]
	)

	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name'
			},
			{
				accessorKey: 'slug',
				header: 'Slug'
			},
			{
				accessorKey: 'subcategoryId',
				header: 'Subcategory',
				cell: ({ row }: { row: { original: Filter } }) =>
					subcategoryById.get(row.original.subcategoryId)?.name ?? '-'
			},
			{
				accessorKey: 'options',
				header: 'Options',
				enableSorting: false,
				cell: ({ row }: { row: { original: Filter } }) => (
					<div
						className='max-w-[280px] truncate'
						title={row.original.options.map((item) => item.label).join(', ')}>
						{row.original.options.map((item) => item.label).join(', ')}
					</div>
				)
			},
			{
				accessorKey: 'isActive',
				header: 'Status',
				cell: ({ row }: { row: { original: Filter } }) => (
					<StatusCell filter={row.original} />
				)
			},
			{
				accessorKey: 'actions',
				header: () => <p className='text-end w-full'>Actions</p>,
				enableSorting: false,
				cell: ({ row }: { row: { original: Filter } }) => (
					<div className='flex gap-2 justify-end'>
						<UpdateFilter filter={row.original} subcategories={subcategories} />
						<DeleteFilter id={row.original.id} name={row.original.name} />
					</div>
				)
			}
		],
		[subcategoryById, subcategories]
	)

	const table = useReactTable({
		data: rows,
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
												{header.column.getCanSort() &&
													({
														asc: '(asc)',
														desc: '(desc)'
													}[header.column.getIsSorted() as 'asc' | 'desc'] ??
														null)}
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
								<TableRow key={row.id}>
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
									No filters found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between gap-2'>
				<p className='text-sm text-muted-foreground'>{rows.length} filters</p>
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
