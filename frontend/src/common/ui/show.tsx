interface ShowProps extends React.PropsWithChildren {
  when: boolean
  fallback?: React.ReactNode
}

export const Show = ({ when, fallback = null, children }: ShowProps) => {
  if (!when) return <>{fallback}</>

  return <>{children}</>
}
