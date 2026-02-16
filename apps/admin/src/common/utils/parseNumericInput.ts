type NumericValue = number | ''

interface ParseNumericOptions {
	allowFloat?: boolean
	min?: number
	max?: number
}

export const parseNumericInput = (
	value: string,
	options: ParseNumericOptions = {}
): NumericValue => {
	const { allowFloat = true, min, max } = options

	if (value === '') return ''

	const pattern = allowFloat ? /^-?\d*[.,]?\d*$/ : /^-?\d*$/

	if (!pattern.test(value)) return ''

	const normalizedValue = value.replace(',', '.')

	if (normalizedValue === '-' || normalizedValue === '.') return ''

	const parsed = allowFloat
		? parseFloat(normalizedValue)
		: parseInt(normalizedValue, 10)

	if (isNaN(parsed)) return ''

	if (min !== undefined && parsed < min) return min
	if (max !== undefined && parsed > max) return max

	return parsed
}
