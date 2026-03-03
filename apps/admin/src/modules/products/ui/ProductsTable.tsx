import type { ColumnDef } from '@tanstack/react-table'
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
import { formatPrice } from '~/common/utils/formatPrice'
import type { Product, ProductSubcategory } from '../types/product.types'
import { DeleteProduct } from './actions/DeleteProduct'
import { UpdateProduct } from './actions/UpdateProduct'

interface ProductsTableProps {
	products: Product[]
	subcategories: ProductSubcategory[]
}

const createColumns = (
	subcategoriesMap: Map<string, ProductSubcategory>,
	subcategories: ProductSubcategory[]
): ColumnDef<Product>[] => [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'slug',
		header: 'Slug'
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ getValue }) => formatPrice(getValue<string>())
	},
	{
		accessorKey: 'stock',
		header: 'Stock'
	},
	{
		accessorKey: 'isActive',
		header: 'Status',
		cell: ({ getValue }) => (
			<Badge variant={getValue<boolean>() ? 'default' : 'secondary'}>
				{getValue<boolean>() ? 'Active' : 'Inactive'}
			</Badge>
		)
	},
	{
		accessorKey: 'subcategoryId',
		header: 'Subcategory',
		cell: ({ getValue }) => {
			const subcategoryId = getValue<string>()
			return subcategoriesMap.get(subcategoryId)?.name ?? '-'
		}
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end w-full'>Actions</p>,
		enableSorting: false,
		cell: ({ row }) => (
			<div className='flex gap-2 justify-end'>
				<UpdateProduct product={row.original} subcategories={subcategories} />
				<DeleteProduct id={row.original.id} name={row.original.name} />
			</div>
		)
	}
]

export const ProductsTable = ({
	products,
	subcategories
}: ProductsTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const subcategoriesMap = useMemo(
		() =>
			new Map(
				subcategories.map((subcategory) => [subcategory.id, subcategory])
			),
		[subcategories]
	)

	const columns = useMemo(
		() => createColumns(subcategoriesMap, subcategories),
		[subcategoriesMap, subcategories]
	)

	const table = useReactTable({
		data: products,
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
									No products found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between gap-2'>
				<p className='text-sm text-muted-foreground'>
					{products.length} products
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
