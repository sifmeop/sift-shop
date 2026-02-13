export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const ACCEPTED_IMAGE_TYPES = [
	'image/jpg',
	'image/jpeg',
	'image/png',
	'image/webp'
]

export const ACCEPTED_IMAGE_EXTENSIONS = ACCEPTED_IMAGE_TYPES.map(
	(type) => '.' + type.split('/')[1]
).join(',')

export interface FileValidationResult {
	isValid: boolean
	error: string | null
}

export const validateImageFile = (file: File | null): FileValidationResult => {
	if (!file) {
		return {
			isValid: false,
			error: 'File is required'
		}
	}

	if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
		return {
			isValid: false,
			error: `Invalid file type. Only ${ACCEPTED_IMAGE_EXTENSIONS} are allowed`
		}
	}

	if (file.size > MAX_FILE_SIZE) {
		const sizeMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(0)
		return {
			isValid: false,
			error: `File size must be less than ${sizeMB}MB`
		}
	}

	return {
		isValid: true,
		error: null
	}
}
