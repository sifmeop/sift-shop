'use client'

import { LogOutIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'
import { useLogoutMutation } from '../hooks/useLogoutMutation'

export const LogoutButton = () => {
	const { mutate } = useLogoutMutation()

	return (
		<Button variant='outline' size='icon' onClick={() => mutate()}>
			<LogOutIcon />
		</Button>
	)
}
