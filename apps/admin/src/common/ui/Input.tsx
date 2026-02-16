'use client'

import { EyeIcon, EyeOffIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../utils/cn'
import { parseNumericInput } from '../utils/parseNumericInput'
import { InputGroup, InputGroupAddon, InputGroupInput } from './InputGroup'

export const Input = ({
	className,
	type,
	...props
}: React.ComponentProps<'input'>) => {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
			{...props}
		/>
	)
}

export const PasswordInput = (props: React.ComponentProps<'input'>) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleToggle = () => {
		setShowPassword(!showPassword)
	}

	const Icon = showPassword ? EyeIcon : EyeOffIcon

	return (
		<InputGroup>
			<InputGroupInput
				type={showPassword ? 'text' : 'password'}
				name='password'
				autoComplete='current-password'
				placeholder='Enter password'
				{...props}
			/>
			<InputGroupAddon align='inline-end'>
				<button type='button' className='size-[70%]'>
					<Icon onClick={handleToggle} className='cursor-pointer size-full' />
				</button>
			</InputGroupAddon>
		</InputGroup>
	)
}

export const SearchInput = (props: React.ComponentProps<'input'>) => {
	return (
		<InputGroup>
			<InputGroupInput
				type='search'
				name='search'
				autoComplete='search'
				placeholder='Search'
				{...props}
			/>
			<InputGroupAddon align='inline-start'>
				<SearchIcon />
			</InputGroupAddon>
		</InputGroup>
	)
}

interface InputNumber extends React.ComponentProps<'input'> {
	value: string
	onChangeValue: (value: string) => void
	min?: number
	max?: number
	allowFloat?: boolean
	decimalPlaces?: number
}

export const InputNumber = ({
	value,
	onChangeValue,
	allowFloat = false,
	min,
	max,
	decimalPlaces = 2,
	...props
}: InputNumber) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value

		const pattern = allowFloat ? /^\d*\.?\d*$/ : /^\d*$/

		if (rawValue !== '' && !pattern.test(rawValue)) {
			return
		}

		if (allowFloat && rawValue.includes('.')) {
			const [, decimal] = rawValue.split('.')
			if (decimal && decimal.length > decimalPlaces) {
				return
			}
		}

		onChangeValue(rawValue)
	}

	const handleBlur = () => {
		if (value === '' || value === '.') {
			onChangeValue('')
			return
		}

		const parsed = parseNumericInput(value, {
			allowFloat,
			min,
			max
		})

		let finalValue = parsed === '' ? value : parsed

		if (allowFloat && finalValue !== '' && !isNaN(Number(finalValue))) {
			finalValue = Number(Number(finalValue).toFixed(decimalPlaces))
		}

		onChangeValue(String(finalValue))
	}

	return (
		<Input
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
			inputMode='decimal'
			{...props}
		/>
	)
}
