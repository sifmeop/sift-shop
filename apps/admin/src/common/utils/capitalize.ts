export const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1)

export const capitalizeFirstStrict = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
