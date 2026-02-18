import { Spinner } from './spinner'

export const FullScreenLoader = () => {
  return (
    <div className='fixed inset-0 bg-background grid place-items-center'>
      <Spinner className='size-10' />
    </div>
  )
}
