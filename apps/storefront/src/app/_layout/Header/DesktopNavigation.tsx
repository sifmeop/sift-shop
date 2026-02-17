'use client'

import { useState } from 'react'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import {
  CategoryEntity,
  GetCategoriesQuery
} from '~/common/lib/graphql/generated/graphql'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '~/common/ui/navigation-menu'
import { cn } from '~/common/utils/cn'

interface DesktopNavigationProps {
  data: GetCategoriesQuery | undefined
}

export const DesktopNavigation = ({ data }: DesktopNavigationProps) => {
  return (
    <NavigationMenu className='hidden md:flex'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={ROUTES.HOME}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {data && (
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled={data.categories.length === 0}>
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <CategoriesMenu data={data} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={ROUTES.HOME}>About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={ROUTES.HOME}>Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const CategoriesMenu = ({ data }: { data: GetCategoriesQuery }) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryEntity | null>(
    data.categories[0]
  )

  return (
    <div className='flex w-165 h-112.5'>
      <div className='w-60 border-r bg-muted/30 flex flex-col overflow-y-auto p-4 space-y-1 navigation-scroll'>
        {data.categories.map((category) => {
          // const Icon = category.icon
          const isActive = hoveredCategory?.slug === category.slug
          const href = ROUTES.CATEGORY + '/' + category.slug

          return (
            <div
              key={category.name}
              onMouseEnter={() => setHoveredCategory(category)}>
              <NavigationMenuLink asChild>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group/item',
                    isActive
                      ? // ? 'bg-background shadow-sm'
                        // : 'hover:bg-background'
                        'bg-white shadow-sm'
                      : 'hover:bg-background'
                  )}>
                  {/* <div
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center bg-linear-to-br shrink-0 transition-transform duration-200',
                        category.color,
                        isActive && 'scale-105'
                      )}>
                      <Icon className='w-4 h-4' />
                    </div> */}

                  <span
                    className={cn(
                      'font-medium text-sm transition-colors flex-1',
                      isActive && 'text-primary'
                    )}>
                    {category.name}
                  </span>

                  <ChevronRight
                    className={cn(
                      'w-4 h-4 text-muted-foreground transition-all duration-200',
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    )}
                  />
                </Link>
              </NavigationMenuLink>
            </div>
          )
        })}
      </div>

      <div className='flex-1 flex flex-col overflow-hidden'>
        {hoveredCategory && (
          <>
            <div className='px-6 pt-6 pb-4 border-b bg-background'>
              <h3 className='font-semibold text-lg mb-1'>
                {hoveredCategory.name}
              </h3>
              <p className='text-xs text-muted-foreground'>
                {hoveredCategory.subcategories.length} subcategories available
              </p>
            </div>

            <div className='flex-1 overflow-y-auto px-6 py-4 navigation-scroll'>
              <div
                key={hoveredCategory.name}
                className='animate-in fade-in slide-in-from-left-5 duration-300'>
                <div className='grid grid-cols-2 gap-2'>
                  {hoveredCategory.subcategories.map((sub, index) => (
                    <NavigationMenuLink key={sub.name} asChild>
                      <Link
                        href={
                          ROUTES.CATEGORY +
                          '/' +
                          hoveredCategory.slug +
                          '/' +
                          sub.slug
                        }
                        className='block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all group'
                        style={{
                          animationDelay: `${index * 30}ms`
                        }}>
                        <span className='flex items-center justify-between w-full'>
                          {sub.name}
                          <ChevronRight className='w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all' />
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
