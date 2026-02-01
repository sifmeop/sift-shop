export const FormContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='pt-32 pb-37 bg-white'>
      <div className='max-w-[320px] mx-auto px-4 box-content'>{children}</div>
    </div>
  )
}
