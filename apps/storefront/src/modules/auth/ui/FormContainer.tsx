export const FormContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='py-25 bg-white'>
      <div className='max-w-[320px] mx-auto px-4 box-content'>{children}</div>
    </div>
  )
}
