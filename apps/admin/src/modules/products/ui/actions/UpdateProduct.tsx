import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { ProductsForm } from '../../modules/product-form/ui/ProductForm'

export const UpdateProduct = () => {
	return (
		<ProductsForm mode='edit'>
			<Button variant='default' size='icon' color='yellow'>
				<EditIcon />
			</Button>
		</ProductsForm>
	)
}
