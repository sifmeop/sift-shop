import { useState } from 'react'
import { CustomersHeader, CustomersTable } from '~/modules/customers'

export const CustomersPage = () => {
	const [searchValue, setSearchValue] = useState('')

	return (
		<>
			<CustomersHeader
				searchValue={searchValue}
				onSearchChange={setSearchValue}
			/>
			<CustomersTable searchValue={searchValue} />
		</>
	)
}

