import { useEffect, useState } from 'react'

import { NOVA_POST_BASE_URL } from '~/common/constants/common'
import { useDebounce } from '~/common/hooks/useDebounce'
import { useNovaPostStore } from '~/common/stores/nova-post/index.ts/nova-post.store'

export const useFetchCities = () => {
  const [rawValue, setRawValue] = useState('')
  const [cities, setCities] = useState([])
  const debounceValue = useDebounce(rawValue, 500)
  const getToken = useNovaPostStore((state) => state.getToken)

  useEffect(() => {
    const fetchCities = async () => {
      const name = debounceValue.trim().toLowerCase()

      if (name.length === 0) return

      setCities([])

      try {
        const token = await getToken()

        if (!token) return

        const response = await fetch(
          NOVA_POST_BASE_URL + `/divisions?&limit=10&name=*Львів*`,
          {
            headers: {
              Authorization: `${token}`
            }
          }
        )

        if (!response.ok) return

        const data = await response.json()

        setCities(data)
      } catch (error) {
        console.debug(`Error fetching cities: ${error}`)
      }
    }

    fetchCities()
  }, [debounceValue])

  return { rawValue, setRawValue, cities }
}
