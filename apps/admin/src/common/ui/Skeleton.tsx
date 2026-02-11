import { cn } from '../utils/cn'

export const Skeleton = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot='skeleton'
			className={cn('bg-black/10 animate-pulse rounded-md', className)}
			{...props}
		/>
	)
}
