'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { env } from '~/common/constants/env'
import {
  CategoryEntity,
  SubcategoryEntity
} from '~/common/lib/graphql/generated/graphql'

interface SubcategoryItemProps {
  category: CategoryEntity
  subcategory: SubcategoryEntity
}

export const SubcategoryItem = ({
  category,
  subcategory
}: SubcategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}/${subcategory.slug}`}>
      <motion.div
        className='group relative p-6 border border-border rounded-2xl bg-white overflow-hidden cursor-pointer'
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}>
        <motion.div
          className='absolute inset-0 bg-linear-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100'
          transition={{ duration: 0.3 }}
        />

        <div className='relative overflow-hidden h-48 rounded-xl'>
          <motion.div
            className='size-full'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            <Image
              width={300}
              height={300}
              src={env.NEXT_PUBLIC_IMAGE_BASE_URL + subcategory.image}
              alt={subcategory.name}
              className='size-full object-contain p-4'
            />
          </motion.div>
        </div>

        <div className='relative'>
          <motion.p
            className='text-center font-semibold text-lg text-gray-800 group-hover:text-primary'
            transition={{ duration: 0.2 }}>
            {subcategory.name}
          </motion.p>
        </div>

        <motion.div
          className='absolute inset-0 rounded-2xl pointer-events-none'
          initial={{ boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
          whileHover={{
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  )
}
