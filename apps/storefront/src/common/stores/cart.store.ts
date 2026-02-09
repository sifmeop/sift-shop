import { createStore } from 'zustand'
import { devtools } from 'zustand/middleware'

import { CartState } from '../types/cart-store.types'

export const useCartStore = createStore<CartState>()(devtools((set) => ({})))
