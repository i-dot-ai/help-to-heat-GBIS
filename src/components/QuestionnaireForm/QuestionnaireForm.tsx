import { QuestionnaireContext } from '@/context/QuestionnaireContext'
import { Steps } from '@/pages/questionnaire'
import { useContext } from 'react'
import { CountryOrProperty } from './CountryOrProperty'
import { OwningOfProperty } from './OwningOfProperty'
import { AddressOfProperty } from './AddressOfProperty'
import { AskAboutEPC } from './AskAboutEPC'
import { PropertyEPC } from './PropertyEPC'
import { GasGrid } from './GasGrid'
import { Benefits } from './Benefits'
import { HouseholdIncome } from './HouseholdIncome'
import { SecondaryQuestionsOnProperty } from './SecondaryQuestionsOnProperty'
import { CheckYourAnswers } from './CheckYourAnswers'
import { LandlordPermission } from './LandlordPermission'
import { SelectEnergySupplier } from './SelectEnergySupplier'
import { PersonalAndContactDetails } from './PersonalAndContactDetails'
import { ConfirmAndSubmit } from './ConfirmAndSubmit'

const QuestionnaireForm = ({ steps }: { steps: Steps }) => {
  const { data } = useContext(QuestionnaireContext)
  return (
    <div>
      {steps.currentStep === 1 && <CountryOrProperty nextStep={2} />}
      {steps.currentStep === 2 && <OwningOfProperty nextStep={3} />}
      {steps.currentStep === 3 && <AddressOfProperty nextStep={4} />}
      {steps.currentStep === 4 && <AskAboutEPC nextStep={5} />}
      {steps.currentStep === 5 && <PropertyEPC nextStep={6} />}
      {steps.currentStep === 6 && <GasGrid nextStep={7} />}
      {steps.currentStep === 7 && <Benefits nextStep={8} />}
      {steps.currentStep === 8 && <HouseholdIncome nextStep={9} />}
      {steps.currentStep === 9 && <SecondaryQuestionsOnProperty nextStep={10} />}
      {steps.currentStep === 10 && <CheckYourAnswers nextStep={11} />}
      {steps.currentStep === 11 && <LandlordPermission nextStep={12} />}
      {steps.currentStep === 12 && <SelectEnergySupplier nextStep={13} />}
      {steps.currentStep === 13 && <PersonalAndContactDetails nextStep={14} />}
      {steps.currentStep === 14 && <ConfirmAndSubmit nextStep={15} />}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export default QuestionnaireForm
