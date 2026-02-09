import axios from 'axios'
import { env } from '../constants/env'

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	timeout: 10_000,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

api.interceptors.request.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			window.location.href = '/'
		}
		return Promise.reject(error)
	}
)
