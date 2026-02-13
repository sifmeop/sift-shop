import { AddProduct } from './AddProduct'
import { ProductsSearch } from './ProductsSearch'

export const ProductsHeader = () => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Products</h3>
			<div className='flex items-center gap-2'>
				<AddProduct />
				<ProductsSearch />
			</div>
		</div>
	)
}
