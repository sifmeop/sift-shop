import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { handleApiError } from '~/common/api/errorHandler'
import { useLoginMutation } from './useLoginMutation'

export const useLoginForm = () => {
	const { mutateAsync } = useLoginMutation()
	const navigate = useNavigate()

	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		validators: {
			// onSubmit: loginSchema
		},
		onSubmit: async ({ value }) => {
			try {
				// await mutateAsync(value)
				navigate({ to: '/dashboard' })
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
