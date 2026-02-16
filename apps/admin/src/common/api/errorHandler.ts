import { isAxiosError } from 'axios'

export const handleApiError = (error: unknown): string => {
	if (isAxiosError(error)) {
		const message = error.response?.data?.message

		if (message) {
			return message
		}
	}

	return 'An error occurred'
}
