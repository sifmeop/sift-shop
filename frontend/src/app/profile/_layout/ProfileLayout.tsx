import { ProfileNavigation } from './ProfileNavigation'

export const ProfileLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='grid grid-cols-[600px_1fr] gap-10'>
      <ProfileNavigation />
      <div>{children}</div>
    </div>
  )
}
