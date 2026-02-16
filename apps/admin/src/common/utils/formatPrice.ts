export const formatPrice = (price: string = '0', sign: boolean = true) => {
	const options: Partial<Intl.ResolvedNumberFormatOptions> = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}

	if (sign) {
		options.style = 'currency'
		options.currency = 'USD'
	}

	return new Intl.NumberFormat('en-US', options).format(Number(price))
}
