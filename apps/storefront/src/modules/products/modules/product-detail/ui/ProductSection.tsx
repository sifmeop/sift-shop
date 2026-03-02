import { LucideIcon } from 'lucide-react'

import { Container } from '~/common/ui/container'

interface ProductSectionProps extends React.PropsWithChildren {
  icon: LucideIcon
  name: string
  leftContent?: React.ReactNode
}

export const ProductSection = ({
  icon: Icon,
  name,
  leftContent,
  children
}: ProductSectionProps) => {
  return (
    <Container
      bgColor='white'
      className='rounded-lg'
      innerClassName='px-4! py-3 items-start grid grid-cols-[2fr_3fr] gap-4'>
      <div className='space-y-3'>
        <div className='flex items-center gap-2'>
          <Icon size={24} />
          <h3 className='font-medium text-base'>{name}</h3>
        </div>
        {leftContent}
      </div>
      {children}
    </Container>
  )
}
