'use client'

import { useState } from 'react'

import {
  ChevronRight,
  Dumbbell,
  Home,
  type LucideIcon,
  Menu,
  Shirt,
  Smartphone,
  XIcon
} from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '~/common/ui/navigation-menu'
import { cn } from '~/common/utils/cn'

// Типы для категорий
interface Subcategory {
  name: string
  href: string
}

interface Category {
  name: string
  href: string
  icon: LucideIcon
  color: string
  subcategories: Subcategory[]
}

const categories: Category[] = [
  {
    name: 'Electronics',
    href: '/categories/electronics',
    icon: Smartphone,
    color: 'from-blue-500/10 to-blue-600/5 text-blue-600',
    subcategories: [
      { name: 'Smartphones', href: '/categories/electronics/smartphones' },
      { name: 'Laptops', href: '/categories/electronics/laptops' },
      { name: 'Headphones', href: '/categories/electronics/headphones' },
      { name: 'Cameras', href: '/categories/electronics/cameras' },
      { name: 'Tablets', href: '/categories/electronics/tablets' },
      { name: 'Smart Watches', href: '/categories/electronics/smart-watches' },
      { name: 'Gaming', href: '/categories/electronics/gaming' },
      { name: 'TV & Audio', href: '/categories/electronics/tv-audio' }
    ]
  },
  {
    name: 'Clothing',
    href: '/categories/clothing',
    icon: Shirt,
    color: 'from-purple-500/10 to-purple-600/5 text-purple-600',
    subcategories: [
      { name: 'Men', href: '/categories/clothing/men' },
      { name: 'Women', href: '/categories/clothing/women' },
      { name: 'Kids', href: '/categories/clothing/kids' },
      { name: 'Accessories', href: '/categories/clothing/accessories' },
      { name: 'Shoes', href: '/categories/clothing/shoes' },
      { name: 'Bags', href: '/categories/clothing/bags' }
    ]
  },
  {
    name: 'Home & Garden',
    href: '/categories/home-garden',
    icon: Home,
    color: 'from-green-500/10 to-green-600/5 text-green-600',
    subcategories: [
      { name: 'Furniture', href: '/categories/home-garden/furniture' },
      { name: 'Decor', href: '/categories/home-garden/decor' },
      { name: 'Kitchen', href: '/categories/home-garden/kitchen' },
      { name: 'Garden', href: '/categories/home-garden/garden' },
      { name: 'Bathroom', href: '/categories/home-garden/bathroom' },
      { name: 'Lighting', href: '/categories/home-garden/lighting' },
      { name: 'Bedding', href: '/categories/home-garden/bedding' }
    ]
  },
  {
    name: 'Sports',
    href: '/categories/sports',
    icon: Dumbbell,
    color: 'from-orange-500/10 to-orange-600/5 text-orange-600',
    subcategories: [
      { name: 'Fitness', href: '/categories/sports/fitness' },
      { name: 'Outdoor', href: '/categories/sports/outdoor' },
      { name: 'Team Sports', href: '/categories/sports/team' },
      { name: 'Cycling', href: '/categories/sports/cycling' },
      { name: 'Water Sports', href: '/categories/sports/water' }
    ]
  },
  {
    name: 'Books',
    href: '/categories/books',
    icon: Smartphone,
    color: 'from-red-500/10 to-red-600/5 text-red-600',
    subcategories: [
      { name: 'Fiction', href: '/categories/books/fiction' },
      { name: 'Non-Fiction', href: '/categories/books/non-fiction' },
      { name: 'Children', href: '/categories/books/children' },
      { name: 'Comics', href: '/categories/books/comics' }
    ]
  }
]

export const Navigation = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.HOME}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.CATEGORIES}>Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.ABOUT}>About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.CONTACT}>Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* <NavigationMenu className='hidden md:flex'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.HOME}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <CategoriesMenu categories={categories} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.HOME}>About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}>
              <Link href={ROUTES.HOME}>Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <MobileMenu categories={categories} /> */}
    </>
  )
}

const CategoriesMenu = ({ categories }: { categories: Category[] }) => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(
    categories[0]
  )

  return (
    <div className='flex w-150 h-112.5'>
      <div className='w-62.5 border-r bg-muted/30 flex flex-col'>
        <div className='flex-1 overflow-y-auto p-4 space-y-1 navigation-scroll'>
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = hoveredCategory?.name === category.name

            return (
              <div
                key={category.name}
                onMouseEnter={() => setHoveredCategory(category)}>
                <NavigationMenuLink asChild>
                  <Link
                    href={category.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group/item',
                      isActive
                        ? 'bg-background shadow-sm'
                        : 'hover:bg-background/50'
                    )}>
                    <div
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center bg-linear-to-br shrink-0 transition-transform duration-200',
                        category.color,
                        isActive && 'scale-105'
                      )}>
                      <Icon className='w-4 h-4' />
                    </div>

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

        <div className='border-t p-4 bg-muted/30'>
          <Link
            href='/categories'
            className='text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-1 group px-3'>
            View all
            <ChevronRight className='w-3 h-3 group-hover:translate-x-0.5 transition-transform' />
          </Link>
        </div>
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
                        href={sub.href}
                        className='block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all group'
                        style={{
                          animationDelay: `${index * 30}ms`
                        }}>
                        <span className='flex items-center justify-between'>
                          {sub.name}
                          <ChevronRight className='w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all' />
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </div>

            <div className='px-6 py-4 border-t bg-background'>
              <Link
                href={hoveredCategory.href}
                className='inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 group'>
                View all in {hoveredCategory.name}
                <ChevronRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const MobileMenu = ({ categories }: { categories: Category[] }) => {
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
              {categories.map((category) => {
                const Icon = category.icon
                const isExpanded = expandedCategory === category.name

                return (
                  <div key={category.name}>
                    <button
                      onClick={() =>
                        setExpandedCategory(isExpanded ? null : category.name)
                      }
                      className='w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-lg transition-colors'>
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br shrink-0',
                          category.color
                        )}>
                        <Icon className='w-4 h-4' />
                      </div>
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
                              href={sub.href}
                              className='block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors'>
                              {sub.name}
                            </Link>
                          </DrawerClose>
                        ))}
                        <DrawerClose>
                          <Link
                            href={category.href}
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
                href={ROUTES.HOME}
                className='block px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors'>
                About
              </Link>
            </DrawerClose>

            <DrawerClose>
              <Link
                href={ROUTES.HOME}
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
                href='/categories'
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
