import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import Link from 'next/link'
import { Slot } from 'radix-ui'

import { cn } from '../utils/cn'

const Breadcrumb = ({ className, ...props }: React.ComponentProps<'nav'>) => {
  return (
    <nav
      aria-label='breadcrumb'
      data-slot='breadcrumb'
      className={cn(className)}
      {...props}
    />
  )
}

const BreadcrumbList = ({
  className,
  ...props
}: React.ComponentProps<'ol'>) => {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        'text-muted-foreground gap-1.5 text-sm sm:gap-2.5 flex flex-wrap items-center wrap-break-word',
        className
      )}
      {...props}
    />
  )
}

const BreadcrumbItem = ({
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot='breadcrumb-item'
      className={cn('gap-1.5 inline-flex items-center', className)}
      {...props}
    />
  )
}

const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot.Root : Link

  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  )
}

const BreadcrumbPage = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  )
}

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      {...props}>
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn(
        'size-5 [&>svg]:size-4 flex items-center justify-center',
        className
      )}
      {...props}>
      <MoreHorizontalIcon />
      <span className='sr-only'>More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
