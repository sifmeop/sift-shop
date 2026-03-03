import { ComponentPropsWithoutRef, ElementType } from 'react'

import { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '~/common/utils/cn'

type ProfileMenuItemProps<T extends ElementType> = {
  as: T
  name: string
  icon: LucideIcon
  isActive?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'children'>

export const ProfileMenuItem = <T extends ElementType>({
  as,
  name,
  icon: Icon,
  isActive,
  className,
  ...props
}: ProfileMenuItemProps<T>) => {
  const Component = as as ElementType

  return (
    <li role='menuitem' className='relative shrink-0'>
      <Component
        className={cn(
          'relative z-10 inline-flex w-full items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-background/50 sm:px-4 lg:w-53 lg:gap-2.5 lg:px-6',
          {
            'text-foreground hover:bg-background': isActive
          },
          className
        )}
        {...props}>
        <Icon className='size-4 shrink-0 lg:size-5' />
        <span className='font-medium leading-[175%]'>{name}</span>
      </Component>
      {isActive && (
        <motion.div
          layoutId='profile-menu-item'
          className='absolute inset-0 bg-background z-px rounded-lg'
        />
      )}
    </li>
  )
}
