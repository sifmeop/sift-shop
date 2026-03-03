import { CustomersSearch } from './CustomersSearch'

interface CustomersHeaderProps {
	searchValue: string
	onSearchChange: (value: string) => void
}

export const CustomersHeader = ({
	searchValue,
	onSearchChange
}: CustomersHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Customers</h3>
			<CustomersSearch value={searchValue} onChange={onSearchChange} />
		</div>
	)
}

