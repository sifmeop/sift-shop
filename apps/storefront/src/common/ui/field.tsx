'use client'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/common/utils/cn'

import { Label } from './label'
import { Separator } from './separator'

const FieldSet = ({
  className,
  ...props
}: React.ComponentProps<'fieldset'>) => {
  return (
    <fieldset
      data-slot='field-set'
      className={cn(
        'gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
        className
      )}
      {...props}
    />
  )
}

const FieldLegend = ({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) => {
  return (
    <legend
      data-slot='field-legend'
      data-variant={variant}
      className={cn('mb-3 font-medium', className)}
      {...props}
    />
  )
}

const FieldGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='field-group'
      className={cn(
        'gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col',
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'data-[invalid=true]:text-destructive gap-1 group/field flex w-full',
  {
    variants: {
      orientation: {
        vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
        horizontal:
          'flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        responsive:
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
      }
    },
    defaultVariants: {
      orientation: 'vertical'
    }
  }
)

const Field = ({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) => {
  return (
    <div
      role='group'
      data-slot='field'
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

const FieldContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='field-content'
      className={cn(
        'gap-1 group/field-content flex flex-1 flex-col leading-snug',
        className
      )}
      {...props}
    />
  )
}

const FieldLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Label>) => {
  return (
    <Label
      data-slot='field-label'
      className={cn(
        'has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-3 group/field-label peer/field-label flex w-fit',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        className
      )}
      {...props}
    />
  )
}

const FieldTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='field-label'
      className={cn(
        'gap-2 font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug',
        className
      )}
      {...props}
    />
  )
}

const FieldDescription = ({
  className,
  ...props
}: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot='field-description'
      className={cn(
        'text-muted-foreground text-left [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  )
}

const FieldSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) => {
  return (
    <div
      data-slot='field-separator'
      data-content={!!children}
      className={cn(
        '-my-2 h-5 group-data-[variant=outline]/field-group:-mb-2 relative',
        className
      )}
      {...props}>
      <Separator className='absolute inset-0 top-1/2' />
      {children && (
        <span
          className='text-muted-foreground px-2 bg-background relative mx-auto block w-fit'
          data-slot='field-separator-content'>
          {children}
        </span>
      )}
    </div>
  )
}

const FieldError = ({
  className,
  children,
  error,
  ...props
}: React.ComponentProps<'div'> & {
  error?: string
}) => {
  if (!error) {
    return null
  }

  return (
    <div
      role='alert'
      data-slot='field-error'
      className={cn('text-destructive font-normal', className)}
      {...props}>
      {children ?? error}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
}
