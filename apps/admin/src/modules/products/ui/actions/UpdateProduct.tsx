import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { ProductFormDialog } from '../ProductFormDialog'
import type { Product, ProductSubcategory } from '../../types/product.types'

interface UpdateProductProps {
	product: Product
	subcategories: ProductSubcategory[]
}

export const UpdateProduct = ({ product, subcategories }: UpdateProductProps) => {
	return (
		<ProductFormDialog mode='edit' product={product} subcategories={subcategories}>
			<Button variant='outline' size='sm'>
				<EditIcon />
				Edit
			</Button>
		</ProductFormDialog>
	)
}

