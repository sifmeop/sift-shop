import { useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useDebounce } from '~/common/hooks/useDebounce'
import { FilterOptionEntity } from '~/common/lib/graphql/generated/graphql'
import { Input } from '~/common/ui/input'
import { Separator } from '~/common/ui/separator'
import { Slider } from '~/common/ui/Slider'
import { parseNumericInput } from '~/common/utils/parseNumericInput'

import { parseRangeValue } from '../utils/parseRangeValue'

interface FilterRangeProps {
  filterKey: string
  options: FilterOptionEntity[]
}

export const FilterRange = ({ filterKey, options }: FilterRangeProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const min = +options[0].value
  const max = +options[1].value

  const valueFromUrl = searchParams.get(filterKey)

  const [value, setValue] = useState(parseRangeValue(valueFromUrl, [min, max]))
  const [inputValues, setInputValues] = useState([
    String(value[0]),
    String(value[1])
  ])

  const debouncedValue = useDebounce(value, 300)

  // useEffect(() => {
  //   console.debug('RENDER 1')
  //   const valueFromUrl = parseRangeValue(searchParams.get(filterKey), [
  //     min,
  //     max
  //   ])

  //   if (valueFromUrl[0] === min && valueFromUrl[1] === max) {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setValue([min, max])
  //     setInputValues([String(min), String(max)])
  //   }
  // }, [searchParams])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    if (debouncedValue[0] === min && debouncedValue[1] === max) {
      searchParams.delete(filterKey)
    } else {
      searchParams.set(filterKey, debouncedValue.join('-'))
    }

    router.push(`${pathname}?${searchParams.toString()}`)
  }, [debouncedValue])

  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value

      if (rawValue !== '' && !/^\d*$/.test(rawValue)) {
        return
      }

      setInputValues((prev) => {
        const newValues = [...prev]
        newValues[index] = rawValue
        return newValues
      })
    }

  const handleInputBlur = (index: number) => () => {
    const rawValue = value[index]

    const parsed = parseNumericInput(rawValue + '', {
      allowFloat: false,
      min: index === 0 ? min : value[0],
      max: index === 1 ? max : value[1]
    })

    const finalValue = parsed === '' ? (index === 0 ? min : max) : parsed

    setValue((prev) => {
      const newValue = [...prev]
      newValue[index] = finalValue
      return newValue
    })

    setInputValues((prev) => {
      const newValues = [...prev]
      newValues[index] = String(finalValue)
      return newValues
    })
  }

  const handleSliderChange = (value: number[]) => {
    setValue(value)
    setInputValues([String(value[0]), String(value[1])])
  }

  return (
    <div className='space-y-2'>
      <div className='items-center gap-2 grid grid-cols-[1fr_10%_1fr]'>
        <Input
          value={inputValues[0]}
          className='text-xs p-2 h-auto'
          onChange={handleInputChange(0)}
          onBlur={handleInputBlur(0)}
          inputMode='decimal'
        />
        <Separator />
        <Input
          value={inputValues[1]}
          className='text-xs p-2 h-auto'
          onChange={handleInputChange(1)}
          onBlur={handleInputBlur(1)}
          inputMode='decimal'
        />
      </div>
      <Slider
        min={min}
        max={max}
        value={value}
        onValueChange={handleSliderChange}
      />
    </div>
  )
}
