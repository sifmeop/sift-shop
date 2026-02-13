export const parseRangeValue = (
  value: string | null,
  defaultValue: number[]
): number[] => {
  if (!value || !value.match(/^\d+-\d+$/)) {
    return defaultValue
  }

  const [minStr, maxStr] = value.split('-')

  const min = parseInt(minStr, 10)
  const max = parseInt(maxStr, 10)

  if (Number.isNaN(min) || Number.isNaN(max) || min > max) {
    return defaultValue
  }

  return [min, max]
}
