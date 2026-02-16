import type { CoreRow } from '@tanstack/react-table'
import { useState } from 'react'
import { FormProvider, type FieldPath } from 'react-hook-form'
import { BackButton } from '~/common/ui/BackButton'
import { Button } from '~/common/ui/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '~/common/ui/Card'
import { Stepper } from '~/common/ui/Stepper'
import type { Product } from '~/modules/products/types/product.types'
import { useProductForm } from '../hooks/useProductForm'
import {
	step1Schema,
	step2Schema,
	step3Schema,
	step4Schema,
	step5Schema,
	type ProductSchema
} from '../schemas/product.schema'
import { ProductCategory } from './steps/ProductCategory'
import { ProductFilters } from './steps/ProductFilters'
import { ProductImages } from './steps/ProductImages'
import { ProductInfo } from './steps/ProductInfo'
import { ProductSpecifications } from './steps/ProductSpecifications'
import { ProductSummary } from './steps/ProductSummary'

const STEPS = [
	{ id: '1' },
	{ id: '2' },
	{ id: '3' },
	{ id: '4' },
	{ id: '5' },
	{ id: '6' }
]

const STEP_LABELS = [
	'Category',
	'Filters',
	'Specifications',
	'Info',
	'Images',
	'Summary'
]

const STEP_VALIDATION_SCHEMAS = [
	step1Schema,
	step2Schema,
	step3Schema,
	step4Schema,
	step5Schema
]

interface ProductFormProps {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Product>['original']
}

export const ProductForm = ({ mode, defaultValues }: ProductFormProps) => {
	const [currentStep, setCurrentStep] = useState(0)
	const { form, isLoading, onSubmit } = useProductForm(() => setCurrentStep(0))

	const isEdit = mode === 'edit'
	const title = isEdit
		? `Edit product: ${defaultValues?.name}`
		: 'Create product'
	const isLastStep = currentStep === STEPS.length - 1

	const nextStep = () => {
		const schema = STEP_VALIDATION_SCHEMAS[currentStep]

		if (schema) {
			const result = schema.safeParse(form.getValues())

			if (!result.success) {
				const names = Object.keys(schema.shape) as FieldPath<ProductSchema>[]
				form.trigger(names)
				return
			}
		}

		if (currentStep < STEPS.length - 1) {
			setCurrentStep(currentStep + 1)
		} else {
			onSubmit()
		}
	}

	const prevStep = () => {
		if (currentStep > 0) {
			const newStep = currentStep - 1
			setCurrentStep(newStep)
		}
	}

	const StepContext = [
		ProductCategory,
		ProductFilters,
		ProductSpecifications,
		ProductInfo,
		ProductImages,
		ProductSummary
	][currentStep]

	return (
		<FormProvider {...form}>
			<Card className='w-full max-w-2xl mx-auto'>
				<CardHeader>
					<div className='flex items-center gap-3'>
						<BackButton to='/products' label='Table' />
						<h3 className='font-semibold'>{title}</h3>
					</div>
					<CardTitle className='text-2xl font-bold text-center'>
						{STEP_LABELS[currentStep]}
					</CardTitle>
				</CardHeader>

				<CardContent>
					<Stepper steps={STEPS} currentStep={currentStep} className='mb-6' />

					<form onSubmit={onSubmit}>
						<StepContext />
					</form>
				</CardContent>

				<CardFooter>
					<div className='grid grid-cols-2 gap-4 w-full'>
						<Button
							type='button'
							fullWidth
							onClick={prevStep}
							disabled={currentStep === 0}>
							Back
						</Button>
						<Button
							type='button'
							fullWidth
							onClick={nextStep}
							isLoading={isLoading}>
							{isLastStep ? 'Create' : 'Next'}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</FormProvider>
	)
}
