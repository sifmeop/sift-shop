'use client'

import { Controller } from 'react-hook-form'
import { Button } from '~/common/ui/Button'
import { Card, CardContent, CardFooter, CardTitle } from '~/common/ui/Card'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/common/ui/Field'
import { Input, PasswordInput } from '~/common/ui/Input'
import { cn } from '~/common/utils/cn'
import { useLoginForm } from '../hooks/useLoginForm'

export const LoginForm = () => {
	const { onSubmit, form, isLoading } = useLoginForm()

	return (
		<Card
			className={cn('w-full max-w-xs relative', {
				'pointer-events-none': isLoading
			})}>
			<CardTitle className='my-4 mb-8 flex items-center gap-2.5 justify-center'>
				<img src='/assets/images/logo.svg' alt='logo' className='w-4 h-6.5' />
				<span className='text-2xl font-extrabold '>Admin</span>
			</CardTitle>
			<CardContent>
				<form id='login-form' onSubmit={onSubmit}>
					<FieldGroup className='flex flex-col gap-4'>
						<Controller
							name='email'
							control={form.control}
							render={({ field, fieldState }) => {
								const isInvalid = fieldState.invalid
								return (
									<Field className='space-x-2' data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											type='email'
											autoComplete='email'
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											onBlur={field.onBlur}
											placeholder='Enter email'
										/>
										<FieldError error={fieldState.error?.message} />
									</Field>
								)
							}}
						/>
						<Controller
							name='password'
							control={form.control}
							render={({ field, fieldState }) => {
								const isInvalid = fieldState.invalid
								return (
									<Field className='space-x-2' data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<PasswordInput
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											onBlur={field.onBlur}
										/>
										<FieldError error={fieldState.error?.message} />
									</Field>
								)
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className='flex-col gap-2'>
				<Button
					form='login-form'
					type='submit'
					fullWidth
					disabled={isLoading}
					isLoading={isLoading}>
					Login
				</Button>
			</CardFooter>
		</Card>
	)
}
