import { SearchInput } from '~/common/ui/Input'

interface ProductsSearchProps {
	value: string
	onChange: (value: string) => void
}

export const ProductsSearch = ({ value, onChange }: ProductsSearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

