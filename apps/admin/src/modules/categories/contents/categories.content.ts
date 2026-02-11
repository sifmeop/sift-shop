import { t, type Dictionary } from 'intlayer'

const categoriesContent = {
	key: 'categories',
	content: {
		title: t({
			en: 'Categories',
			uk: 'Категорії',
			ru: 'Категории'
		}),
		addCategory: t({
			en: 'Add',
			uk: 'Додати',
			ru: 'Добавить'
		}),
		search: t({
			en: 'Search',
			uk: 'Пошук',
			ru: 'Поиск'
		}),
		table: {
			name: t({
				en: 'Category',
				uk: 'Категорія',
				ru: 'Категория'
			}),
			subcategoriesCount: t({
				en: 'Subcategories',
				uk: 'Підкатегорій',
				ru: 'Подкатегорий'
			}),
			productsCount: t({
				en: 'Products',
				uk: 'Товари',
				ru: 'Товаров'
			}),
			actions: t({
				en: 'Actions',
				uk: 'Дія',
				ru: 'Действия'
			})
		}
	}
} satisfies Dictionary

export default categoriesContent
