import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { useUserStore } from '~/common/stores/user'
import { getObjectDiff } from '~/common/utils/getObjectDiff'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import {
  AccountDetailsFormData,
  accountDetailsSchema
} from '../schemas/account-details.schema'

import { useUpdateAccountDetailsMutation } from './useUpdateAccountDetailsMutation'

export const useAccountDetailsForm = () => {
  const accountDetails = useUserStore((state) => state.user?.accountDetails)
  const [mutate, { loading }] = useUpdateAccountDetailsMutation()

  const form = useForm<AccountDetailsFormData>({
    defaultValues: {
      firstName: accountDetails?.firstName ?? '',
      lastName: accountDetails?.lastName ?? '',
      email: accountDetails?.email ?? '',
      phone: accountDetails?.phone ?? '',
      city: accountDetails?.city ?? '',
      country: accountDetails?.country ?? '',
      state: accountDetails?.state ?? '',
      address: accountDetails?.address ?? '',
      zipCode: accountDetails?.zipCode ?? ''
    },
    resolver: zodResolver(accountDetailsSchema),
    mode: 'onChange'
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const diff = accountDetails ? getObjectDiff(accountDetails, values) : values
    const isEmpty = Object.keys(diff).length === 0

    if (isEmpty) {
      toast.error('No changes made')
      return
    }

    try {
      await mutate({
        variables: { input: values }
      })
      toast.success('Account details updated successfully')
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  return { form, onSubmit, isLoading: loading }
}
