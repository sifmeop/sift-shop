import { Separator } from '~/common/ui/separator'

export const AuthDivider = () => {
  return (
    <div className='flex h-6 items-center gap-4'>
      <Separator />
      <div className='font-medium'>OR</div>
      <Separator />
    </div>
  )
}
