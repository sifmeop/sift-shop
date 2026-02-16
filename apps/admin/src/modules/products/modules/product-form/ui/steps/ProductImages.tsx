import { Image as ImageIcon, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Gallery } from '~/common/ui/Gallery'
import { Label } from '~/common/ui/Label'
import type { ProductSchema } from '../../schemas/product.schema'

const MAX_IMAGES = 10
const MIN_IMAGES = 1
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const ProductImages = () => {
	const {
		setValue,
		watch,
		formState: { errors }
	} = useFormContext<ProductSchema>()
	const images = watch('images') || []
	const [isDragging, setIsDragging] = useState(false)
	const [previews, setPreviews] = useState<string[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFiles = async (files: FileList) => {
		const fileArray = Array.from(files)
		const validFiles = fileArray.filter((file) => {
			if (!file.type.startsWith('image/')) {
				alert('Only image files are allowed')
				return false
			}
			if (file.size > MAX_FILE_SIZE) {
				alert(`${file.name} exceeds 5MB limit`)
				return false
			}
			return true
		})

		if (images.length + validFiles.length > MAX_IMAGES) {
			alert(`Maximum ${MAX_IMAGES} images allowed`)
			return
		}

		// Convert to base64 for preview and storage
		const newPreviews: string[] = []
		const newImages: string[] = []

		for (const file of validFiles) {
			const reader = new FileReader()
			const base64 = await new Promise<string>((resolve) => {
				reader.onloadend = () => resolve(reader.result as string)
				reader.readAsDataURL(file)
			})
			newPreviews.push(base64)
			newImages.push(base64)
		}

		setPreviews([...previews, ...newPreviews])
		setValue('images', [...images, ...newImages], { shouldValidate: true })
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		if (e.dataTransfer.files) {
			handleFiles(e.dataTransfer.files)
		}
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			handleFiles(e.target.files)
		}
	}

	const removeImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index)
		const newPreviews = previews.filter((_, i) => i !== index)
		setPreviews(newPreviews)
		setValue('images', newImages, { shouldValidate: true })
	}

	const canAddMore = images.length < MAX_IMAGES

	return (
		<div className='space-y-6'>
			<div className='space-y-2'>
				<Label className='text-sm font-medium text-gray-900 mb-3'>
					Images
					<span className='text-gray-500'>
						({images.length}/{MAX_IMAGES})
					</span>
				</Label>

				<div
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onClick={() => canAddMore && fileInputRef.current?.click()}
					className={`
						relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
						transition-all duration-300 ease-out
						${
							isDragging
								? 'border-blue-500 bg-blue-50 scale-[1.02]'
								: 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
						}
						${!canAddMore && 'opacity-50 cursor-not-allowed'}
					`}>
					<input
						ref={fileInputRef}
						type='file'
						multiple
						accept='image/*'
						onChange={handleFileInput}
						disabled={!canAddMore}
						className='hidden'
					/>

					<div
						className={`
						transition-transform duration-300
						${isDragging ? 'scale-110' : 'scale-100'}
					`}>
						<Upload
							className={`
							mx-auto h-12 w-12 mb-4 transition-colors duration-300
							${isDragging ? 'text-blue-500' : 'text-gray-400'}
						`}
						/>

						<p className='text-sm font-medium text-gray-900 mb-1'>
							{isDragging
								? 'Drop images here'
								: 'Click to upload or drag and drop'}
						</p>
						<p className='text-xs text-gray-500'>
							PNG, JPG, WEBP up to 5MB (min {MIN_IMAGES}, max {MAX_IMAGES})
						</p>
					</div>
				</div>

				{errors.images && (
					<p className='text-sm text-red-600 mt-1'>{errors.images.message}</p>
				)}
			</div>

			{images.length > 0 && (
				<div className='space-y-4'>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
						{images.map((image, index) => (
							<div
								key={index}
								className='group relative aspect-square rounded-lg overflow-hidden bg-gray-100 animate-in fade-in zoom-in duration-300'
								style={{ animationDelay: `${index * 50}ms` }}>
								<img
									src={image}
									alt={`Product ${index + 1}`}
									className='size-full object-contain transition-transform duration-300 group-hover:scale-110'
								/>

								{index === 0 && (
									<div className='absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10'>
										Primary
									</div>
								)}

								<button
									type='button'
									onClick={() => removeImage(index)}
									className='
										absolute top-2 right-2 p-1.5 rounded-full 
										bg-red-500 text-white shadow-lg
										opacity-0 group-hover:opacity-100
										transition-all duration-200
										hover:bg-red-600 hover:scale-110
										focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
										z-10
									'>
									<X className='size-4' />
								</button>

								<div
									className='
									absolute inset-0 bg-black/20 opacity-0 
									group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
								'
								/>
							</div>
						))}
					</div>

					<div className='pt-4 border-t border-gray-200'>
						<h3 className='text-sm font-medium text-gray-900 mb-3 flex items-center gap-2'>
							<ImageIcon className='h-4 w-4' />
							Preview Gallery
						</h3>
						<Gallery
							images={images}
							className='max-w-2xl aspect-video h-full'
						/>
					</div>
				</div>
			)}

			{images.length === 0 && (
				<div className='text-center py-8 text-gray-500 text-sm animate-in fade-in duration-500'>
					<ImageIcon className='h-12 w-12 mx-auto mb-3 text-gray-300' />
					<p>No images uploaded yet</p>
					<p className='text-xs mt-1'>
						Add at least {MIN_IMAGES} image to continue
					</p>
				</div>
			)}
		</div>
	)
}
