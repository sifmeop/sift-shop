import { Button } from '~/common/ui/Button'
import { Card, CardContent, CardFooter, CardTitle } from '~/common/ui/Card'
import { Input } from '~/common/ui/Input'
import { Label } from '~/common/ui/Label'

export const LoginForm = () => {
	return (
		<div className='flex items-center justify-center min-h-dvh'>
			<Card className='w-full max-w-xs'>
				<CardTitle className='text-center text-2xl font-extrabold my-4 mb-8'>
					Admin
				</CardTitle>
				<CardContent>
					<form>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									required
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									placeholder='********'
									required
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex-col gap-2'>
					<Button type='submit' fullWidth>
						Login
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
