import { AddProduct } from './actions/AddProduct'
import { ProductsSearch } from './ProductsSearch'
import { SubcategoriesSelect } from './SubcategoriesSelect'
import type { ProductSubcategory } from '../types/product.types'

interface ProductsHeaderProps {
	searchValue: string
	onSearchChange: (value: string) => void
	selectedSubcategoryId: string
	onSubcategoryChange: (value: string) => void
	subcategoriesWithProducts: ProductSubcategory[]
	allSubcategories: ProductSubcategory[]
	isSubcategoriesLoading: boolean
}

export const ProductsHeader = ({
	searchValue,
	onSearchChange,
	selectedSubcategoryId,
	onSubcategoryChange,
	subcategoriesWithProducts,
	allSubcategories,
	isSubcategoriesLoading
}: ProductsHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Products</h3>
			<div className='flex items-center gap-2'>
				<AddProduct subcategories={allSubcategories} />
				<SubcategoriesSelect
					items={subcategoriesWithProducts}
					value={selectedSubcategoryId}
					onChange={onSubcategoryChange}
					disabled={isSubcategoriesLoading}
				/>
				<ProductsSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}

