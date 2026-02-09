import { t, type Dictionary } from 'intlayer'

const loginContent = {
	key: 'login',
	content: {
		email: t({
			en: 'Email',
			uk: 'Пошта',
			ru: 'Почта'
		}),
		emailPlaceholder: t({
			en: 'Enter your email',
			uk: 'Введіть вашу пошту',
			ru: 'Введите вашу почту'
		}),
		password: t({
			en: 'Password',
			uk: 'Пароль',
			ru: 'Пароль'
		}),
		passwordPlaceholder: t({
			en: 'Enter your password',
			uk: 'Введіть ваш пароль',
			ru: 'Введите ваш пароль'
		}),
		login: t({
			en: 'Login',
			uk: 'Увійти',
			ru: 'Войти'
		})
	}
} satisfies Dictionary

export default loginContent
