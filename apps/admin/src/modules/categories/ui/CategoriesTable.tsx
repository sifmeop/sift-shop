import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState
} from '@tanstack/react-table'
import { useState } from 'react'
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
import { columns } from './columns'

export const CategoriesTable = () => {
	const { data, isLoading, isError } = useGetCategoriesQuery()

	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'productsCount', desc: true }
	])

	const table = useReactTable({
		data: data ?? [],
		columns,
		state: {
			sorting
		},
		manualSorting: true,
		enableSortingRemoval: false,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel()
	})

	if (isLoading) return <CenterLoader />
	if (isError) return <div>Ошибка загрузки</div>

	return (
		<div className='overflow-hidden rounded-md border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const column = header.column
								const canSort = column.getCanSort()

								return (
									<TableHead
										key={header.id}
										style={{
											width: column.getSize(),
											cursor: column.getCanSort() ? 'pointer' : 'default'
										}}
										onClick={
											canSort ? column.getToggleSortingHandler() : undefined
										}>
										{/* <SortingArrows sort={column.getIsSorted()}> */}
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
										{/* </SortingArrows> */}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-20 text-center'>
								No results
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
