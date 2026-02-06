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
    <li role='menuitem' className='relative'>
      <Component
        className={cn(
          'inline-flex gap-2.5 w-53 py-2 px-6 text-muted-foreground rounded-lg hover:bg-background/50 relative z-10',
          {
            'text-foreground hover:bg-background': isActive
          },
          className
        )}
        {...props}>
        <Icon />
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
