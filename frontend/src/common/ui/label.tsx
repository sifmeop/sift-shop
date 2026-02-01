'use client'

import { Label as LabelPrimitive } from 'radix-ui'

import { cn } from '~/common/utils/cn'

const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        'gap-2 leading-[175%] font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed text-foreground-70',
        className
      )}
      {...props}
    />
  )
}

export { Label }
