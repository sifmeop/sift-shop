import { isAxiosError } from 'axios'
import { ERROR_MESSAGES } from '../constants/errorMessages'

export const handleApiError = (error: unknown) => {
	if (isAxiosError(error)) {
		const code = error.response?.data?.code
		const message = error.response?.data?.message

		if (code && ERROR_MESSAGES[code]) {
			return ERROR_MESSAGES[code]
		}

		if (message) {
			return message
		}
	}

	return {
		message: 'An error occurred'
	}
}
