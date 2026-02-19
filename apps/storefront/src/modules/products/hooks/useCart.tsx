import { CART_BUTTON_ID } from '~/common/constants/ids'

// TODO: EDIT

const DOT_SIZE = 24

export const useCart = (
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    const cart = document.querySelector(
      `#${CART_BUTTON_ID}`
    ) as HTMLButtonElement | null

    if (!cart) return

    const buttonRect = e.currentTarget.getBoundingClientRect()
    const buttonCenterX = buttonRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top + buttonRect.height / 2

    const cartRect = cart.getBoundingClientRect()
    const cartCenterX = cartRect.left + cartRect.width / 2
    const cartCenterY = cartRect.top + cartRect.height / 2

    const flyingElement = document.createElement('div')

    flyingElement.style.left = `${buttonCenterX - 10}px`
    flyingElement.style.top = `${buttonCenterY - 10}px`
    flyingElement.style.position = 'fixed'
    flyingElement.style.width = `${DOT_SIZE}px`
    flyingElement.style.height = `${DOT_SIZE}px`
    flyingElement.style.borderRadius = '50%'
    flyingElement.style.backgroundColor = 'var(--color-blue-700)'
    flyingElement.style.color = 'var(--background)'
    flyingElement.style.zIndex = '9999'
    flyingElement.style.pointerEvents = 'none'
    flyingElement.style.display = 'grid'
    flyingElement.style.placeItems = 'center'

    flyingElement.textContent = '+1'

    document.body.appendChild(flyingElement)

    const distanceX = cartCenterX - buttonCenterX
    const distanceY = cartCenterY - buttonCenterY

    setCount((prev) => prev + 1)

    flyingElement.animate(
      [
        { transform: `translate(0, 0)`, opacity: 1 },
        {
          transform: `translate(${distanceX}px, ${distanceY}px) scale(0.8)`,
          opacity: 0.6
        }
      ],
      {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    ).onfinish = () => {
      flyingElement.remove()
    }
  }

  const removeFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    setCount((prev) => prev - 1)
  }

  return { addToCart, removeFromCart }
}
