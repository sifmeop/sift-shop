import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '~/common/utils/cn'

import { Show } from './show'
import { Spinner } from './spinner'

export const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none cursor-pointer disabled:cursor-not-allowed active:scale-95",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
        link: 'text-primary underline-offset-4 hover:underline',
        border:
          'border border-muted-foreground/20 bg-transparent hover:bg-muted/40 aria-expanded:bg-muted aria-expanded:text-foreground'
      },
      size: {
        default:
          'h-11 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-8 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        lg: 'h-12 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-10'
      },
      color: {
        yellow:
          'bg-yellow-200/80 text-yellow-700 hover:bg-yellow-200/60 border-yellow-200 hover:border-yellow-200/80 hover:text-yellow-800',
        blue: 'bg-blue-200 text-blue-500 hover:bg-blue-200/80 border-blue-200 hover:border-blue-200/80 hover:text-blue-600',
        red: 'bg-red-200 text-red-500 hover:bg-red-200/80 border-red-200 hover:border-red-200/80 hover:text-red-600',
        green:
          'bg-green-200 text-green-500 hover:bg-green-200/80 border-green-200 hover:border-green-200/80 hover:text-green-600'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type Color = 'blue' | 'red' | 'green' | 'yellow'

type LoadingMode = 'with-content' | 'spinner-only'

type ButtonProps<T extends React.ElementType = 'button'> = {
  as?: T
  asChild?: boolean
  fullWidth?: boolean
  isLoading?: boolean
  loadingMode?: LoadingMode
  color?: Color
} & VariantProps<typeof buttonVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, 'as'>

export const Button = <T extends React.ElementType = 'button'>({
  className,
  variant = 'default',
  size = 'default',
  as,
  asChild = false,
  fullWidth = false,
  isLoading = false,
  loadingMode = 'with-content',
  children,
  disabled,
  color,
  ...props
}: ButtonProps<T>) => {
  const Comp = asChild ? Slot.Root : (as ?? 'button')

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className, color }), {
        'w-full': fullWidth
      })}
      disabled={isLoading || disabled}
      {...props}>
      {isLoading ? (
        <>
          <Spinner />
          <Show when={loadingMode === 'with-content'}>{children}</Show>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}
export type { ButtonProps }
