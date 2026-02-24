type Diff<T> = {
  [K in keyof T]?: T[K]
}

export const getObjectDiff = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): Diff<T> => {
  const result: Partial<T> = {}

  for (const key in obj1) {
    if (!(key in obj2)) continue

    const val1 = obj1[key]
    const val2 = obj2[key]

    if (val1 !== val2) {
      result[key] = val2
    }
  }

  return result
}
