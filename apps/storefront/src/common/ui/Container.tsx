import { cn } from '../utils/cn'

interface ContainerProps extends React.PropsWithChildren {
  main?: boolean
  bgColor?: 'white' | 'transparent'
  className?: string
  innerClassName?: string
}

export const Container = ({
  children,
  main = false,
  bgColor = 'transparent',
  className,
  innerClassName
}: ContainerProps) => {
  return (
    <div
      className={cn(
        bgColor === 'white' && 'bg-white',
        main && 'flex-1',
        className
      )}>
      <div className={cn('app-container', innerClassName)}>{children}</div>
    </div>
  )
}
