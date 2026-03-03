import { Fragment } from 'react/jsx-runtime'

import { FileSlidersIcon } from 'lucide-react'

import { Separator } from '~/common/ui/separator'
import { cn } from '~/common/utils/cn'

import { ProductSection } from './ProductSection'

interface SpecificationsProps {
  specifications: Record<string, string>
}

export const Specifications = ({ specifications }: SpecificationsProps) => {
  if (Object.keys(specifications).length === 0) return

  return (
    <ProductSection icon={FileSlidersIcon} name='Specifications'>
      <div>
        {Object.entries(specifications).map(([key, value], index) => {
          const isFirst = index === 0
          const isLast = index === Object.keys(specifications).length - 1

          return (
            <Fragment key={key}>
              <div
                className={cn('flex flex-col gap-1 py-2 text-sm sm:flex-row sm:justify-between sm:gap-2 sm:text-base', {
                  'pt-0': isFirst,
                  'pb-0': isLast
                })}>
                <p className='text-muted-foreground sm:text-foreground'>{key}</p>
                <p className='break-words sm:text-right'>{value}</p>
              </div>
              {!isLast && <Separator />}
            </Fragment>
          )
        })}
      </div>
    </ProductSection>
  )
}
