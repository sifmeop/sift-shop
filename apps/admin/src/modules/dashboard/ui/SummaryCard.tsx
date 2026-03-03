import { Card, CardContent, CardHeader, CardTitle } from '~/common/ui/Card'

interface SummaryCardProps {
	title: string
	value: string | number
}

export const SummaryCard = ({ title, value }: SummaryCardProps) => {
	return (
		<Card className='gap-2 py-4'>
			<CardHeader className='px-4'>
				<CardTitle className='text-sm text-muted-foreground font-medium'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='px-4'>
				<p className='text-2xl font-semibold'>{value}</p>
			</CardContent>
		</Card>
	)
}

