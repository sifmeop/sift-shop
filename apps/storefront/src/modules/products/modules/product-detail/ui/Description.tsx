import { EllipsisIcon } from 'lucide-react'

import { ProductSection } from './ProductSection'

interface DescriptionProps {
  description?: string | null
}

export const Description = ({ description }: DescriptionProps) => {
  if (!description) return

  return (
    <ProductSection icon={EllipsisIcon} name='Description'>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </ProductSection>
  )
}
