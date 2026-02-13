import { useStore } from '@tanstack/react-form'
import type { CoreRow } from '@tanstack/react-table'
import { Button } from '~/common/ui/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '~/common/ui/Card'
import { FieldGroup } from '~/common/ui/Field'
import { Show } from '~/common/ui/Show'
import type { Product } from '../../../types/product.types'
import { useProductForm } from '../hooks/useProductForm'
import { SelectCategory } from './SelectCategory'
import { SelectSubcategory } from './SelectSubcategory'

interface ProductsFormProps {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Product>['original']
}

export const ProductsForm = ({ mode, defaultValues }: ProductsFormProps) => {
	const { form, isLoading, onSubmit } = useProductForm()

	const category = useStore(form.store, (state) => state.values.category)

	const isEdit = mode === 'edit'
	const formId = `${mode}-product-${defaultValues?.id || 'new'}`
	const title = isEdit
		? `Edit product: ${defaultValues?.name}`
		: 'Create product'

	return (
		<Card className='w-full max-w-xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-center font-bold text-2xl'>
					{title}
				</CardTitle>
			</CardHeader>

			<CardContent>
				<form id={formId} onSubmit={onSubmit}>
					<FieldGroup>
						<SelectCategory form={form} />
						<Show when={!!category}>
							<SelectSubcategory form={form} category={category} />
						</Show>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Button form={formId} type='submit' fullWidth isLoading={isLoading}>
					Create
				</Button>
			</CardFooter>
		</Card>
	)
}
