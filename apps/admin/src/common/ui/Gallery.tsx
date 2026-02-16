'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { cn } from '../utils/cn'

interface GalleryProps {
	images: string | string[]
	children?: (props: { onClick: () => void }) => React.ReactNode
	className?: string
	imageClassName?: string
	initialIndex?: number
}

export function Gallery({
	images,
	children,
	className = '',
	imageClassName = '',
	initialIndex = 0
}: GalleryProps) {
	const [open, setOpen] = useState(false)
	const [index, setIndex] = useState(initialIndex)

	const imageArray = Array.isArray(images) ? images : [images]

	const slides = imageArray.map((src) => ({ src }))

	const handleOpen = (imgIndex: number = 0) => {
		setIndex(imgIndex)
		setOpen(true)
	}

	return (
		<>
			{children ? (
				children({ onClick: () => handleOpen() })
			) : (
				<button
					type='button'
					className={cn('rounded-lg overflow-hidden h-full', className)}
					onClick={() => handleOpen()}>
					<img
						src={imageArray[0]}
						alt='Gallery image'
						className={cn(
							'cursor-zoom-in size-full object-contain',
							imageClassName
						)}
					/>
				</button>
			)}

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				slides={slides}
				index={index}
				plugins={[Zoom, Thumbnails, Fullscreen]}
				zoom={{
					maxZoomPixelRatio: 3,
					scrollToZoom: true
				}}
			/>
		</>
	)
}
