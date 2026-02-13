interface ShowProps extends React.PropsWithChildren {
	when: boolean
}

export const Show = ({ children, when }: ShowProps) => {
	if (!when) return null
	return <>{children}</>
}
