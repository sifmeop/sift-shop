import { Link } from '@tanstack/react-router'
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
import { handleApiError } from '~/common/api/errorHandler'
import { Badge } from '~/common/ui/Badge'
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
import { useGetCategoriesQuery } from '../hooks/useGetCategoriesQuery'
import { useToggleCategoryStatusMutation } from '../hooks/useToggleCategoryStatusMutation'
import type { Category } from '../types/category.types'
import { DeleteCategory } from './actions/DeleteCategory'
import { UpdateCategory } from './actions/UpdateCategory'

interface CategoriesTableProps {
	searchValue: string
}

const StatusCell = ({ category }: { category: Category }) => {
	const { mutateAsync, isPending } = useToggleCategoryStatusMutation(
		category.id
	)

	return (
		<Button
			variant='ghost'
			size='sm'
			isLoading={isPending}
			onClick={() => void mutateAsync()}>
			<Badge variant={category.isActive ? 'default' : 'secondary'}>
				{category.isActive ? 'Active' : 'Inactive'}
			</Badge>
		</Button>
	)
}

export const CategoriesTable = ({ searchValue }: CategoriesTableProps) => {
	const { data = [], isLoading, isError, error } = useGetCategoriesQuery()
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const normalizedSearch = searchValue.trim().toLowerCase()
	const filteredData = useMemo(() => {
		if (!normalizedSearch) return data

		return data.filter((category) => {
			const values = [category.name, category.slug].join(' ')
			return values.toLowerCase().includes(normalizedSearch)
		})
	}, [data, normalizedSearch])

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
				accessorKey: 'isActive',
				header: 'Status',
				cell: ({ row }: { row: { original: Category } }) => (
					<StatusCell category={row.original} />
				)
			},
			{
				accessorKey: 'subcategoriesCount',
				header: 'Subcategories'
			},
			{
				accessorKey: 'productsCount',
				header: 'Products'
			},
			{
				accessorKey: 'actions',
				header: () => <p className='text-end w-full'>Actions</p>,
				enableSorting: false,
				cell: ({ row }: { row: { original: Category } }) => (
					<div className='flex gap-2 justify-end'>
						<Button variant='ghost' size='sm'>
							<Link to='/categories/$slug' params={{ slug: row.original.slug }}>
								View
							</Link>
						</Button>
						<UpdateCategory category={row.original} />
						<DeleteCategory id={row.original.id} name={row.original.name} />
					</div>
				)
			}
		],
		[]
	)

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
												className='inline-flex items-center w-full gap-1'
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
									No categories found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between gap-2'>
				<p className='text-sm text-muted-foreground'>
					{filteredData.length} categories
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
