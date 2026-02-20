import { GithubIcon, Mail } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

export const Footer = () => {
  return (
    <footer className='border-t bg-background'>
      <div className='app-container py-12 md:py-16'>
        <div className='grid gap-8 md:grid-cols-[1fr_auto_auto] md:gap-12'>
          <div className='space-y-3'>
            <Link href={ROUTES.HOME} className='text-xl font-semibold'>
              Sift-Shop
            </Link>
            <p className='text-sm text-muted-foreground max-w-xs'>
              Curating quality products for thoughtful shoppers.
            </p>
          </div>

          <div className='space-y-3'>
            <h3 className='text-sm font-medium'>Explore</h3>
            <nav className='flex flex-col space-y-2'>
              <Link
                href={ROUTES.ABOUT}
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                About
              </Link>
              <Link
                href={ROUTES.CONTACT}
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                Contact
              </Link>
            </nav>
          </div>

          <div className='space-y-3'>
            <h3 className='text-sm font-medium'>Connect</h3>
            <div className='flex gap-3'>
              <a
                href='mailto:hello@sifmeop@gmail.com'
                className='w-9 h-9 rounded-lg border bg-background hover:bg-muted transition-colors flex items-center justify-center'
                aria-label='Email'>
                <Mail className='w-4 h-4' />
              </a>
              <a
                href='https://github.com/sifmeop/sift-shop'
                target='_blank'
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-lg border bg-background hover:bg-muted transition-colors flex items-center justify-center'
                aria-label='GitHub'>
                <GithubIcon className='w-4 h-4' />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
          <p>© {new Date().getFullYear()} Sift-Shop. All rights reserved.</p>
          <div className='flex gap-6'>
            <p className='hover:text-foreground transition-colors cursor-pointer hover:underline'>
              Privacy
            </p>
            <p className='hover:text-foreground transition-colors cursor-pointer hover:underline'>
              Terms
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
