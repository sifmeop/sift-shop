import { motion } from 'motion/react'
import React from 'react'
import { cn } from '../utils/cn'

interface Step {
	id: string
	label?: string
}

interface StepperProps {
	steps: Step[]
	currentStep?: number
	className?: string
}

export const Stepper = ({
	steps,
	currentStep = 0,
	className
}: StepperProps) => {
	return (
		<div className={cn('flex flex-row items-center', className)}>
			{steps.map((step, index) => {
				const isActive = index === currentStep
				const isCompleted = index < currentStep

				return (
					<React.Fragment key={step.id}>
						<div className='flex flex-col items-center gap-2 flex-1'>
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{
									scale: isActive ? 1.1 : 1,
									opacity: 1
								}}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 20
								}}
								className={cn(
									'w-10 h-10 rounded-full flex items-center justify-center font-semibold shrink-0 transition-colors duration-300',
									isActive
										? 'bg-blue-500 text-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)]'
										: isCompleted
											? 'bg-green-500 text-white'
											: 'bg-gray-200 text-gray-500'
								)}>
								{isCompleted ? (
									<motion.svg
										className='w-5 h-5'
										viewBox='0 0 20 20'
										fill='currentColor'
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{
											type: 'spring',
											stiffness: 300,
											damping: 15
										}}>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'
										/>
									</motion.svg>
								) : (
									<motion.span
										key={`number-${index}`}
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 500,
											damping: 25
										}}>
										{index + 1}
									</motion.span>
								)}
							</motion.div>
							{step.label && (
								<motion.div
									className='flex flex-col gap-1'
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 }}>
									<motion.div
										animate={{
											color: isActive
												? '#3b82f6'
												: isCompleted
													? '#10b981'
													: '#1f2937'
										}}
										transition={{ duration: 0.3 }}
										className='font-semibold text-sm'>
										{step.label}
									</motion.div>
								</motion.div>
							)}
						</div>
						{index < steps.length - 1 && (
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{
									scaleX: 1,
									backgroundColor: isCompleted ? '#10b981' : '#e5e7eb'
								}}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
								className='h-0.5 flex-1 mx-2.5 origin-left'
							/>
						)}
					</React.Fragment>
				)
			})}
		</div>
	)
}
