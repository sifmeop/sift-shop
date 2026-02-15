import { createContext, useContext } from 'react'

interface WizardContextType {
	activeStep: number
	completedSteps: Set<number>
	markStepComplete: (step: number) => void
}

const WizardContext = createContext<WizardContextType | null>(null)

interface WizardProviderProps extends React.PropsWithChildren {
	value: WizardContextType
}

export const WizardProvider = ({ children, value }: WizardProviderProps) => {
	return (
		<WizardContext.Provider value={value}>{children}</WizardContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWizard = () => {
	const context = useContext(WizardContext)
	if (!context) throw new Error('useWizard must be used inside WizardProvider')
	return context
}
