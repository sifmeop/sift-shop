import {
	CheckCircle2Icon,
	DollarSignIcon,
	Edit2Icon,
	FileTextIcon,
	ImageIcon,
	LayersIcon,
	PackageIcon,
	StarIcon,
	TagIcon
} from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Gallery } from '~/common/ui/Gallery'
import { cn } from '~/common/utils/cn'
import { formatPrice } from '~/common/utils/formatPrice'
import type { ProductSchema } from '../../schemas/product.schema'

interface ProductSummaryProps {
	onEdit?: (step: number) => void
}

export const ProductSummary = ({ onEdit }: ProductSummaryProps) => {
	const { watch } = useFormContext<ProductSchema>()

	const category = watch('category')
	const subcategory = watch('subcategory')
	const filters = watch('filters') ?? []
	const specifications = watch('specifications') ?? []
	const name = watch('name')
	const description = watch('description')
	const price = watch('price')
	const stock = watch('stock')
	const images = watch('images') ?? []

	const sections = [
		{
			step: 1,
			title: 'Category',
			icon: LayersIcon,
			items: [
				{
					label: 'Category',
					value: category?.name
				},
				{
					label: 'Subcategory',
					value: subcategory?.name
				}
			]
		},
		{
			step: 2,
			title: 'Filters',
			icon: TagIcon,
			items: filters.map((filter) => ({
				label: filter.name,
				value: filter.valueLabel
			}))
		},
		{
			step: 3,
			title: 'Specifications',
			icon: FileTextIcon,
			items: specifications.map((spec) => ({
				label: spec.name,
				value: spec.value
			}))
		},
		{
			step: 4,
			title: 'Product Details',
			icon: PackageIcon,
			items: [
				{ label: 'Name', value: name },
				{
					label: 'Description',
					value: description
				},
				{
					label: 'Price',
					value: price ? `$${parseFloat(price).toFixed(2)}` : '-',
					highlight: true
				},
				{ label: 'Stock', value: stock ? `${stock} units` : '-' }
			]
		},
		{
			step: 5,
			title: 'Images',
			icon: ImageIcon,
			custom: true
		}
	]

	return (
		<div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<div className='bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100'>
				<div className='flex items-center gap-3 mb-2'>
					<div className='p-2 bg-blue-500 rounded-lg'>
						<CheckCircle2Icon className='h-6 w-6 text-white' />
					</div>
					<div>
						<h2 className='text-2xl font-bold text-gray-900'>
							Product Summary
						</h2>
						<p className='text-sm text-gray-600'>
							Review your product details before submitting
						</p>
					</div>
				</div>
			</div>

			<div className='space-y-4'>
				{sections.map((section, index) => (
					<div
						key={section.step}
						className='bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-left'
						style={{ animationDelay: `${index * 100}ms` }}>
						<div className='flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200'>
							<div className='flex items-center gap-3'>
								<div className='p-2 bg-white rounded-lg border border-gray-200'>
									<section.icon className='h-5 w-5 text-gray-700' />
								</div>
								<div className='space-y-0.5'>
									<h3 className='font-semibold text-gray-900'>
										{section.title}
									</h3>
									<p className='text-xs text-gray-500'>Step {section.step}</p>
								</div>
							</div>

							{onEdit && (
								<button
									type='button'
									onClick={() => onEdit(section.step)}
									className='flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200'>
									<Edit2Icon className='h-4 w-4' />
									Edit
								</button>
							)}
						</div>

						<div className='px-6 py-4'>
							{section.custom && section.step === 5 ? (
								<div className='space-y-4'>
									<div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
										{images.slice(0, 4).map((image, idx) => (
											<div
												key={idx}
												className='relative aspect-square rounded-lg overflow-hidden bg-gray-100 group'>
												<img
													src={image}
													alt={`Product ${idx + 1}`}
													className='w-full h-full object-cover'
												/>
												{idx === 0 && (
													<div className='absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded shadow-lg'>
														Primary
													</div>
												)}
											</div>
										))}
										{images.length > 4 && (
											<div className='aspect-square rounded-lg bg-gray-100 flex items-center justify-center'>
												<span className='text-sm font-medium text-gray-600'>
													+{images.length - 4} more
												</span>
											</div>
										)}
									</div>

									<div className='pt-4 border-t border-gray-100'>
										<p className='text-xs font-medium text-gray-700 mb-3'>
											Gallery Preview
										</p>
										<Gallery
											images={images}
											className='max-w-full aspect-video w-full'
										/>
									</div>
								</div>
							) : (
								<div>
									{section.items && section.items.length > 0 ? (
										section.items.map((item, idx) => (
											<div
												key={idx}
												className={cn(
													'flex items-start justify-between py-3 group',
													{
														'border-b border-gray-100':
															idx !== section.items.length - 1,
														'pt-0': idx === 0,
														'pb-0': idx === section.items.length - 1
													}
												)}>
												<span className='text-sm font-medium text-gray-600 min-w-30'>
													{item.label}
												</span>
												<span
													className={cn(
														'text-sm text-right flex-1',
														item.highlight
															? 'font-bold text-blue-600 text-lg'
															: 'text-gray-900'
													)}>
													{item.value}
												</span>
											</div>
										))
									) : (
										<p className='text-sm text-gray-400 italic'>No data</p>
									)}
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<div className='bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 animate-in fade-in zoom-in duration-700'>
				<h3 className='text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2'>
					<PackageIcon className='h-4 w-4' />
					Product Card Preview
				</h3>
				<div className='bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300'>
					{images.length > 0 && (
						<div className='aspect-square bg-gray-100 overflow-hidden p-4'>
							<img
								src={images[0]}
								alt={name}
								className='size-full object-contain hover:scale-105 transition-transform duration-300'
							/>
						</div>
					)}

					<div className='p-4 space-y-2'>
						<h4 className='font-bold text-lg text-gray-900 line-clamp-2'>
							{name}
						</h4>

						<div className='flex items-center gap-1'>
							{[1, 2, 3, 4, 5].map((star) => (
								<StarIcon
									key={star}
									className='size-4 text-yellow-400 fill-yellow-400'
								/>
							))}
						</div>

						<div className='pt-2 border-t border-gray-100'>
							<span className='text-2xl font-bold text-gray-900'>
								{formatPrice(price)}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom duration-700'>
				<div className='bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-200'>
					<ImageIcon className='h-6 w-6 text-blue-500 mx-auto mb-2' />
					<p className='text-2xl font-bold text-gray-900'>{images.length}</p>
					<p className='text-xs text-gray-500'>Images</p>
				</div>
				<div className='bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-200'>
					<TagIcon className='h-6 w-6 text-green-500 mx-auto mb-2' />
					<p className='text-2xl font-bold text-gray-900'>{filters.length}</p>
					<p className='text-xs text-gray-500'>Filters</p>
				</div>
				<div className='bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-200'>
					<FileTextIcon className='h-6 w-6 text-purple-500 mx-auto mb-2' />
					<p className='text-2xl font-bold text-gray-900'>
						{specifications.length}
					</p>
					<p className='text-xs text-gray-500'>Specs</p>
				</div>
				<div className='bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-200'>
					<DollarSignIcon className='h-6 w-6 text-yellow-500 mx-auto mb-2' />
					<p className='text-2xl font-bold text-gray-900'>
						{formatPrice(price, false)}
					</p>
					<p className='text-xs text-gray-500'>Price</p>
				</div>
			</div>
		</div>
	)
}
