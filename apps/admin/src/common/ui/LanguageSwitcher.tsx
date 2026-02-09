import { LanguagesIcon } from 'lucide-react'
import { useLocale } from 'react-intlayer'
import { capitalize } from '../utils/capitalize'
import { Button } from './Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './DropdownMenu'

export const LanguageSwitcher = () => {
	const { availableLocales, setLocale } = useLocale()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<LanguagesIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-50' align='center'>
				<DropdownMenuGroup>
					{availableLocales.map((locale) => {
						const displayNames = new Intl.DisplayNames([locale], {
							type: 'language'
						})
						const name = displayNames.of(locale)

						return (
							<DropdownMenuItem key={locale} onClick={() => setLocale(locale)}>
								{name ? capitalize(name) : locale}
							</DropdownMenuItem>
						)
					})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
