'use client'

import { useState } from 'react'

import { ChevronRight, Menu, XIcon } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { GetCategoriesQuery } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '~/common/ui/drawer'
import { cn } from '~/common/utils/cn'

interface MobileNavigationProps {
  data?: GetCategoriesQuery
}

export const MobileNavigation = ({ data }: MobileNavigationProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden p-2 hover:bg-accent rounded-md transition-colors'
          aria-label='Open menu'>
          <Menu className='size-6' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='flex flex-row items-center justify-between'>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerClose>
            <XIcon className='size-6' />
          </DrawerClose>
        </DrawerHeader>

        <div className='flex-1 overflow-y-auto navigation-scroll'>
          <div className='p-4 space-y-1'>
            <DrawerClose>
              <Link
                href={ROUTES.HOME}
                className='block px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors'>
                Home
              </Link>
            </DrawerClose>

            <div className='space-y-1'>
              {data?.categories.map((category) => {
                // const Icon = category.icon
                const isExpanded = expandedCategory === category.name

                return (
                  <div key={category.name}>
                    <button
                      onClick={() =>
                        setExpandedCategory(isExpanded ? null : category.name)
                      }
                      className='w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-lg transition-colors'>
                      {/* <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br shrink-0',
                          category.color
                        )}>
                        <Icon className='w-4 h-4' />
                      </div> */}
                      <span className='flex-1 text-left text-sm font-medium'>
                        {category.name}
                      </span>
                      <ChevronRight
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isExpanded && 'rotate-90'
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className='ml-11 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200'>
                        {category.subcategories.map((sub) => (
                          <DrawerClose key={sub.name}>
                            <Link
                              href={ROUTES.CATEGORY + '/' + sub.slug}
                              className='block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors'>
                              {sub.name}
                            </Link>
                          </DrawerClose>
                        ))}
                        <DrawerClose>
                          <Link
                            href={ROUTES.CATEGORY + '/' + category.slug}
                            className='block px-4 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md transition-colors mt-2'>
                            View all {category.name} →
                          </Link>
                        </DrawerClose>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <DrawerClose>
              <Link
                href={ROUTES.ABOUT}
                className='block px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors'>
                About
              </Link>
            </DrawerClose>

            <DrawerClose>
              <Link
                href={ROUTES.CONTACT}
                className='block px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors'>
                Contact
              </Link>
            </DrawerClose>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <div className='border-t pt-4'>
              <Link
                href={ROUTES.CATEGORY}
                className='block px-4 py-3 text-sm font-medium text-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'>
                View All Categories
              </Link>
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
