export const formatCurrency = (value: number, currency: string = 'USD') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2
	}).format(value)
}

export const formatDateTime = (value: Date) => {
	const date = new Date(value)

	if (Number.isNaN(date.getTime())) {
		return '-'
	}

	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

