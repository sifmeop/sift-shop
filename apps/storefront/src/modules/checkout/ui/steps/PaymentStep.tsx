import { Controller, useFormContext } from 'react-hook-form'

import clsx from 'clsx'

import { PaymentMethod } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Label } from '~/common/ui/label'

import { CheckoutFormData } from '../../schemas/checkout.schema'

interface PaymentStepProps {
  onNext: () => void
}

const CreditCardIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    className='w-6 h-6'
    stroke='currentColor'
    strokeWidth={1.5}>
    <rect x='2' y='5' width='20' height='14' rx='3' />
    <path d='M2 10h20' strokeLinecap='round' />
    <path d='M6 15h4' strokeLinecap='round' />
    <path d='M14 15h4' strokeLinecap='round' />
  </svg>
)

const CashIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    className='w-6 h-6'
    stroke='currentColor'
    strokeWidth={1.5}>
    <rect x='2' y='7' width='20' height='13' rx='2' />
    <path d='M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' />
    <path d='M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2' />
    <circle cx='12' cy='14' r='1.5' fill='currentColor' stroke='none' />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
    <path
      fillRule='evenodd'
      d='M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z'
      clipRule='evenodd'
    />
  </svg>
)

const PAYMENT_OPTIONS = [
  {
    value: PaymentMethod.Card,
    label: 'Pay with Card',
    description: 'Visa, Mastercard, or any debit card',
    icon: CreditCardIcon,
    gradient: 'from-blue-500 to-violet-500',
    ring: 'ring-blue-500/30',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    value: PaymentMethod.Cash,
    label: 'Pay with Cash',
    description: 'Pay in person upon delivery',
    icon: CashIcon,
    gradient: 'from-emerald-500 to-teal-500',
    ring: 'ring-emerald-500/30',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  }
] as const

export const PaymentStep = ({}: PaymentStepProps) => {
  const { control } = useFormContext<CheckoutFormData>()

  return (
    <div className='flex flex-col justify-between flex-1 gap-5'>
      <div>
        <Label className='text-xs font-semibold uppercase tracking-widest mb-3'>
          Choose Payment Method
        </Label>

        <Controller
          name='method'
          control={control}
          render={({ field, fieldState }) => (
            <div className='flex flex-col gap-3'>
              {PAYMENT_OPTIONS.map((option) => {
                const isSelected = field.value === option.value
                const Icon = option.icon

                return (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => field.onChange(option.value)}
                    className={clsx(
                      'relative flex items-center gap-4 w-full text-left px-4 py-4 rounded-lg border-2 transition-all duration-200 outline-none',
                      isSelected
                        ? `border-transparent ring-2 ${option.ring} shadow-md bg-white`
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                    )}>
                    {isSelected && (
                      <span
                        className={clsx(
                          'absolute inset-0 rounded-lg bg-linear-to-br opacity-[0.05] pointer-events-none',
                          option.gradient
                        )}
                      />
                    )}

                    <span
                      className={clsx(
                        'shrink-0 flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-200',
                        isSelected ? option.iconBg : 'bg-slate-100'
                      )}>
                      <span
                        className={
                          isSelected ? option.iconColor : 'text-slate-400'
                        }>
                        <Icon />
                      </span>
                    </span>

                    <span className='flex flex-col min-w-0 flex-1'>
                      <span
                        className={clsx(
                          'text-sm font-semibold leading-tight',
                          isSelected ? 'text-slate-900' : 'text-slate-600'
                        )}>
                        {option.label}
                      </span>
                      <span className='text-xs text-slate-400 mt-0.5'>
                        {option.description}
                      </span>
                    </span>

                    <span className='ml-auto shrink-0'>
                      {isSelected ? (
                        <span
                          className={clsx(
                            'flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-br',
                            option.gradient
                          )}>
                          <span className='text-white'>
                            <CheckIcon />
                          </span>
                        </span>
                      ) : (
                        <span className='w-6 h-6 rounded-full border-2 border-slate-200 block' />
                      )}
                    </span>
                  </button>
                )
              })}

              {fieldState.error && (
                <p className='text-xs text-red-500 mt-1 ml-1'>
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <Button fullWidth type='submit'>
        Confirm Order
      </Button>
    </div>
  )
}
