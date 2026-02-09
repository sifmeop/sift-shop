import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '~/app/routes'
import { handleApiError } from '~/common/api/errorHandler'
import { loginSchema } from '../schemas/login.schema'
import { useLoginMutation } from './useLoginMutation'

export const useLoginForm = () => {
	const navigate = useNavigate()
	const { redirect } = Route.useSearch() as { redirect?: string }
	const { mutateAsync } = useLoginMutation()

	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		validators: {
			onChange: loginSchema
		},
		onSubmit: async ({ value }) => {
			try {
				await mutateAsync(value)

				navigate({ to: redirect ?? '/dashboard' })
			} catch (err) {
				const { message } = handleApiError(err)

				console.debug('message', message)
			}
		}
	})

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return { onSubmit, form }
}
