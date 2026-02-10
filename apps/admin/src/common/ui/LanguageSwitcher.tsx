import type { LocalesValues } from 'intlayer'
import { CheckIcon, LanguagesIcon } from 'lucide-react'
import { useLocale } from 'react-intlayer'
import { capitalize } from '../utils/capitalize'
import { Button } from './Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './DropdownMenu'

const ICONS: Record<LocalesValues, string> = {
	en: '/public/assets/icons/flags/us.svg',
	uk: '/public/assets/icons/flags/ua.svg',
	ru: '/public/assets/icons/flags/ru.svg'
}

export const LanguageSwitcher = () => {
	const { locale: currentLocale, availableLocales, setLocale } = useLocale()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<LanguagesIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-40'>
				{availableLocales.map((locale) => {
					const displayNames = new Intl.DisplayNames([locale], {
						type: 'language'
					})
					const isActive = locale === currentLocale
					const name = displayNames.of(locale)
					const iconPath = ICONS[locale]

					return (
						<DropdownMenuItem key={locale} onClick={() => setLocale(locale)}>
							<img src={iconPath} alt={locale} className='max-w-5 rounded-sm' />
							{name ? capitalize(name) : locale}
							{isActive && (
								<CheckIcon
									className='ml-auto stroke-green-500'
									strokeWidth={3}
								/>
							)}
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
