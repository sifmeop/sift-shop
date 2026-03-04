'use client'

import { useEffect, useRef, useState } from 'react'

import { AlertCircle, Loader2, SearchIcon, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { useDebounce } from '~/common/hooks/useDebounce'
import { InputGroup, InputGroupInput } from '~/common/ui/InputGroup'
import { calcDiscountedPrice } from '~/common/utils/calcDiscountedPrice'
import { cn } from '~/common/utils/cn'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'

import { useSearchQuery } from '../hooks/useSearchQuery'

const MotionInputGroup = motion.create(InputGroup)

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debounceValue = useDebounce(searchValue)
  const { data, loading, error } = useSearchQuery(debounceValue)
  const searchData = data?.search

  const onBlur = () => {
    setIsFocused(false)
    inputRef.current?.blur()
    setSearchValue('')
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBlur()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      <div className='relative md:w-70 h-10 w-10'>
        <MotionInputGroup
          layout
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 35,
            mass: 1
          }}
          className={cn(
            'bg-white z-11 flex flex-col transition-shadow duration-300 overflow-hidden p-0',
            isFocused
              ? 'fixed top-[10%] md:top-[20%] left-1/2 -translate-x-1/2 max-w-[95%] md:max-w-150 w-full h-auto shadow-2xl border-blue-500 rounded-xl'
              : 'relative w-full h-10 border-gray-200 rounded-md'
          )}>
          <div className='flex items-center w-full min-h-10 min-w-10 relative'>
            <div
              onClick={() => !isFocused && inputRef.current?.focus()}
              className='size-10 flex items-center justify-center shrink-0 cursor-pointer'>
              {loading ? (
                <Loader2 className='size-4 animate-spin text-blue-500' />
              ) : (
                <SearchIcon
                  className={cn(
                    'size-4 transition-colors',
                    isFocused && 'text-blue-500'
                  )}
                />
              )}
            </div>

            <InputGroupInput
              ref={inputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder='Search products...'
              className={cn(
                'border-none focus:ring-0 flex-1 transition-all h-10 p-0 pr-4 bg-transparent', // p-0 для инпута, чтобы не толкал иконку
                !isFocused && 'max-md:opacity-0 max-md:w-0 overflow-hidden'
              )}
            />

            {isFocused && (
              <div className='flex items-center gap-2 pr-4'>
                <button
                  onClick={onBlur}
                  className='md:hidden p-1 hover:bg-gray-100 rounded-full shrink-0'>
                  <X className='size-4 text-gray-500' />
                </button>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='hidden md:block text-[10px] uppercase tracking-wider text-gray-400 whitespace-nowrap'>
                  Esc
                </motion.div>
              </div>
            )}
          </div>

          <AnimatePresence>
            {isFocused && (searchValue.length > 0 || loading || error) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className='border-t border-gray-100 overflow-hidden w-full'>
                <div className='max-h-[60vh] md:max-h-80 overflow-y-auto w-full'>
                  {error && (
                    <div className='p-4 flex items-center gap-2 text-red-500'>
                      <AlertCircle className='size-4' />
                      <span className='text-sm'>Something went wrong</span>
                    </div>
                  )}

                  {!loading && searchData && searchData.length > 0 && (
                    <div className='rounded-b-xl overflow-hidden'>
                      {searchData.map((item) => (
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={onBlur}
                          key={item.id}
                          className='px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors'>
                          <div className='w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0 relative'>
                            <Image
                              fill
                              src={getImageUrl(item.images[0])}
                              alt={item.name}
                              className='object-cover'
                            />
                          </div>
                          <div className='flex flex-col mr-auto min-w-0'>
                            <span className='text-sm font-medium text-gray-900 truncate'>
                              {item.name}
                            </span>
                            <span className='text-[10px] text-gray-500'>
                              Stock: {item.stock}
                            </span>
                          </div>
                          <div className='flex flex-col items-end shrink-0'>
                            {item.discountPercent ? (
                              <>
                                <span className='text-sm md:text-base font-bold text-red-500'>
                                  {calcDiscountedPrice(
                                    item.price,
                                    item.discountPercent
                                  )}
                                </span>
                                <span className='text-[10px] text-muted-foreground line-through'>
                                  {formatPrice(item.price)}
                                </span>
                              </>
                            ) : (
                              <span className='text-sm md:text-base font-semibold text-gray-900'>
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {!loading &&
                    !error &&
                    searchData?.length === 0 &&
                    searchValue && (
                      <div className='p-8 text-center text-sm text-gray-500'>
                        No products found for &quot;{searchValue}&quot;
                      </div>
                    )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionInputGroup>
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onBlur}
            className='fixed inset-0 bg-black/40 backdrop-blur-md z-10'
          />
        )}
      </AnimatePresence>
    </>
  )
}
