import { use } from 'react'

import { getCategories } from '~/modules/categories'

import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'

export const Navigation = () => {
  const { data } = use(getCategories())

  return (
    <>
      <div className='hidden lg:block'>
        <DesktopNavigation data={data} />
      </div>

      <div className='block lg:hidden'>
        <MobileNavigation data={data} />
      </div>
    </>
  )
}
