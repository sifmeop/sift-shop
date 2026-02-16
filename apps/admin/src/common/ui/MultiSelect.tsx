import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cn } from '../utils/cn'

interface MultiSelectProps {
	options: Array<{ value: string; label: string }>
	value?: string[]
	onChange?: (value: string[]) => void
	placeholder?: string
	className?: string
	size?: 'sm' | 'default'
	disabled?: boolean
	maxDisplay?: number
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
	(
		{
			options,
			value = [],
			onChange,
			placeholder = 'Выберите элементы...',
			className,
			size = 'default',
			disabled = false,
			maxDisplay = 3
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false)

		const handleToggle = (optionValue: string) => {
			const newValue = value.includes(optionValue)
				? value.filter((v) => v !== optionValue)
				: [...value, optionValue]
			onChange?.(newValue)
		}

		const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			onChange?.([])
		}

		const selectedLabels = options
			.filter((opt) => value.includes(opt.value))
			.map((opt) => opt.label)

		const displayText = () => {
			if (value.length === 0) return placeholder

			if (value.length <= maxDisplay) {
				return selectedLabels.join(', ')
			}

			return `Выбрано: ${value.length}`
		}

		return (
			<div className='relative w-full'>
				<button
					ref={ref}
					type='button'
					disabled={disabled}
					onClick={() => setIsOpen(!isOpen)}
					data-size={size}
					className={cn(
						'border-input text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8',
						value.length > 0 && 'text-foreground',
						className
					)}>
					<span className='truncate text-left'>{displayText()}</span>
					<div className='flex items-center gap-1'>
						{value.length > 0 && !disabled && (
							<button
								type='button'
								onClick={handleClear}
								className='hover:bg-accent rounded-sm p-0.5 transition-colors'>
								<XIcon className='size-3.5 opacity-50 hover:opacity-100' />
							</button>
						)}
						<ChevronDownIcon
							className={cn(
								'size-4 opacity-50 transition-transform',
								isOpen && 'rotate-180'
							)}
						/>
					</div>
				</button>

				{isOpen && (
					<>
						<div
							className='fixed inset-0 z-40'
							onClick={() => setIsOpen(false)}
						/>
						<div
							className={cn(
								'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 absolute top-full z-50 mt-1 max-h-60 w-full origin-top overflow-y-auto rounded-md border shadow-md'
							)}>
							<div className='p-1'>
								{options.map((option) => {
									const isSelected = value.includes(option.value)
									return (
										<button
											key={option.value}
											type='button'
											onClick={() => handleToggle(option.value)}
											className={cn(
												'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none transition-colors hover:bg-accent hover:text-accent-foreground',
												isSelected && 'bg-accent/50'
											)}>
											<span className='flex flex-1 items-center gap-2 text-left'>
												{option.label}
											</span>
											{isSelected && (
												<span className='absolute right-2 flex size-3.5 items-center justify-center'>
													<CheckIcon className='size-4' />
												</span>
											)}
										</button>
									)
								})}
							</div>
						</div>
					</>
				)}
			</div>
		)
	}
)

MultiSelect.displayName = 'MultiSelect'
