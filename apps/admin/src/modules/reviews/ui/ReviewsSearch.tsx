import { SearchInput } from '~/common/ui/Input'

interface ReviewsSearchProps {
	value: string
	onChange: (value: string) => void
}

export const ReviewsSearch = ({ value, onChange }: ReviewsSearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

