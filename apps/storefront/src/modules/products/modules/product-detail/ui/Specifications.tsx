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
                className={cn('flex justify-between gap-2 py-2', {
                  'pt-0': isFirst,
                  'pb-0': isLast
                })}>
                <p>{key}</p>
                <p>{value}</p>
              </div>
              {!isLast && <Separator />}
            </Fragment>
          )
        })}
      </div>
    </ProductSection>
  )
}
