import z from 'zod'

export const englishField = <Optional extends boolean = false>(
  fieldName: string,
  min = 2,
  max = 32,
  options?: { optional?: Optional; allowNumbers?: boolean }
): Optional extends true ? z.ZodOptional<z.ZodString> : z.ZodString => {
  const pattern = options?.allowNumbers ? /^[A-Za-z0-9\s]+$/ : /^[A-Za-z\s]+$/

  if (options?.optional) {
    return z.string().optional() as never
  }

  const schema = z
    .string(`${fieldName} is required`)
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`)
    .regex(
      pattern,
      `${fieldName} must contain only English${options?.allowNumbers ? ' letters and numbers' : ' letters'}`
    )

  return schema as never
}
