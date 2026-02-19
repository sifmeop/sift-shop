import { cn } from '../utils/cn'

import { Spinner } from './spinner'

interface CenterLoaderProps {
  className?: string
}

export const CenterLoader = ({ className }: CenterLoaderProps) => {
  return <Spinner className={cn('size-10 w-fit mx-auto', className)} />
}
