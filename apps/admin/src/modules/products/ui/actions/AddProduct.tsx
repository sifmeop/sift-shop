import { PlusIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { ProductFormDialog } from '../ProductFormDialog'
import type { ProductSubcategory } from '../../types/product.types'

interface AddProductProps {
	subcategories: ProductSubcategory[]
}

export const AddProduct = ({ subcategories }: AddProductProps) => {
	return (
		<ProductFormDialog mode='create' subcategories={subcategories}>
			<Button variant='secondary'>
				<PlusIcon />
				Add
			</Button>
		</ProductFormDialog>
	)
}

