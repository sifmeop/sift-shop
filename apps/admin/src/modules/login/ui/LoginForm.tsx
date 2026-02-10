'use client'

import { useIntlayer } from 'react-intlayer'
import { Button } from '~/common/ui/Button'
import { Card, CardContent, CardFooter, CardTitle } from '~/common/ui/Card'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/common/ui/Field'
import { Input, PasswordInput } from '~/common/ui/Input'
import { LanguageSwitcher } from '~/common/ui/LanguageSwitcher'
import { useLoginForm } from '../hooks/useLoginForm'

export const LoginForm = () => {
	const content = useIntlayer('login')

	const { onSubmit, form } = useLoginForm()

	return (
		<Card className='w-full max-w-xs relative'>
			<div className='absolute top-3 right-3'>
				<LanguageSwitcher />
			</div>
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
										<FieldLabel htmlFor={field.name}>
											{content.email}
										</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											type='email'
											autoComplete='email'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder={content.emailPlaceholder.value}
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
										<FieldLabel htmlFor={field.name}>
											{content.password}
										</FieldLabel>
										<PasswordInput
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder={content.passwordPlaceholder.value}
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
					{content.login}
				</Button>
			</CardFooter>
		</Card>
	)
}
