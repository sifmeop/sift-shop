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
      innerClassName='grid items-start gap-4 px-4! py-3 md:grid-cols-[2fr_3fr] md:gap-6'>
      <div className='space-y-3'>
        <div className='flex items-center gap-2'>
          <Icon size={22} />
          <h3 className='text-base font-medium'>{name}</h3>
        </div>
        {leftContent}
      </div>
      {children}
    </Container>
  )
}
