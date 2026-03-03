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
import { env } from '~/common/constants/env'
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
import { useToggleSubcategoryStatusMutation } from '../hooks/useToggleSubcategoryStatusMutation'
import type { Subcategory } from '../types/subcategory.types'
import { DeleteSubcategory } from './actions/DeleteSubcategory'
import { UpdateSubcategory } from './actions/UpdateSubcategory'

interface SubcategoriesTableProps {
	categorySlug: string
	rows: Subcategory[]
}

const StatusCell = ({
	subcategory,
	categorySlug
}: {
	subcategory: Subcategory
	categorySlug: string
}) => {
	const { mutateAsync, isPending } = useToggleSubcategoryStatusMutation(
		subcategory.id,
		categorySlug
	)

	return (
		<Button
			variant='ghost'
			size='sm'
			isLoading={isPending}
			onClick={() => void mutateAsync()}>
			<Badge variant={subcategory.isActive ? 'default' : 'secondary'}>
				{subcategory.isActive ? 'Active' : 'Inactive'}
			</Badge>
		</Button>
	)
}

export const SubcategoriesTable = ({
	categorySlug,
	rows
}: SubcategoriesTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const columns = useMemo(
		() => [
			{
				accessorKey: 'image',
				header: 'Image',
				enableSorting: false,
				cell: ({ row }: { row: { original: Subcategory } }) => (
					<img
						src={env.VITE_S3_BASE_URL + row.original.image}
						alt={row.original.name}
						className='h-10 w-10 rounded object-cover border'
					/>
				)
			},
			{
				accessorKey: 'name',
				header: 'Name'
			},
			{
				accessorKey: 'slug',
				header: 'Slug'
			},
			{
				accessorKey: 'isActive',
				header: 'Status',
				cell: ({ row }: { row: { original: Subcategory } }) => (
					<StatusCell subcategory={row.original} categorySlug={categorySlug} />
				)
			},
			{
				accessorKey: 'filtersCount',
				header: 'Filters'
			},
			{
				accessorKey: 'productsCount',
				header: 'Products'
			},
			{
				accessorKey: 'actions',
				header: () => <p className='text-end w-full'>Actions</p>,
				enableSorting: false,
				cell: ({ row }: { row: { original: Subcategory } }) => (
					<div className='flex gap-2 justify-end'>
						<UpdateSubcategory
							categorySlug={categorySlug}
							subcategory={row.original}
						/>
						<DeleteSubcategory
							id={row.original.id}
							name={row.original.name}
							categorySlug={categorySlug}
						/>
					</div>
				)
			}
		],
		[categorySlug]
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
									No subcategories found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between gap-2'>
				<p className='text-sm text-muted-foreground'>
					{rows.length} subcategories
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
