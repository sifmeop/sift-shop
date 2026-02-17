import { CheckIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme, type Theme } from '~/common/providers/ThemeProvider'
import { capitalizeFirstStrict } from '../utils/capitalize'
import { Button } from './Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './DropdownMenu'

const THEMES: Theme[] = ['light', 'dark', 'system']

export const ThemeToggle = () => {
	const { theme: currentTheme, setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<SunIcon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{THEMES.map((theme) => (
					<DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
						{capitalizeFirstStrict(theme)}
						{currentTheme === theme && (
							<CheckIcon className='ml-auto stroke-green-500' strokeWidth={3} />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
