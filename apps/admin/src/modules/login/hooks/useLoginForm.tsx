import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { handleApiError } from '~/common/api/errorHandler'
import { loginSchema, type LoginSchema } from '../schemas/login.schema'
import { useLoginMutation } from './useLoginMutation'

export const useLoginForm = () => {
	const { mutateAsync } = useLoginMutation()
	const navigate = useNavigate()

	const form = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			await mutateAsync(values)
			navigate({ to: '/dashboard' })
		} catch (err) {
			const message = handleApiError(err)
			console.debug('message', message)
		}
	})

	return { onSubmit, form }
}
