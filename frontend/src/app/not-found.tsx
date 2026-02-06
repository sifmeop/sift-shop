import { Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

export default function NotFound() {
  return (
    <div className='min-h-[calc(100dvh-250px)] flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full text-center space-y-8'>
        <div className='space-y-4'>
          <h1 className='text-[120px] md:text-[180px] font-bold leading-none tracking-tight text-foreground/10'>
            404
          </h1>
          <div className='-mt-16 md:-mt-24 space-y-3'>
            <h2 className='text-2xl md:text-3xl font-semibold'>
              Page Not Found
            </h2>
            <p className='text-muted-foreground text-sm md:text-base max-w-md mx-auto'>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
          <Link
            href={ROUTES.HOME}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors font-medium min-w-40'>
            <Home className='w-4 h-4' />
            Go Home
          </Link>
          <Link
            href={ROUTES.CATEGORIES}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 border border-input rounded-md hover:bg-accent transition-colors font-medium min-w-40'>
            <ShoppingBag className='w-4 h-4' />
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
