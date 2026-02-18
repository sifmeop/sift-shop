import { Spinner } from './Spinner'

export const FullScreenLoader = () => {
	return (
		<div className='fixed inset-0 grid place-items-center bg-background'>
			<Spinner className='size-10' />
		</div>
	)
}
