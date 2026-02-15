import type { CoreRow } from '@tanstack/react-table'
import { useState } from 'react'
import { BackButton } from '~/common/ui/BackButton'
import { Button } from '~/common/ui/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '~/common/ui/Card'
import { FieldGroup } from '~/common/ui/Field'
import { Stepper } from '~/common/ui/Stepper'
import type { Product } from '~/modules/products/types/product.types'
import { formContext } from '../contexts/form-context'
import { WizardProvider } from '../contexts/wizard-context'
import { useProductForm } from '../hooks/useProductForm'
import { ProductBasicInfo } from './steps/ProductBasicInfo'
import { ProductFilters } from './steps/ProductFilters'
import { ProductSpecifications } from './steps/ProductSpecifications'
import { ProductSummary } from './steps/ProductSummary'
import { ProductVariants } from './steps/ProductVariants'

const steps = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]

interface ProductFormProps {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Product>['original']
}

export const ProductForm = ({ mode, defaultValues }: ProductFormProps) => {
	const { form, isLoading, onSubmit } = useProductForm()

	const isEdit = mode === 'edit'
	const formId = `${mode}-product-${defaultValues?.id || 'new'}`
	const title = isEdit
		? `Edit product: ${defaultValues?.name}`
		: 'Create product'

	const [activeStep, setActiveStep] = useState(0)
	const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

	const nextStep = () => {
		if (activeStep < steps.length - 1) {
			const newStep = activeStep + 1
			setActiveStep(newStep)
		}
	}

	const prevStep = () => {
		if (activeStep > 0) {
			const newStep = activeStep - 1
			setActiveStep(newStep)
		}
	}

	const StepContext = [
		ProductBasicInfo,
		ProductFilters,
		ProductSpecifications,
		ProductVariants,
		ProductSummary
	][activeStep]

	const wizardValue = {
		activeStep,
		completedSteps,
		markStepComplete: (step: number) => {
			setCompletedSteps((prev) => new Set(prev).add(step))
		}
	}

	return (
		<WizardProvider value={wizardValue}>
			<formContext.Provider value={form}>
				<form.AppForm>
					<Card className='w-full max-w-2xl mx-auto'>
						<CardHeader>
							<BackButton to='/products' />
							<CardTitle className='text-center font-bold text-2xl'>
								{title}
							</CardTitle>
						</CardHeader>

						<CardContent>
							<Stepper
								steps={steps}
								currentStep={activeStep}
								className='mb-6'
							/>

							<form id={formId} onSubmit={onSubmit}>
								<FieldGroup>
									<StepContext />
								</FieldGroup>
							</form>
						</CardContent>

						<CardFooter>
							<div className='grid grid-cols-2 gap-4 w-full'>
								<Button
									type='button'
									fullWidth
									onClick={prevStep}
									disabled={activeStep === 0}>
									Back
								</Button>
								{activeStep === steps.length - 1 ? (
									<Button
										form={formId}
										type='submit'
										fullWidth
										isLoading={isLoading}>
										Create
									</Button>
								) : (
									<Button
										type='button'
										fullWidth
										onClick={nextStep}
										disabled={!completedSteps.has(activeStep)}>
										Next
									</Button>
								)}
							</div>
						</CardFooter>
					</Card>
				</form.AppForm>
			</formContext.Provider>
		</WizardProvider>
	)
}
