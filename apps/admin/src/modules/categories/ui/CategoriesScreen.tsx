import { useState } from 'react'
import { CategoriesHeader } from './CategoriesHeader'
import { CategoriesTable } from './CategoriesTable'

export const CategoriesScreen = () => {
	const [searchValue, setSearchValue] = useState('')

	return (
		<>
			<CategoriesHeader
				searchValue={searchValue}
				onSearchChange={setSearchValue}
			/>
			<CategoriesTable searchValue={searchValue} />
		</>
	)
}
