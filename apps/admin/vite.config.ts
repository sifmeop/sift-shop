import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
			routesDirectory: './src/app/routes',
			generatedRouteTree: './src/global/routeTree.gen.ts'
		}),
		react(),
		tailwindcss()
	],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 3001
	},
	preview: {
		port: 3001
	}
})
