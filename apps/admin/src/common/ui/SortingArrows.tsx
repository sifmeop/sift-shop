import type { SortDirection } from '@tanstack/react-table'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface SortingArrowsProps extends React.PropsWithChildren {
	sort: SortDirection | false
}

export const SortingArrows = ({ children, sort }: SortingArrowsProps) => {
	if (!sort) {
		return <>{children}</>
	}

	return (
		<div className='flex items-center gap-1 cursor-pointer'>
			{children}
			<div>
				<ChevronUpIcon size={16} stroke={sort === 'asc' ? 'red' : 'black'} />
				<ChevronDownIcon size={16} stroke={sort === 'desc' ? 'red' : 'black'} />
			</div>
		</div>
	)
}
