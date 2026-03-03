'use client'

import { useState } from 'react'

import { ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '~/common/ui/Pagination'
import { Show } from '~/common/ui/show'

import { useGetOrdersQuery } from '../hooks/useGetOrdersQuery'

import { OrderItem } from './OrderItem'

const LIMIT_PER_PAGE = 5

export const OrdersList = () => {
  const [skip, setSkip] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading, error } = useGetOrdersQuery(skip, LIMIT_PER_PAGE)

  const orders = data?.orders?.orders
  const total = data?.orders?.total ?? 0

  if (error) {
    return (
      <p className='text-center font-medium'>
        Something went wrong, please try again later
      </p>
    )
  }

  if (!orders || loading) {
    return <CenterLoader />
  }

  if (!orders.length) {
    return (
      <div className='flex flex-col items-center justify-center px-4 text-center'>
        <div className='size-20 bg-muted rounded-full flex items-center justify-center mb-6'>
          <ShoppingBag className='size-10 text-muted-foreground/60' />
        </div>

        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          No orders yet
        </h2>
        <p className='text-muted-foreground mt-2 max-w-75 mx-auto'>
          It looks like you haven&apos;t placed any orders. Time to explore our
          collection!
        </p>

        <Button
          as={Link}
          href={ROUTES.HOME}
          className='mt-8 inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3'>
          Start Shopping
          <ArrowRight className='size-4' />
        </Button>
      </div>
    )
  }

  const totalPages = Math.ceil(total / LIMIT_PER_PAGE)

  return (
    <div className='space-y-3 sm:space-y-4'>
      {orders.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
      <Show when={totalPages > 1}>
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => {
                      setCurrentPage(page)
                      setSkip((page - 1) * LIMIT_PER_PAGE)
                      window.scrollTo(0, 0)
                    }}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          </PaginationContent>
        </Pagination>
      </Show>
    </div>
  )
}
