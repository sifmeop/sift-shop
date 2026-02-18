'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { FullScreenLoader } from '~/common/ui/FullScreenLoader'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { useEmailConfirmationMutation } from '../hooks/useEmailConfirmationMutation'

interface EmailConfirmationFormProps {
  token: string
}

export const EmailConfirmationForm = ({
  token
}: EmailConfirmationFormProps) => {
  const router = useRouter()
  const [mutate] = useEmailConfirmationMutation()

  useEffect(() => {
    const handleVerify = async () => {
      try {
        await mutate({
          variables: {
            input: {
              token
            }
          }
        })
        router.replace(ROUTES.ORDERS)
      } catch (error) {
        handleGraphQLError(error)
        router.replace(ROUTES.SIGN_IN)
      }
    }

    handleVerify()
  }, [])

  return <FullScreenLoader />
}
