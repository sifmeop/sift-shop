import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const getMatches = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getMatches)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQueryList = window.matchMedia(query)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQueryList.matches)

    mediaQueryList.addEventListener('change', handler)

    return () => {
      mediaQueryList.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}
