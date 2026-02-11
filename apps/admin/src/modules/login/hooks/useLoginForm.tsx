import { useForm } from '@tanstack/react-form'
import { handleApiError } from '~/common/api/errorHandler'

export const useLoginForm = () => {
	// const { mutateAsync } = useLoginMutation()
	// const navigate = useNavigate()

	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		validators: {
			// onSubmit: loginSchema
		},
		onSubmit: async () => {
			try {
				// await mutateAsync(value)
				// navigate({ to: '/dashboard' })
			} catch (err) {
				const message = handleApiError(err)
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
