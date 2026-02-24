import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { loginSchema, type LoginSchema } from '../schemas/login.schema'
import { useLoginMutation } from './useLoginMutation'

export const useLoginForm = () => {
	const { mutateAsync, isPending: isLoading } = useLoginMutation()

	const form = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = form.handleSubmit(async (values) => {
		if (isLoading) return

		try {
			await mutateAsync(values)
		} catch (err) {
			toast.error(handleApiError(err))
		}
	})

	return { onSubmit, form, isLoading }
}
