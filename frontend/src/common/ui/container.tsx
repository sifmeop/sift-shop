import { cn } from '../utils/cn'

interface ContainerProps extends React.PropsWithChildren {
  bgColor?: 'white' | 'transparent'
  className?: string
  innerClassName?: string
}

export const Container = ({
  children,
  bgColor = 'transparent',
  className,
  innerClassName
}: ContainerProps) => {
  return (
    <div className={cn(bgColor === 'white' && 'bg-white', className)}>
      <div className={cn('app-container', innerClassName)}>{children}</div>
    </div>
  )
}
