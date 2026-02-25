import { SearchIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '~/common/ui/input-group'

export const SearchBar = () => {
  return (
    <InputGroup className='w-70'>
      <InputGroupAddon align='inline-start' className='cursor-pointer'>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder='Search products' />
      {/* <InputGroupAddon align='inline-end'>12 results</InputGroupAddon> */}
    </InputGroup>
  )
}
