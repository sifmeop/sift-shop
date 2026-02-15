'use client'

import { Button } from '~/common/ui/Button'
import { Card, CardContent, CardFooter, CardTitle } from '~/common/ui/Card'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/common/ui/Field'
import { Input, PasswordInput } from '~/common/ui/Input'
import { useLoginForm } from '../hooks/useLoginForm'

export const LoginForm = () => {
	const { onSubmit, form } = useLoginForm()

	return (
		<Card className='w-full max-w-xs relative'>
			<CardTitle className='my-4 mb-8 flex items-center gap-2.5 justify-center'>
				<img src='/assets/images/logo.svg' alt='logo' className='w-4 h-6.5' />
				<span className='text-2xl font-extrabold '>Admin</span>
			</CardTitle>
			<CardContent>
				<form id='login-form' onSubmit={onSubmit}>
					<FieldGroup className='flex flex-col gap-4'>
						<form.Field
							name='email'
							children={(field) => {
								const isInvalid = !field.state.meta.isValid

								return (
									<Field className='space-x-2' data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}></FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											type='email'
											autoComplete='email'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='Enter email'
										/>
										<FieldError errors={field.state.meta.errors} />
									</Field>
								)
							}}
						/>
						<form.Field
							name='password'
							children={(field) => {
								const isInvalid = !field.state.meta.isValid

								return (
									<Field className='space-x-2' data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}></FieldLabel>
										<PasswordInput
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
										<FieldError errors={[field.state.meta.errors[0]]} />
									</Field>
								)
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className='flex-col gap-2'>
				<Button form='login-form' type='submit' fullWidth>
					Login
				</Button>
			</CardFooter>
		</Card>
	)
}
