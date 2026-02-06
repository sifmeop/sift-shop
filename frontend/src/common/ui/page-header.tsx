import { Fragment } from 'react/jsx-runtime'

import { ROUTES } from '../constants/routes'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb'
import { Container } from './container'
import { Show } from './show'

interface BreadcrumbProps {
  label: string
  href?: string
}

interface PageHeaderProps {
  title?: string
  breadcrumbs: BreadcrumbProps[]
}

export const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
  return (
    <Container className='py-4.5'>
      <Show when={!!title}>
        <h1 className='font-bold text-2xl mb-2'>{title}</h1>
      </Show>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.HOME}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbs.map(({ label, href }, idx) => (
            <Fragment key={label}>
              <BreadcrumbItem>
                {href ? (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {idx !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  )
}
