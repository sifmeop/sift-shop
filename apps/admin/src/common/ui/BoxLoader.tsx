import { cn } from '../utils/cn'
import { Spinner } from './Spinner'

interface BoxLoaderProps {
	className?: string
}

export const BoxLoader = ({ className }: BoxLoaderProps) => {
	return (
		<div className={cn('absolute inset-0 grid place-items-center', className)}>
			<Spinner className='size-10 mx-auto' />
		</div>
	)
}
