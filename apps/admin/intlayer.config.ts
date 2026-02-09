import { Locales, type IntlayerConfig } from 'intlayer'

const config: IntlayerConfig = {
	internationalization: {
		locales: [Locales.ENGLISH, Locales.UKRAINIAN, Locales.RUSSIAN],
		defaultLocale: Locales.ENGLISH
	}
}

export default config
