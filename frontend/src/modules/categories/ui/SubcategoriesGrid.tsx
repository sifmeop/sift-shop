'use client'

import { motion } from 'motion/react'

import { CategoryEntity } from '~/common/lib/graphql/generated/graphql'
import { Container } from '~/common/ui/container'

import { SubcategoryItem } from './SubcategoryItem'

interface SubcategoriesGrid {
  category: CategoryEntity
}

export const SubcategoriesGrid = ({ category }: SubcategoriesGrid) => {
  return (
    <Container
      bgColor='white'
      innerClassName='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10'>
      {category.subcategories.map((subcategory, index) => (
        <motion.div
          key={subcategory.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: [0.25, 0.4, 0.25, 1]
          }}>
          <SubcategoryItem category={category} subcategory={subcategory} />
        </motion.div>
      ))}
    </Container>
  )
}
